
// // components/page/blog/BlogCreate.js
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';
// import { 
//   FaSpinner, FaTag, FaTimes, FaUpload, FaEye, FaEyeSlash,
//   FaCheckCircle, FaExclamationCircle, FaSave, FaImage,
//   FaTrash
// } from 'react-icons/fa';
// import './BlogCreate.css';

// const BlogCreate = () => {
//   const navigate = useNavigate();
//   const quillRef = useRef(null);
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [loadingTags, setLoadingTags] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     summary: '',
//     content: '',
//     categoryId: '',
//     isPublished: true,
//     image: null,
//     imageCacheId: null
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const [imageUploadProgress, setImageUploadProgress] = useState(0);
//   const [isImageUploading, setIsImageUploading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [showPreview, setShowPreview] = useState(false);
  
//   // State برای مدیریت آپلود تصاویر در ویرایشگر
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);

//   // دریافت دسته‌بندی‌ها
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('https://localhost:7178/api/Post/GetCategoryPostsDTOs', {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.ok) {
//         const result = await response.json();
//         if (result.status === 200 && result.data) {
//           setCategories(result.data);
//         }
//       }
//     } catch (error) {
//       console.error('❌ خطا در دریافت دسته‌بندی‌ها:', error);
//     }
//   };

//   // دریافت تگ‌ها بر اساس دسته‌بندی
//   const fetchTags = async (categoryId) => {
//     if (!categoryId) {
//       setTags([]);
//       setSelectedTags([]);
//       return;
//     }

//     setLoadingTags(true);
//     try {
//       const token = localStorage.getItem('auth_token');
//       const response = await fetch(`https://localhost:7178/api/Post/GetTagsDtosDTOs?catId=${categoryId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.ok) {
//         const result = await response.json();
//         if (result.status === 200 && result.data) {
//           setTags(result.data);
//           setSelectedTags([]);
//         } else {
//           setTags([]);
//         }
//       } else {
//         setTags([]);
//       }
//     } catch (error) {
//       console.error('❌ خطا در دریافت تگ‌ها:', error);
//       setTags([]);
//     } finally {
//       setLoadingTags(false);
//     }
//   };

//   // ===== آپلود تصویر شاخص =====
//   const uploadImage = async (file, onProgress) => {
//     return new Promise((resolve, reject) => {
//       const formData = new FormData();
//       formData.append('image', file);

//       const xhr = new XMLHttpRequest();
//       const token = localStorage.getItem('auth_token');

//       xhr.open('POST', 'https://localhost:7178/api/RealEstatePage/UploadTempImage', true);
//       xhr.setRequestHeader('Authorization', `Bearer ${token}`);

//       xhr.upload.onprogress = (event) => {
//         if (event.lengthComputable && onProgress) {
//           const progress = Math.round((event.loaded / event.total) * 100);
//           onProgress(progress);
//         }
//       };

//       xhr.onload = () => {
//         if (xhr.status === 200) {
//           try {
//             const result = JSON.parse(xhr.responseText);
//             if (result.success && result.cacheId) {
//               resolve(result.cacheId);
//             } else {
//               reject(new Error('خطا در آپلود تصویر'));
//             }
//           } catch (error) {
//             reject(error);
//           }
//         } else {
//           reject(new Error(`خطا در آپلود: ${xhr.status}`));
//         }
//       };

//       xhr.onerror = () => {
//         reject(new Error('خطا در ارتباط با سرور'));
//       };

//       xhr.send(formData);
//     });
//   };

//   // ===== آپلود تصویر محتوای مقاله =====
//   const uploadImagePost = async (file, onProgress) => {
//     return new Promise((resolve, reject) => {
//       const formData = new FormData();
//       formData.append('image', file);

//       const xhr = new XMLHttpRequest();
//       const token = localStorage.getItem('auth_token');

//       xhr.open('POST', 'https://localhost:7178/api/Post/UploadTempImagePost', true);
//       xhr.setRequestHeader('Authorization', `Bearer ${token}`);

//       xhr.upload.onprogress = (event) => {
//         if (event.lengthComputable && onProgress) {
//           const progress = Math.round((event.loaded / event.total) * 100);
//           onProgress(progress);
//         }
//       };

//       xhr.onload = () => {
//         if (xhr.status === 200) {
//           try {
//             const result = JSON.parse(xhr.responseText);
//             if (result.success && result.fileName) {
//               resolve(result.fileName);
//             } else {
//               reject(new Error('خطا در آپلود تصویر'));
//             }
//           } catch (error) {
//             reject(error);
//           }
//         } else {
//           reject(new Error(`خطا در آپلود: ${xhr.status}`));
//         }
//       };

//       xhr.onerror = () => {
//         reject(new Error('خطا در ارتباط با سرور'));
//       };

//       xhr.send(formData);
//     });
//   };

//   // ===== حذف تصویر از کش =====
//   const clearTempImage = async (cacheId) => {
//     try {
//       const token = localStorage.getItem('auth_token');
//       const response = await fetch('https://localhost:7178/api/RealEstatePage/ClearTempImage', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ cacheId })
//       });

//       if (response.ok) {
//         const result = await response.json();
//         return result.success;
//       }
//       return false;
//     } catch (error) {
//       console.error('❌ خطا در حذف تصویر:', error);
//       return false;
//     }
//   };

//   // ===== تبدیل Base64 به File =====
//   const base64ToFile = (base64, fileName) => {
//     const arr = base64.split(',');
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new File([u8arr], fileName, { type: mime });
//   };

//   // ===== آپلود تصاویر محتوای مقاله =====
//   const uploadContentImages = async (htmlContent) => {
//     const temp = document.createElement('div');
//     temp.innerHTML = htmlContent;
//     const images = temp.querySelectorAll('img');
//     const uploadPromises = [];
//     const imageMap = {};
//     const fileNames = [];

//     images.forEach((img, index) => {
//             console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
//       const src = img.getAttribute('src');
//       if (src && src.startsWith('data:image')) {
//         const fileName = `content_image_${Date.now()}_${index}.jpg`;
//         const file = base64ToFile(src, fileName);
        
//         const promise = uploadImagePost(file, (progress) => {
//           console.log(`آپلود تصویر محتوا ${index + 1}: ${progress}%`);
//         })
//         .then((fileName) => {
//           console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
//           console.log(fileName)
//           // استفاده از مسیر مستقیم فایل
//           const imageUrl = `/uploads/posts/${fileName}`;
//           imageMap[src] = imageUrl;
//           fileNames.push(fileName);
//           return { fileName, src, imageUrl };
//         }).catch((error) => {
//           console.error(`خطا در آپلود تصویر ${index + 1}:`, error);
//           return null;
//         });
        
//         uploadPromises.push(promise);
//       }
//     });

//     // اگر تصویری برای آپلود وجود نداشت
//     if (uploadPromises.length === 0) {
//       return { updatedContent: htmlContent, fileNames: [] };
//     }

//     const results = await Promise.all(uploadPromises);
    
//     let updatedContent = htmlContent;
//     results.forEach((result) => {
//       if (result && result.src && result.imageUrl) {
//         updatedContent = updatedContent.replace(result.src, result.imageUrl);
//       }
//     });

//     return { updatedContent, fileNames };
//   };

//   // ===== هندلر آپلود تصویر در ویرایشگر =====
//   const imageHandler = () => {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       if (!file) return;

//       if (file.size > 10 * 1024 * 1024) {
//         alert('حجم تصویر نباید بیشتر از 10 مگابایت باشد');
//         return;
//       }

//       const quill = quillRef.current.getEditor();
//       const range = quill.getSelection();
      
//       // نمایش لودینگ در ویرایشگر
//       const loadingGif = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
//       quill.insertEmbed(range.index, 'image', loadingGif);

//       const newImage = {
//         file,
//         progress: 0,
//         status: 'uploading',
//         fileName: null,
//         url: null
//       };
//       setUploadedImages(prev => [...prev, newImage]);
//       setIsUploading(true);

//       try {
//         // آپلود تصویر
//         const fileName = await uploadImagePost(file, (progress) => {
//           setUploadedImages(prev => 
//             prev.map(img => 
//               img.file === file ? { ...img, progress } : img
//             )
//           );
//         });
        
//         // استفاده از مسیر مستقیم فایل
//         console.log("************************************************************")
//         console.log(fileName)
//         const imageUrl = `/posts/${fileName}`;
        
//         quill.deleteText(range.index, 1);
//         quill.insertEmbed(range.index, 'image', imageUrl);
//         quill.setSelection(range.index + 1);

//         setUploadedImages(prev => 
//           prev.map(img => 
//             img.file === file ? { 
//               ...img, 
//               fileName, 
//               url: imageUrl, 
//               status: 'success', 
//               progress: 100 
//             } : img
//           )
//         );
//       } catch (error) {
//         console.error('❌ خطا:', error);
//         alert('خطا در آپلود تصویر. لطفاً دوباره تلاش کنید.');
//         quill.deleteText(range.index, 1);
//         setUploadedImages(prev => prev.filter(img => img.file !== file));
//       } finally {
//         setIsUploading(false);
//       }
//     };
//   };

//   // ===== حذف تصویر آپلود شده =====
//   const removeUploadedImage = async (imageToRemove) => {
//     if (imageToRemove.fileName) {
//       // حذف فایل از سرور اگر نیاز باشد
//       try {
//         const token = localStorage.getItem('auth_token');
//         await fetch(`https://localhost:7178/api/Post/DeleteTempImage?fileName=${imageToRemove.fileName}`, {
//           method: 'DELETE',
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//       } catch (error) {
//         console.error('خطا در حذف تصویر:', error);
//       }
//     }
//     setUploadedImages(prev => prev.filter(img => img.file !== imageToRemove.file));
//   };

//   // ===== آپلود تصویر شاخص =====
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       setErrors(prev => ({ ...prev, image: 'لطفاً یک تصویر معتبر انتخاب کنید' }));
//       return;
//     }
//     if (file.size > 10 * 1024 * 1024) {
//       setErrors(prev => ({ ...prev, image: 'حجم تصویر نباید بیشتر از 10 مگابایت باشد' }));
//       return;
//     }

//     // نمایش پیش‌نمایش
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(file);

//     // آپلود تصویر شاخص
//     setIsImageUploading(true);
//     setImageUploadProgress(0);

//     try {
//       const cacheId = await uploadImage(file, (progress) => {
//         setImageUploadProgress(progress);
//       });

//       setFormData(prev => ({ ...prev, image: file, imageCacheId: cacheId }));
      
//       if (errors.image) {
//         setErrors(prev => ({ ...prev, image: '' }));
//       }
//     } catch (error) {
//       console.error('❌ خطا در آپلود تصویر شاخص:', error);
//       setErrors(prev => ({ ...prev, image: 'خطا در آپلود تصویر' }));
//       setImagePreview(null);
//     } finally {
//       setIsImageUploading(false);
//     }
//   };

//   // ===== حذف تصویر شاخص =====
//   const handleRemoveImage = async () => {
//     if (formData.imageCacheId) {
//       await clearTempImage(formData.imageCacheId);
//     }
//     setFormData(prev => ({ ...prev, image: null, imageCacheId: null }));
//     setImagePreview(null);
//     setImageUploadProgress(0);
//     const fileInput = document.getElementById('imageInput');
//     if (fileInput) {
//       fileInput.value = '';
//     }
//   };

//   // ===== ماژول‌های Quill =====
//   const modules = {
//     toolbar: {
//       container: [
//         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//         [{ 'font': [] }],
//         [{ 'size': ['small', false, 'large', 'huge'] }],
//         ['bold', 'italic', 'underline', 'strike'],
//         [{ 'color': [] }, { 'background': [] }],
//         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
//         [{ 'indent': '-1' }, { 'indent': '+1' }],
//         [{ 'align': [] }],
//         ['blockquote', 'code-block'],
//         ['link', 'image', 'video', 'formula'],
//         ['clean']
//       ],
//       handlers: {
//         image: imageHandler
//       }
//     },
//     clipboard: {
//       matchVisual: false
//     }
//   };

//   const formats = [
//     'header', 'font', 'size',
//     'bold', 'italic', 'underline', 'strike',
//     'color', 'background',
//     'list', 'bullet', 'check',
//     'indent',
//     'align',
//     'blockquote', 'code-block',
//     'link', 'image', 'video', 'formula',
//     'width', 'height'
//   ];

//   // مدیریت تغییرات فیلدها
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }

//     if (name === 'categoryId') {
//       fetchTags(value);
//     }
//   };

//   // مدیریت تغییرات محتوای ویرایشگر
//   const handleContentChange = (value) => {
//     setFormData(prev => ({ ...prev, content: value }));
//     if (errors.content) {
//       setErrors(prev => ({ ...prev, content: '' }));
//     }
//   };

//   // مدیریت انتخاب تگ
//   const handleTagSelect = (tag) => {
//     if (selectedTags.some(t => t.id === tag.id)) {
//       setSelectedTags(prev => prev.filter(t => t.id !== tag.id));
//     } else {
//       setSelectedTags(prev => [...prev, tag]);
//     }
//   };

//   const handleRemoveTag = (tagId) => {
//     setSelectedTags(prev => prev.filter(t => t.id !== tagId));
//   };

//   // اعتبارسنجی فرم
//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.title.trim()) {
//       newErrors.title = 'عنوان مقاله الزامی است';
//     } else if (formData.title.length < 5) {
//       newErrors.title = 'عنوان باید حداقل 5 کاراکتر باشد';
//     }

//     if (!formData.summary.trim()) {
//       newErrors.summary = 'خلاصه مقاله الزامی است';
//     } else if (formData.summary.length < 10) {
//       newErrors.summary = 'خلاصه باید حداقل 10 کاراکتر باشد';
//     }

//     const plainText = formData.content.replace(/<[^>]*>/g, '').trim();
//     if (!plainText) {
//       newErrors.content = 'متن مقاله الزامی است';
//     } else if (plainText.length < 50) {
//       newErrors.content = 'متن مقاله باید حداقل 50 کاراکتر باشد';
//     }

//     if (!formData.categoryId) {
//       newErrors.categoryId = 'لطفاً یک دسته‌بندی انتخاب کنید';
//     }

//     if (selectedTags.length === 0) {
//       newErrors.tags = 'لطفاً حداقل یک برچسب انتخاب کنید';
//     }

//     if (!formData.imageCacheId && !formData.image) {
//       newErrors.image = 'تصویر شاخص الزامی است';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ===== تابع تولید اسلاگ =====
//   const generateSlug = (title) => {
//     return title
//       .trim()
//       .toLowerCase()
//       .replace(/[^\w\s\-آ-ی]/g, '')
//       .replace(/\s+/g, '-')
//       .replace(/-+/g, '-')
//       .replace(/^-|-$/g, '');
//   };

//   // ===== ارسال فرم =====
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       const firstError = document.querySelector('.input-error');
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//       return;
//     }

//     setLoading(true);
//     setUploadProgress(0);

//     try {
//       const token = localStorage.getItem('auth_token');
      
//       // آپلود تصاویر موجود در محتوا
//       setUploadProgress(20);
//       const { updatedContent, fileNames: contentFileNames } = await uploadContentImages(formData.content);
//       setUploadProgress(60);

//       // آماده‌سازی داده‌ها
//       const tagIds = selectedTags.map(tag => tag.id);
      
//       // جمع‌آوری همه fileName ها
//       const allFileNames = [...contentFileNames];
      
//       // اضافه کردن fileName تصاویر آپلود شده در ویرایشگر
//       const editorImageFileNames = uploadedImages
//         .filter(img => img.status === 'success' && img.fileName)
//         .map(img => img.fileName);
//       allFileNames.push(...editorImageFileNames);

//       const submitData = {
//         id: 0,
//         slug: generateSlug(formData.title),
//         title: formData.title,
//         summary: formData.summary,
//         content: updatedContent,
//         categoryId: parseInt(formData.categoryId),
//         tagsId: tagIds,
//         isPublished: formData.isPublished,
//         tempImageCacheIds: formData.imageCacheId
//       };

//       console.log('📤 ارسال داده:', submitData);
//       console.log('📸 فایل‌های تصویر:', allFileNames);

//       const response = await fetch('https://localhost:7178/api/Post/InsertPost', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(submitData)
//       });

//       setUploadProgress(100);

//       if (!response.ok) {
//         let errorMessage = 'خطا در ثبت مقاله';
//         try {
//           const errorData = await response.json();
//           errorMessage = errorData.message || errorMessage;
//           console.log('خطای سرور:', errorData);
//         } catch (e) {}
//         throw new Error(errorMessage);
//       }

//       const result = await response.json();
      
//       if (result.status === 200 || result.isSuccess) {
//         setSuccess(true);
//         setTimeout(() => {
//           navigate('/blog');
//         }, 2000);
//       } else {
//         throw new Error(result.message || 'خطا در ثبت مقاله');
//       }
//     } catch (error) {
//       console.error('❌ خطا:', error);
//       setErrors({ submit: error.message || 'مشکل در ارتباط با سرور' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderError = (field) => {
//     if (errors[field]) {
//       return <span className="input-error">{errors[field]}</span>;
//     }
//     return null;
//   };

//   return (
//     <div className="blog-create-wrapper">
//       {/* هدر */}
//       <div className="blog-create-header">
//         <div className="header-content">
//           <div className="header-text">
//             <h1 className="blog-create-title">✍️ ثبت مقاله جدید</h1>
//             <p className="blog-create-subtitle">مقالات خود را با ویرایشگر حرفه‌ای بنویسید و منتشر کنید</p>
//           </div>
//           <button 
//             className="preview-toggle-btn"
//             onClick={() => setShowPreview(!showPreview)}
//           >
//             {showPreview ? '✏️ ویرایش' : '👁️ پیش‌نمایش'}
//           </button>
//         </div>
//       </div>

//       {/* فرم */}
//       <div className="blog-create-form-container">
//         {success ? (
//           <div className="success-message">
//             <FaCheckCircle className="success-icon" />
//             <h3>🎉 مقاله با موفقیت ثبت شد!</h3>
//             <p>در حال انتقال به صفحه وبلاگ...</p>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="blog-create-form">
//             {/* خطای سرور */}
//             {errors.submit && (
//               <div className="submit-error">
//                 <FaExclamationCircle />
//                 <span>{errors.submit}</span>
//               </div>
//             )}

//             {/* عنوان */}
//             <div className="form-group">
//               <label htmlFor="title" className="form-label">
//                 عنوان مقاله <span className="required">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="عنوان جذاب برای مقاله خود بنویسید..."
//                 className={`form-input ${errors.title ? 'error' : ''}`}
//               />
//               {renderError('title')}
//             </div>

//             {/* خلاصه */}
//             <div className="form-group">
//               <label htmlFor="summary" className="form-label">
//                 خلاصه مقاله <span className="required">*</span>
//               </label>
//               <textarea
//                 id="summary"
//                 name="summary"
//                 value={formData.summary}
//                 onChange={handleChange}
//                 placeholder="خلاصه‌ای از مقاله را وارد کنید..."
//                 rows="3"
//                 className={`form-textarea ${errors.summary ? 'error' : ''}`}
//               />
//               {renderError('summary')}
//             </div>

//             {/* ویرایشگر متن پیشرفته */}
//             <div className="form-group">
//               <label className="form-label">
//                 متن مقاله <span className="required">*</span>
//               </label>
//               <div className={`editor-wrapper ${showPreview ? 'preview-mode' : ''}`}>
//                 {showPreview ? (
//                   <div 
//                     className="preview-content"
//                     dangerouslySetInnerHTML={{ __html: formData.content }}
//                   />
//                 ) : (
//                   <ReactQuill
//                     ref={quillRef}
//                     theme="snow"
//                     value={formData.content}
//                     onChange={handleContentChange}
//                     modules={modules}
//                     formats={formats}
//                     placeholder="متن مقاله را بنویسید... برای درج تصویر روی آیکون 🖼️ کلیک کنید"
//                     className={`blog-editor ${errors.content ? 'error' : ''}`}
//                   />
//                 )}
//               </div>
//               {renderError('content')}
              
//               {/* نمایش وضعیت آپلود تصاویر */}
//               {uploadedImages.length > 0 && (
//                 <div className="upload-status-container">
//                   <div className="upload-status-header">
//                     <FaImage className="upload-status-icon" />
//                     <span>تصاویر در حال آپلود ({uploadedImages.length})</span>
//                   </div>
//                   <div className="upload-status-list">
//                     {uploadedImages.map((img, index) => (
//                       <div key={index} className="upload-status-item">
//                         <div className="upload-file-info">
//                           <span className="upload-file-name">{img.file.name}</span>
//                           <span className="upload-file-size">
//                             {(img.file.size / 1024).toFixed(1)} KB
//                           </span>
//                         </div>
//                         <div className="upload-progress-bar">
//                           <div 
//                             className={`upload-progress-fill ${img.status}`}
//                             style={{ width: `${img.progress}%` }}
//                           />
//                         </div>
//                         <div className="upload-status-actions">
//                           {img.status === 'uploading' && (
//                             <span className="upload-status-text uploading">
//                               {img.progress}%
//                             </span>
//                           )}
//                           {img.status === 'success' && (
//                             <span className="upload-status-text success">
//                               <FaCheckCircle /> آپلود شد
//                             </span>
//                           )}
//                           {img.status === 'error' && (
//                             <span className="upload-status-text error">
//                               خطا
//                             </span>
//                           )}
//                           {img.status === 'success' && (
//                             <button
//                               type="button"
//                               className="remove-upload-btn"
//                               onClick={() => removeUploadedImage(img)}
//                             >
//                               <FaTrash />
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* دسته‌بندی */}
//             <div className="form-group">
//               <label htmlFor="categoryId" className="form-label">
//                 دسته‌بندی <span className="required">*</span>
//               </label>
//               <div className="select-wrapper">
//                 <FaTag className="select-icon" />
//                 <select
//                   id="categoryId"
//                   name="categoryId"
//                   value={formData.categoryId}
//                   onChange={handleChange}
//                   className={`form-select ${errors.categoryId ? 'error' : ''}`}
//                 >
//                   <option value="">انتخاب دسته‌بندی...</option>
//                   {categories.map(cat => (
//                     <option key={cat.id} value={cat.id}>{cat.name}</option>
//                   ))}
//                 </select>
//               </div>
//               {renderError('categoryId')}
//             </div>

//             {/* برچسب‌ها */}
//             <div className="form-group">
//               <label className="form-label">
//                 برچسب‌ها <span className="required">*</span>
//               </label>
              
//               {loadingTags ? (
//                 <div className="tags-loading">
//                   <FaSpinner className="spinner-small" />
//                   <span>در حال بارگذاری برچسب‌ها...</span>
//                 </div>
//               ) : (
//                 <>
//                   {tags.length > 0 ? (
//                     <div className="tags-multiselect">
//                       {selectedTags.length > 0 && (
//                         <div className="selected-tags">
//                           {selectedTags.map(tag => (
//                             <span key={tag.id} className="selected-tag">
//                               <span className="tag-name">{tag.name}</span>
//                               <button 
//                                 type="button" 
//                                 className="remove-tag-btn"
//                                 onClick={() => handleRemoveTag(tag.id)}
//                               >
//                                 <FaTimes />
//                               </button>
//                             </span>
//                           ))}
//                         </div>
//                       )}

//                       <div className="tags-list">
//                         {tags.map(tag => {
//                           const isSelected = selectedTags.some(t => t.id === tag.id);
//                           return (
//                             <button
//                               key={tag.id}
//                               type="button"
//                               className={`tag-item ${isSelected ? 'selected' : ''}`}
//                               onClick={() => handleTagSelect(tag)}
//                             >
//                               <span className="tag-check">{isSelected ? '✓' : '+'}</span>
//                               <span className="tag-name">{tag.name}</span>
//                             </button>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="no-tags-message">
//                       <FaExclamationCircle />
//                       <span>برای این دسته‌بندی برچسبی تعریف نشده است</span>
//                     </div>
//                   )}
//                 </>
//               )}
//               {renderError('tags')}
//             </div>

//             {/* آپلود تصویر شاخص */}
//             <div className="form-group">
//               <label className="form-label">
//                 تصویر شاخص <span className="required">*</span>
//               </label>
              
//               <div className={`image-upload-area ${errors.image ? 'error' : ''}`}>
//                 {imagePreview ? (
//                   <div className="image-preview-container">
//                     <img src={imagePreview} alt="پیش‌نمایش" className="image-preview" />
//                     {isImageUploading && (
//                       <div className="image-upload-overlay">
//                         <div className="upload-spinner"></div>
//                         <span>{imageUploadProgress}%</span>
//                       </div>
//                     )}
//                     <button 
//                       type="button" 
//                       className="remove-image-btn"
//                       onClick={handleRemoveImage}
//                       disabled={isImageUploading}
//                     >
//                       <FaTimes />
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     <input
//                       type="file"
//                       id="imageInput"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="image-input"
//                       disabled={isImageUploading}
//                     />
//                     <label htmlFor="imageInput" className="image-upload-label">
//                       {isImageUploading ? (
//                         <>
//                           <FaSpinner className="upload-spinner-icon" />
//                           <span>در حال آپلود... {imageUploadProgress}%</span>
//                         </>
//                       ) : (
//                         <>
//                           <FaUpload className="upload-icon" />
//                           <span>برای آپلود تصویر کلیک کنید</span>
//                           <span className="upload-hint">فرمت‌های مجاز: JPG, PNG, WebP</span>
//                           <span className="upload-hint">حداکثر حجم: 10 مگابایت</span>
//                         </>
//                       )}
//                     </label>
//                   </>
//                 )}
//               </div>
//               {renderError('image')}
//               {isImageUploading && (
//                 <div className="image-upload-progress">
//                   <div className="progress-bar">
//                     <div 
//                       className="progress-fill" 
//                       style={{ width: `${imageUploadProgress}%` }}
//                     />
//                   </div>
//                   <span className="progress-text">{imageUploadProgress}%</span>
//                 </div>
//               )}
//             </div>

//             {/* وضعیت انتشار */}
//             <div className="form-group">
//               <label className="form-label">وضعیت انتشار</label>
//               <div className="publish-toggle">
//                 <button
//                   type="button"
//                   className={`toggle-btn ${formData.isPublished ? 'active' : ''}`}
//                   onClick={() => setFormData(prev => ({ ...prev, isPublished: true }))}
//                 >
//                   <FaEye /> منتشر شده
//                 </button>
//                 <button
//                   type="button"
//                   className={`toggle-btn ${!formData.isPublished ? 'active' : ''}`}
//                   onClick={() => setFormData(prev => ({ ...prev, isPublished: false }))}
//                 >
//                   <FaEyeSlash /> پیش‌نویس
//                 </button>
//               </div>
//             </div>

//             {/* دکمه‌ها */}
//             <div className="form-actions">
//               <button
//                 type="button"
//                 className="cancel-btn"
//                 onClick={() => navigate('/blog')}
//               >
//                 انصراف
//               </button>
//               <button
//                 type="submit"
//                 className="submit-btn"
//                 disabled={loading || isUploading || isImageUploading}
//               >
//                 {loading ? (
//                   <>
//                     <FaSpinner className="spinner" />
//                     <span>در حال ثبت مقاله...</span>
//                   </>
//                 ) : (
//                   <>
//                     <FaSave />
//                     <span>انتشار مقاله</span>
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* پیشرفت کلی */}
//             {(loading || isUploading || isImageUploading) && (
//               <div className="upload-progress">
//                 <div className="progress-bar">
//                   <div 
//                     className="progress-fill" 
//                     style={{ width: `${uploadProgress}%` }}
//                   />
//                 </div>
//                 <span className="progress-text">
//                   {isImageUploading ? 'در حال آپلود تصویر شاخص...' : 
//                    isUploading ? 'در حال آپلود تصاویر...' : 
//                    uploadProgress < 20 ? 'آماده‌سازی...' :
//                    uploadProgress < 60 ? 'آپلود تصاویر محتوا...' :
//                    uploadProgress < 80 ? 'آماده‌سازی داده‌ها...' :
//                    'در حال ثبت مقاله...'}
//                 </span>
//               </div>
//             )}
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogCreate;

// components/page/blog/BlogCreate.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { 
  FaSpinner, FaTag, FaTimes, FaUpload, FaEye, FaEyeSlash,
  FaCheckCircle, FaExclamationCircle, FaSave, FaImage,
  FaTrash
} from 'react-icons/fa';
import './BlogCreate.css';

const BlogCreate = () => {
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loadingTags, setLoadingTags] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    categoryId: '',
    isPublished: true,
    image: null,
    imageCacheId: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  
  // State برای مدیریت آپلود تصاویر در ویرایشگر
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // دریافت دسته‌بندی‌ها
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://localhost:7178/api/Post/GetCategoryPostsDTOs', {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status === 200 && result.data) {
          setCategories(result.data);
        }
      }
    } catch (error) {
      console.error('❌ خطا در دریافت دسته‌بندی‌ها:', error);
    }
  };

  // دریافت تگ‌ها بر اساس دسته‌بندی
  const fetchTags = async (categoryId) => {
    if (!categoryId) {
      setTags([]);
      setSelectedTags([]);
      return;
    }

    setLoadingTags(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`https://localhost:7178/api/Post/GetTagsDtosDTOs?catId=${categoryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status === 200 && result.data) {
          setTags(result.data);
          setSelectedTags([]);
        } else {
          setTags([]);
        }
      } else {
        setTags([]);
      }
    } catch (error) {
      console.error('❌ خطا در دریافت تگ‌ها:', error);
      setTags([]);
    } finally {
      setLoadingTags(false);
    }
  };

  // ===== آپلود تصویر شاخص =====
  const uploadImage = async (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('image', file);

      const xhr = new XMLHttpRequest();
      const token = localStorage.getItem('auth_token');

      xhr.open('POST', 'https://localhost:7178/api/RealEstatePage/UploadTempImage', true);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = Math.round((event.loaded / event.total) * 100);
          onProgress(progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const result = JSON.parse(xhr.responseText);
            if (result.success && result.cacheId) {
              resolve(result.cacheId);
            } else {
              reject(new Error('خطا در آپلود تصویر'));
            }
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error(`خطا در آپلود: ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error('خطا در ارتباط با سرور'));
      };

      xhr.send(formData);
    });
  };

  // ===== آپلود تصویر محتوای مقاله =====
  const uploadImagePost = async (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('image', file);

      const xhr = new XMLHttpRequest();
      const token = localStorage.getItem('auth_token');

      xhr.open('POST', 'https://localhost:7178/api/Post/UploadTempImagePost', true);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = Math.round((event.loaded / event.total) * 100);
          onProgress(progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const result = JSON.parse(xhr.responseText);
            if (result.success && result.fileName) {
              resolve(result.fileName);
            } else {
              reject(new Error('خطا در آپلود تصویر'));
            }
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error(`خطا در آپلود: ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error('خطا در ارتباط با سرور'));
      };

      xhr.send(formData);
    });
  };

  // ===== حذف تصویر از کش =====
  const clearTempImage = async (cacheId) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('https://localhost:7178/api/RealEstatePage/ClearTempImage', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cacheId })
      });

      if (response.ok) {
        const result = await response.json();
        return result.success;
      }
      return false;
    } catch (error) {
      console.error('❌ خطا در حذف تصویر:', error);
      return false;
    }
  };

  // // ===== تبدیل Base64 به File =====
  // const base64ToFile = (base64, fileName) => {
  //   const arr = base64.split(',');
  //   const mime = arr[0].match(/:(.*?);/)[1];
  //   const bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   const u8arr = new Uint8Array(n);
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], fileName, { type: mime });
  // };

  // // ===== آپلود تصاویر محتوای مقاله =====
  // const uploadContentImages = async (htmlContent) => {
  //   const temp = document.createElement('div');
  //   temp.innerHTML = htmlContent;
  //   const images = temp.querySelectorAll('img');
  //   const uploadPromises = [];
  //   const imageMap = {};
  //   const fileNames = [];

  //   images.forEach((img, index) => {
  //     const src = img.getAttribute('src');
  //     console.log('asdasdasdasd',src)
  //     // اگر تصویر Base64 است
  //     if (src && src.startsWith('data:image')) {
  //       const fileName = `content_image_${Date.now()}_${index}.jpg`;
  //       const file = base64ToFile(src, fileName);

        
  //       const promise = uploadImagePost(file, (progress) => {
  //         console.log(`آپلود تصویر محتوا ${index + 1}: ${progress}%`);
  //       })
  //       .then((uploadedFileName) => {
  //         // ذخیره با مسیر کامل
  //         const imageUrl = `/post/${uploadedFileName}`;
  //         imageMap[src] = imageUrl;
  //         fileNames.push(uploadedFileName);
  //         return { fileName: uploadedFileName, src, imageUrl };
  //       }).catch((error) => {
  //         console.error(`خطا در آپلود تصویر ${index + 1}:`, error);
  //         return null;
  //       });
        
  //       uploadPromises.push(promise);
  //     }
  //   });

  //   // اگر تصویری برای آپلود وجود نداشت
  //   if (uploadPromises.length === 0) {
  //     return { updatedContent: htmlContent, fileNames: [] };
  //   }

  //   const results = await Promise.all(uploadPromises);
    
  //   let updatedContent = htmlContent;
  //   results.forEach((result) => {
  //     if (result && result.src && result.imageUrl) {
  //       updatedContent = updatedContent.replace(result.src, result.imageUrl);
  //     }
  //   });

  //   return { updatedContent, fileNames };
  // };
  const base64ToFile = (base64, fileName) => {
  try {
    const arr = base64.split(',');
    if (arr.length < 2) throw new Error('فرمت Base64 نامعتبر است');
    
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) throw new Error('نوع MIME پیدا نشد');
    
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  } catch (error) {
    console.error('خطا در تبدیل Base64 به File:', error);
    throw error;
  }
};

// ===== آپلود تصاویر محتوای مقاله =====
const uploadContentImages = async (htmlContent) => {
  try {
    const temp = document.createElement('div');
    temp.innerHTML = htmlContent;
    const images = temp.querySelectorAll('img');
    
    if (images.length === 0) {
      return { updatedContent: htmlContent, fileNames: [] };
    }

    const uploadPromises = [];
    const imageMap = new Map(); // استفاده از Map برای سرعت بیشتر

    images.forEach((img, index) => {
      const src = img.getAttribute('src');
      
      // اگر تصویر Base64 است
      if (src && src.startsWith('data:image')) {
        const fileName = `content_image_${Date.now()}_${index}.${src.split('/')[1].split(';')[0] || 'jpg'}`;
        
        try {
          const file = base64ToFile(src, fileName);
          
          const promise = uploadImagePost(file, (progress) => {
            console.log(`آپلود تصویر محتوا ${index + 1}: ${progress}%`);
          })
          .then((uploadedFileName) => {
            // بررسی کنید که آیا uploadedFileName مسیر کامل است یا فقط نام فایل
            const imageUrl = uploadedFileName.startsWith('http') 
              ? uploadedFileName 
              : `/post/${uploadedFileName}`;
            
            imageMap.set(src, imageUrl);
            return { success: true, src, imageUrl, fileName: uploadedFileName };
          })
          .catch((error) => {
            console.error(`خطا در آپلود تصویر ${index + 1}:`, error);
            // تصویر را با همان src نگه دارید
            imageMap.set(src, src);
            return { success: false, src, error };
          });
          
          uploadPromises.push(promise);
        } catch (error) {
          console.error(`خطا در پردازش تصویر ${index + 1}:`, error);
          imageMap.set(src, src); // تصویر را با همان src نگه دارید
        }
      }
    });

    // اگر تصویری برای آپلود وجود نداشت
    if (uploadPromises.length === 0) {
      return { updatedContent: htmlContent, fileNames: [] };
    }

    const results = await Promise.all(uploadPromises);
    
    // جایگزینی هوشمندانه‌تر
    let updatedContent = htmlContent;
    const successfulUploads = results.filter(r => r && r.success);
    const fileNames = successfulUploads.map(r => r.fileName);
    
    // جایگزینی همه تصاویر با استفاده از Map
    for (const [oldSrc, newSrc] of imageMap) {
      if (oldSrc !== newSrc) {
        // استفاده از replace با regex برای جایگزینی همه موارد
        updatedContent = updatedContent.replace(new RegExp(oldSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newSrc);
      }
    }

    return { 
      updatedContent, 
      fileNames,
      uploadedCount: successfulUploads.length,
      totalCount: results.length
    };
  } catch (error) {
    console.error('خطا در آپلود تصاویر محتوا:', error);
    return { updatedContent: htmlContent, fileNames: [], error: error.message };
  }
};

  // ===== هندلر آپلود تصویر در ویرایشگر =====
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      if (file.size > 10 * 1024 * 1024) {
        alert('حجم تصویر نباید بیشتر از 10 مگابایت باشد');
        return;
      }

      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      
      // نمایش لودینگ در ویرایشگر
      const loadingGif = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      quill.insertEmbed(range.index, 'image', loadingGif);

      const newImage = {
        file,
        progress: 0,
        status: 'uploading',
        fileName: null,
        url: null
      };
      setUploadedImages(prev => [...prev, newImage]);
      setIsUploading(true);

      try {
        // آپلود تصویر
        const fileName = await uploadImagePost(file, (progress) => {
          setUploadedImages(prev => 
            prev.map(img => 
              img.file === file ? { ...img, progress } : img
            )
          );
        });
        
        // ایجاد مسیر تصویر
        const imageUrl = `/post/${fileName}`;
        
        // حذف لودینگ و درج تصویر با data-image-id
        quill.deleteText(range.index, 1);
        
        // ایجاد تگ img با data-image-id
        const imgHtml = `<img src="${imageUrl}" data-image-id="${fileName}" alt="تصویر مقاله" />`;
        
        // استفاده از insertEmbed
        quill.insertEmbed(range.index, 'image', imageUrl);
        
        // بعد از درج، data-image-id را اضافه کن
        setTimeout(() => {
          const editor = document.querySelector('.ql-editor');
          const images = editor.querySelectorAll('img');
          const lastImg = images[images.length - 1];
          if (lastImg) {
            lastImg.setAttribute('data-image-id', fileName);
            lastImg.setAttribute('alt', 'تصویر مقاله');
          }
        }, 50);
        
        quill.setSelection(range.index + 1);

        setUploadedImages(prev => 
          prev.map(img => 
            img.file === file ? { 
              ...img, 
              fileName, 
              url: imageUrl, 
              status: 'success', 
              progress: 100 
            } : img
          )
        );
      } catch (error) {
        console.error('❌ خطا:', error);
        alert('خطا در آپلود تصویر. لطفاً دوباره تلاش کنید.');
        quill.deleteText(range.index, 1);
        setUploadedImages(prev => prev.filter(img => img.file !== file));
      } finally {
        setIsUploading(false);
      }
    };
  };

  // ===== حذف تصویر آپلود شده =====
  const removeUploadedImage = async (imageToRemove) => {
    if (imageToRemove.fileName) {
      try {
        const token = localStorage.getItem('auth_token');
        await fetch(`https://localhost:7178/api/Post/DeleteTempImage?fileName=${imageToRemove.fileName}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error('خطا در حذف تصویر:', error);
      }
    }
    setUploadedImages(prev => prev.filter(img => img.file !== imageToRemove.file));
  };

  // ===== آپلود تصویر شاخص =====
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, image: 'لطفاً یک تصویر معتبر انتخاب کنید' }));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: 'حجم تصویر نباید بیشتر از 10 مگابایت باشد' }));
      return;
    }

    // نمایش پیش‌نمایش
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // آپلود تصویر شاخص
    setIsImageUploading(true);
    setImageUploadProgress(0);

    try {
      const cacheId = await uploadImage(file, (progress) => {
        setImageUploadProgress(progress);
      });

      setFormData(prev => ({ ...prev, image: file, imageCacheId: cacheId }));
      
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }));
      }
    } catch (error) {
      console.error('❌ خطا در آپلود تصویر شاخص:', error);
      setErrors(prev => ({ ...prev, image: 'خطا در آپلود تصویر' }));
      setImagePreview(null);
    } finally {
      setIsImageUploading(false);
    }
  };

  // ===== حذف تصویر شاخص =====
  const handleRemoveImage = async () => {
    if (formData.imageCacheId) {
      await clearTempImage(formData.imageCacheId);
    }
    setFormData(prev => ({ ...prev, image: null, imageCacheId: null }));
    setImagePreview(null);
    setImageUploadProgress(0);
    const fileInput = document.getElementById('imageInput');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // ===== ماژول‌های Quill =====
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        ['clean']
        ,  ['table']
      ],
      handlers: {
        image: imageHandler,
              link: function() {
        const quill = this.quill;
        const range = quill.getSelection();
        if (range) {
          const text = quill.getText(range.index, range.length);
          const url = prompt('لطفاً آدرس لینک را وارد کنید:', 'https://');
          if (url) {
            quill.format('link', url);
          }
        }
      }
      }
    },
    clipboard: {
      matchVisual: false
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet', 'check',
    'indent',
    'align',
    'blockquote', 'code-block',
    'link', 'image', 'video', 'formula',
    'width', 'height',
      // ✅ اضافه کردن فرمت‌های جدول
  'table', 'td', 'th', 'tr'
  ];

  // مدیریت تغییرات فیلدها
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === 'categoryId') {
      fetchTags(value);
    }
  };

  // مدیریت تغییرات محتوای ویرایشگر
  const handleContentChange = (value) => {
    setFormData(prev => ({ ...prev, content: value }));
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: '' }));
    }
  };

  // مدیریت انتخاب تگ
  const handleTagSelect = (tag) => {
    if (selectedTags.some(t => t.id === tag.id)) {
      setSelectedTags(prev => prev.filter(t => t.id !== tag.id));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags(prev => prev.filter(t => t.id !== tagId));
  };

  // اعتبارسنجی فرم
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'عنوان مقاله الزامی است';
    } else if (formData.title.length < 5) {
      newErrors.title = 'عنوان باید حداقل 5 کاراکتر باشد';
    }

    if (!formData.summary.trim()) {
      newErrors.summary = 'خلاصه مقاله الزامی است';
    } else if (formData.summary.length < 10) {
      newErrors.summary = 'خلاصه باید حداقل 10 کاراکتر باشد';
    }

    const plainText = formData.content.replace(/<[^>]*>/g, '').trim();
    if (!plainText) {
      newErrors.content = 'متن مقاله الزامی است';
    } else if (plainText.length < 50) {
      newErrors.content = 'متن مقاله باید حداقل 50 کاراکتر باشد';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'لطفاً یک دسته‌بندی انتخاب کنید';
    }

    if (selectedTags.length === 0) {
      newErrors.tags = 'لطفاً حداقل یک برچسب انتخاب کنید';
    }

    if (!formData.imageCacheId && !formData.image) {
      newErrors.image = 'تصویر شاخص الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== تابع تولید اسلاگ =====
  const generateSlug = (title) => {
    return title
      .trim()
      .toLowerCase()
      .replace(/[^\w\s\-آ-ی]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // ===== تابع پردازش محتوا قبل از ارسال =====
  const processContentBeforeSubmit = (content) => {
    if (!content) return '';
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    const images = tempDiv.querySelectorAll('img');
    images.forEach((img) => {
      const src = img.getAttribute('src');
      const dataImageId = img.getAttribute('data-image-id');
      
      // اگر data-image-id وجود دارد و src به صورت /posts/ است
      if (dataImageId && src && src.startsWith('/posts/')) {
        // اطمینان از اینکه data-image-id با fileName مطابقت دارد
        const fileName = src.replace('/posts/', '');
        if (dataImageId !== fileName) {
          img.setAttribute('data-image-id', fileName);
        }
      }
      // اگر src به صورت /posts/ است اما data-image-id ندارد
      else if (src && src.startsWith('/posts/')) {
        const fileName = src.replace('/posts/', '');
        img.setAttribute('data-image-id', fileName);
      }
      // اگر imageId ندارد و src به صورت دیگری است
      else if (src && !src.startsWith('http') && !src.startsWith('data:')) {
        const fileName = src.split('/').pop();
        img.setAttribute('data-image-id', fileName);
      }
    });
    
    return tempDiv.innerHTML;
  };

  // ===== ارسال فرم =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstError = document.querySelector('.input-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      const token = localStorage.getItem('auth_token');
      
      // پردازش محتوا و اطمینان از وجود data-image-id
      const processedContent = processContentBeforeSubmit(formData.content);
      
      // آپلود تصاویر موجود در محتوا
      setUploadProgress(20);
      const { updatedContent, fileNames: contentFileNames } = await uploadContentImages(processedContent);
      setUploadProgress(60);

      // آماده‌سازی داده‌ها
      const tagIds = selectedTags.map(tag => tag.id);
      
      // جمع‌آوری همه fileName ها
      const allFileNames = [...contentFileNames];
      
      // اضافه کردن fileName تصاویر آپلود شده در ویرایشگر
      const editorImageFileNames = uploadedImages
        .filter(img => img.status === 'success' && img.fileName)
        .map(img => img.fileName);
      allFileNames.push(...editorImageFileNames);

      // استخراج imageIds از محتوا
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = updatedContent;
      const images = tempDiv.querySelectorAll('img');
      const imageIds = [];
      images.forEach(img => {
        const imageId = img.getAttribute('data-image-id');
        if (imageId) {
          imageIds.push(imageId);
        }
      });

      const submitData = {
        id: 0,
        slug: generateSlug(formData.title),
        title: formData.title,
        summary: formData.summary,
        content: updatedContent,
        categoryId: parseInt(formData.categoryId),
        tagsId: tagIds,
        isPublished: formData.isPublished,
        tempImageCacheIds: formData.imageCacheId,
        imageIds: imageIds // اضافه کردن imageIds به داده‌ها
      };

      console.log('📤 ارسال داده:', submitData);
      console.log('📸 فایل‌های تصویر:', allFileNames);
      console.log('🖼️ imageIds:', imageIds);

      const response = await fetch('https://localhost:7178/api/Post/InsertPost', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      setUploadProgress(100);

      if (!response.ok) {
        let errorMessage = 'خطا در ثبت مقاله';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          console.log('خطای سرور:', errorData);
        } catch (e) {}
        throw new Error(errorMessage);
      }

      const result = await response.json();
      
      if (result.status === 200 || result.isSuccess) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/blog');
        }, 2000);
      } else {
        throw new Error(result.message || 'خطا در ثبت مقاله');
      }
    } catch (error) {
      console.error('❌ خطا:', error);
      setErrors({ submit: error.message || 'مشکل در ارتباط با سرور' });
    } finally {
      setLoading(false);
    }
  };

  const renderError = (field) => {
    if (errors[field]) {
      return <span className="input-error">{errors[field]}</span>;
    }
    return null;
  };

  return (
    <div className="blog-create-wrapper">
      {/* هدر */}
      <div className="blog-create-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="blog-create-title">✍️ ثبت مقاله جدید</h1>
            <p className="blog-create-subtitle">مقالات خود را با ویرایشگر حرفه‌ای بنویسید و منتشر کنید</p>
          </div>
          <button 
            className="preview-toggle-btn"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? '✏️ ویرایش' : '👁️ پیش‌نمایش'}
          </button>
        </div>
      </div>

      {/* فرم */}
      <div className="blog-create-form-container">
        {success ? (
          <div className="success-message">
            <FaCheckCircle className="success-icon" />
            <h3>🎉 مقاله با موفقیت ثبت شد!</h3>
            <p>در حال انتقال به صفحه وبلاگ...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="blog-create-form">
            {/* خطای سرور */}
            {errors.submit && (
              <div className="submit-error">
                <FaExclamationCircle />
                <span>{errors.submit}</span>
              </div>
            )}

            {/* عنوان */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                عنوان مقاله <span className="required">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="عنوان جذاب برای مقاله خود بنویسید..."
                className={`form-input ${errors.title ? 'error' : ''}`}
              />
              {renderError('title')}
            </div>

            {/* خلاصه */}
            <div className="form-group">
              <label htmlFor="summary" className="form-label">
                خلاصه مقاله <span className="required">*</span>
              </label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="خلاصه‌ای از مقاله را وارد کنید..."
                rows="3"
                className={`form-textarea ${errors.summary ? 'error' : ''}`}
              />
              {renderError('summary')}
            </div>

            {/* ویرایشگر متن پیشرفته */}
            <div className="form-group">
              <label className="form-label">
                متن مقاله <span className="required">*</span>
              </label>
              <div className={`editor-wrapper ${showPreview ? 'preview-mode' : ''}`}>
                {showPreview ? (
                  <div 
                    className="preview-content"
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                  />
                ) : (
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={formData.content}
                    onChange={handleContentChange}
                    modules={modules}
                    formats={formats}
                    placeholder="متن مقاله را بنویسید... برای درج تصویر روی آیکون 🖼️ کلیک کنید"
                    className={`blog-editor ${errors.content ? 'error' : ''}`}
                  />
                )}
              </div>
              {renderError('content')}
              
              {/* نمایش وضعیت آپلود تصاویر */}
              {uploadedImages.length > 0 && (
                <div className="upload-status-container">
                  <div className="upload-status-header">
                    <FaImage className="upload-status-icon" />
                    <span>تصاویر در حال آپلود ({uploadedImages.length})</span>
                  </div>
                  <div className="upload-status-list">
                    {uploadedImages.map((img, index) => (
                      <div key={index} className="upload-status-item">
                        <div className="upload-file-info">
                          <span className="upload-file-name">{img.file.name}</span>
                          <span className="upload-file-size">
                            {(img.file.size / 1024).toFixed(1)} KB
                          </span>
                        </div>
                        <div className="upload-progress-bar">
                          <div 
                            className={`upload-progress-fill ${img.status}`}
                            style={{ width: `${img.progress}%` }}
                          />
                        </div>
                        <div className="upload-status-actions">
                          {img.status === 'uploading' && (
                            <span className="upload-status-text uploading">
                              {img.progress}%
                            </span>
                          )}
                          {img.status === 'success' && (
                            <span className="upload-status-text success">
                              <FaCheckCircle /> آپلود شد
                            </span>
                          )}
                          {img.status === 'error' && (
                            <span className="upload-status-text error">
                              خطا
                            </span>
                          )}
                          {img.status === 'success' && (
                            <button
                              type="button"
                              className="remove-upload-btn"
                              onClick={() => removeUploadedImage(img)}
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* دسته‌بندی */}
            <div className="form-group">
              <label htmlFor="categoryId" className="form-label">
                دسته‌بندی <span className="required">*</span>
              </label>
              <div className="select-wrapper">
                <FaTag className="select-icon" />
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className={`form-select ${errors.categoryId ? 'error' : ''}`}
                >
                  <option value="">انتخاب دسته‌بندی...</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              {renderError('categoryId')}
            </div>

            {/* برچسب‌ها */}
            <div className="form-group">
              <label className="form-label">
                برچسب‌ها <span className="required">*</span>
              </label>
              
              {loadingTags ? (
                <div className="tags-loading">
                  <FaSpinner className="spinner-small" />
                  <span>در حال بارگذاری برچسب‌ها...</span>
                </div>
              ) : (
                <>
                  {tags.length > 0 ? (
                    <div className="tags-multiselect">
                      {selectedTags.length > 0 && (
                        <div className="selected-tags">
                          {selectedTags.map(tag => (
                            <span key={tag.id} className="selected-tag">
                              <span className="tag-name">{tag.name}</span>
                              <button 
                                type="button" 
                                className="remove-tag-btn"
                                onClick={() => handleRemoveTag(tag.id)}
                              >
                                <FaTimes />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="tags-list">
                        {tags.map(tag => {
                          const isSelected = selectedTags.some(t => t.id === tag.id);
                          return (
                            <button
                              key={tag.id}
                              type="button"
                              className={`tag-item ${isSelected ? 'selected' : ''}`}
                              onClick={() => handleTagSelect(tag)}
                            >
                              <span className="tag-check">{isSelected ? '✓' : '+'}</span>
                              <span className="tag-name">{tag.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="no-tags-message">
                      <FaExclamationCircle />
                      <span>برای این دسته‌بندی برچسبی تعریف نشده است</span>
                    </div>
                  )}
                </>
              )}
              {renderError('tags')}
            </div>

            {/* آپلود تصویر شاخص */}
            <div className="form-group">
              <label className="form-label">
                تصویر شاخص <span className="required">*</span>
              </label>
              
              <div className={`image-upload-area ${errors.image ? 'error' : ''}`}>
                {imagePreview ? (
                  <div className="image-preview-container">
                    <img src={imagePreview} alt="پیش‌نمایش" className="image-preview" />
                    {isImageUploading && (
                      <div className="image-upload-overlay">
                        <div className="upload-spinner"></div>
                        <span>{imageUploadProgress}%</span>
                      </div>
                    )}
                    <button 
                      type="button" 
                      className="remove-image-btn"
                      onClick={handleRemoveImage}
                      disabled={isImageUploading}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="image-input"
                      disabled={isImageUploading}
                    />
                    <label htmlFor="imageInput" className="image-upload-label">
                      {isImageUploading ? (
                        <>
                          <FaSpinner className="upload-spinner-icon" />
                          <span>در حال آپلود... {imageUploadProgress}%</span>
                        </>
                      ) : (
                        <>
                          <FaUpload className="upload-icon" />
                          <span>برای آپلود تصویر کلیک کنید</span>
                          <span className="upload-hint">فرمت‌های مجاز: JPG, PNG, WebP</span>
                          <span className="upload-hint">حداکثر حجم: 10 مگابایت</span>
                        </>
                      )}
                    </label>
                  </>
                )}
              </div>
              {renderError('image')}
              {isImageUploading && (
                <div className="image-upload-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${imageUploadProgress}%` }}
                    />
                  </div>
                  <span className="progress-text">{imageUploadProgress}%</span>
                </div>
              )}
            </div>

            {/* وضعیت انتشار */}
            <div className="form-group">
              <label className="form-label">وضعیت انتشار</label>
              <div className="publish-toggle">
                <button
                  type="button"
                  className={`toggle-btn ${formData.isPublished ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, isPublished: true }))}
                >
                  <FaEye /> منتشر شده
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${!formData.isPublished ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, isPublished: false }))}
                >
                  <FaEyeSlash /> پیش‌نویس
                </button>
              </div>
            </div>

            {/* دکمه‌ها */}
            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate('/blog')}
              >
                انصراف
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={loading || isUploading || isImageUploading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="spinner" />
                    <span>در حال ثبت مقاله...</span>
                  </>
                ) : (
                  <>
                    <FaSave />
                    <span>انتشار مقاله</span>
                  </>
                )}
              </button>
            </div>

            {/* پیشرفت کلی */}
            {(loading || isUploading || isImageUploading) && (
              <div className="upload-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <span className="progress-text">
                  {isImageUploading ? 'در حال آپلود تصویر شاخص...' : 
                   isUploading ? 'در حال آپلود تصاویر...' : 
                   uploadProgress < 20 ? 'آماده‌سازی...' :
                   uploadProgress < 60 ? 'آپلود تصاویر محتوا...' :
                   uploadProgress < 80 ? 'آماده‌سازی داده‌ها...' :
                   'در حال ثبت مقاله...'}
                </span>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogCreate;