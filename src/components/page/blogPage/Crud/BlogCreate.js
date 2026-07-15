// // // // // // // components/page/blog/BlogCreate.js
// // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // import ReactQuill from 'react-quill-new';
// // // // // // import 'react-quill-new/dist/quill.snow.css';
// // // // // // import { 
// // // // // //   FaSpinner, FaTag, FaTimes, FaUpload, FaEye, FaEyeSlash,
// // // // // //   FaCheckCircle, FaExclamationCircle, FaSave, FaImage,
// // // // // //   FaBold, FaItalic, FaUnderline, FaStrikethrough,
// // // // // //   FaListUl, FaListOl, FaAlignLeft, FaAlignCenter, FaAlignRight,
// // // // // //   FaQuoteRight, FaLink, FaUndo, FaRedo
// // // // // // } from 'react-icons/fa';
// // // // // // import './BlogCreate.css';

// // // // // // const BlogCreate = () => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const quillRef = useRef(null);
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [categories, setCategories] = useState([]);
// // // // // //   const [formData, setFormData] = useState({
// // // // // //     title: '',
// // // // // //     summary: '',
// // // // // //     content: '',
// // // // // //     categoryId: '',
// // // // // //     tags: '',
// // // // // //     isPublished: true,
// // // // // //     image: null
// // // // // //   });
// // // // // //   const [imagePreview, setImagePreview] = useState(null);
// // // // // //   const [errors, setErrors] = useState({});
// // // // // //   const [success, setSuccess] = useState(false);
// // // // // //   const [uploadProgress, setUploadProgress] = useState(0);
// // // // // //   const [showPreview, setShowPreview] = useState(false);

// // // // // //   // دریافت دسته‌بندی‌ها
// // // // // //   useEffect(() => {
// // // // // //     fetchCategories();
// // // // // //   }, []);

// // // // // //   const fetchCategories = async () => {
// // // // // //     try {
// // // // // //       const response = await fetch('https://localhost:7178/api/Post/GetCategoryPostsDTOs', {
// // // // // //         headers: {
// // // // // //           'Content-Type': 'application/json'
// // // // // //         }
// // // // // //       });

// // // // // //       if (response.ok) {
// // // // // //         const result = await response.json();
// // // // // //         if (result.status === 200 && result.data) {
// // // // // //           setCategories(result.data);
// // // // // //         }
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('❌ خطا در دریافت دسته‌بندی‌ها:', error);
// // // // // //     }
// // // // // //   };

// // // // // //   // ===== تنظیمات پیشرفته Quill با قابلیت آپلود تصویر =====
// // // // // //   const imageHandler = () => {
// // // // // //     const input = document.createElement('input');
// // // // // //     input.setAttribute('type', 'file');
// // // // // //     input.setAttribute('accept', 'image/*');
// // // // // //     input.click();

// // // // // //     input.onchange = async () => {
// // // // // //       const file = input.files[0];
// // // // // //       if (file) {
// // // // // //         // بررسی حجم فایل
// // // // // //         if (file.size > 5 * 1024 * 1024) {
// // // // // //           alert('حجم تصویر نباید بیشتر از 5 مگابایت باشد');
// // // // // //           return;
// // // // // //         }

// // // // // //         // نمایش لودینگ
// // // // // //         const quill = quillRef.current.getEditor();
// // // // // //         const range = quill.getSelection();
// // // // // //         quill.insertEmbed(range.index, 'image', '/loading.gif');

// // // // // //         try {
// // // // // //           // آپلود تصویر به سرور
// // // // // //           const formData = new FormData();
// // // // // //           formData.append('image', file);

// // // // // //           const token = localStorage.getItem('auth_token');
// // // // // //           const response = await fetch('https://localhost:7178/api/Post/UploadImage', {
// // // // // //             method: 'POST',
// // // // // //             headers: {
// // // // // //               'Authorization': `Bearer ${token}`
// // // // // //             },
// // // // // //             body: formData
// // // // // //           });

// // // // // //           if (response.ok) {
// // // // // //             const result = await response.json();
// // // // // //             if (result.status === 200 && result.data) {
// // // // // //               // حذف لودینگ و درج تصویر واقعی
// // // // // //               quill.deleteText(range.index, 1);
// // // // // //               quill.insertEmbed(range.index, 'image', result.data.url);
// // // // // //               quill.setSelection(range.index + 1);
// // // // // //             } else {
// // // // // //               throw new Error(result.message || 'خطا در آپلود تصویر');
// // // // // //             }
// // // // // //           } else {
// // // // // //             throw new Error('خطا در آپلود تصویر');
// // // // // //           }
// // // // // //         } catch (error) {
// // // // // //           console.error('❌ خطا:', error);
// // // // // //           alert('خطا در آپلود تصویر. لطفاً دوباره تلاش کنید.');
// // // // // //           // حذف لودینگ
// // // // // //           quill.deleteText(range.index, 1);
// // // // // //         }
// // // // // //       }
// // // // // //     };
// // // // // //   };

// // // // // //   // ===== ماژول‌های Quill =====
// // // // // //   const modules = {
// // // // // //     toolbar: {
// // // // // //       container: [
// // // // // //         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
// // // // // //         [{ 'font': [] }],
// // // // // //         [{ 'size': ['small', false, 'large', 'huge'] }],
// // // // // //         ['bold', 'italic', 'underline', 'strike'],
// // // // // //         [{ 'color': [] }, { 'background': [] }],
// // // // // //         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
// // // // // //         [{ 'indent': '-1' }, { 'indent': '+1' }],
// // // // // //         [{ 'align': [] }],
// // // // // //         ['blockquote', 'code-block'],
// // // // // //         ['link', 'image', 'video', 'formula'],
// // // // // //         ['clean']
// // // // // //       ],
// // // // // //       handlers: {
// // // // // //         image: imageHandler // هندلر سفارشی برای آپلود تصویر
// // // // // //       }
// // // // // //     },
// // // // // //     clipboard: {
// // // // // //       matchVisual: false
// // // // // //     }
// // // // // //   };

// // // // // //   const formats = [
// // // // // //     'header', 'font', 'size',
// // // // // //     'bold', 'italic', 'underline', 'strike',
// // // // // //     'color', 'background',
// // // // // //     'list', 'bullet', 'check',
// // // // // //     'indent',
// // // // // //     'align',
// // // // // //     'blockquote', 'code-block',
// // // // // //     'link', 'image', 'video', 'formula',
// // // // // //     'width', 'height'
// // // // // //   ];

// // // // // //   // مدیریت تغییرات فیلدها
// // // // // //   const handleChange = (e) => {
// // // // // //     const { name, value, type, checked } = e.target;
// // // // // //     setFormData(prev => ({
// // // // // //       ...prev,
// // // // // //       [name]: type === 'checkbox' ? checked : value
// // // // // //     }));
// // // // // //     if (errors[name]) {
// // // // // //       setErrors(prev => ({ ...prev, [name]: '' }));
// // // // // //     }
// // // // // //   };

// // // // // //   // مدیریت تغییرات محتوای ویرایشگر
// // // // // //   const handleContentChange = (value) => {
// // // // // //     setFormData(prev => ({ ...prev, content: value }));
// // // // // //     if (errors.content) {
// // // // // //       setErrors(prev => ({ ...prev, content: '' }));
// // // // // //     }
// // // // // //   };

// // // // // //   // مدیریت آپلود تصویر شاخص
// // // // // //   const handleImageChange = (e) => {
// // // // // //     const file = e.target.files[0];
// // // // // //     if (file) {
// // // // // //       if (!file.type.startsWith('image/')) {
// // // // // //         setErrors(prev => ({ ...prev, image: 'لطفاً یک تصویر معتبر انتخاب کنید' }));
// // // // // //         return;
// // // // // //       }
// // // // // //       if (file.size > 5 * 1024 * 1024) {
// // // // // //         setErrors(prev => ({ ...prev, image: 'حجم تصویر نباید بیشتر از 5 مگابایت باشد' }));
// // // // // //         return;
// // // // // //       }

// // // // // //       setFormData(prev => ({ ...prev, image: file }));
// // // // // //       const reader = new FileReader();
// // // // // //       reader.onloadend = () => {
// // // // // //         setImagePreview(reader.result);
// // // // // //       };
// // // // // //       reader.readAsDataURL(file);
      
// // // // // //       if (errors.image) {
// // // // // //         setErrors(prev => ({ ...prev, image: '' }));
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   // حذف تصویر شاخص
// // // // // //   const handleRemoveImage = () => {
// // // // // //     setFormData(prev => ({ ...prev, image: null }));
// // // // // //     setImagePreview(null);
// // // // // //     const fileInput = document.getElementById('imageInput');
// // // // // //     if (fileInput) {
// // // // // //       fileInput.value = '';
// // // // // //     }
// // // // // //   };

// // // // // //   // اعتبارسنجی فرم
// // // // // //   const validateForm = () => {
// // // // // //     const newErrors = {};
    
// // // // // //     if (!formData.title.trim()) {
// // // // // //       newErrors.title = 'عنوان مقاله الزامی است';
// // // // // //     } else if (formData.title.length < 5) {
// // // // // //       newErrors.title = 'عنوان باید حداقل 5 کاراکتر باشد';
// // // // // //     }

// // // // // //     if (!formData.summary.trim()) {
// // // // // //       newErrors.summary = 'خلاصه مقاله الزامی است';
// // // // // //     } else if (formData.summary.length < 10) {
// // // // // //       newErrors.summary = 'خلاصه باید حداقل 10 کاراکتر باشد';
// // // // // //     }

// // // // // //     const plainText = formData.content.replace(/<[^>]*>/g, '').trim();
// // // // // //     if (!plainText) {
// // // // // //       newErrors.content = 'متن مقاله الزامی است';
// // // // // //     } else if (plainText.length < 50) {
// // // // // //       newErrors.content = 'متن مقاله باید حداقل 50 کاراکتر باشد';
// // // // // //     }

// // // // // //     if (!formData.categoryId) {
// // // // // //       newErrors.categoryId = 'لطفاً یک دسته‌بندی انتخاب کنید';
// // // // // //     }

// // // // // //     if (!formData.image) {
// // // // // //       newErrors.image = 'تصویر شاخص الزامی است';
// // // // // //     }

// // // // // //     setErrors(newErrors);
// // // // // //     return Object.keys(newErrors).length === 0;
// // // // // //   };

// // // // // //   // ارسال فرم
// // // // // //   const handleSubmit = async (e) => {
// // // // // //     e.preventDefault();
    
// // // // // //     if (!validateForm()) {
// // // // // //       const firstError = document.querySelector('.input-error');
// // // // // //       if (firstError) {
// // // // // //         firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
// // // // // //       }
// // // // // //       return;
// // // // // //     }

// // // // // //     setLoading(true);
// // // // // //     setUploadProgress(0);

// // // // // //     try {
// // // // // //       const token = localStorage.getItem('auth_token');
      
// // // // // //       const formDataToSend = new FormData();
// // // // // //       formDataToSend.append('Title', formData.title);
// // // // // //       formDataToSend.append('Summary', formData.summary);
// // // // // //       formDataToSend.append('Content', formData.content);
// // // // // //       formDataToSend.append('CategoryId', formData.categoryId);
// // // // // //       formDataToSend.append('Tags', formData.tags);
// // // // // //       formDataToSend.append('IsPublished', formData.isPublished);
// // // // // //             console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
// // // // // //       console.log(formData)
// // // // // //       if (formData.image) {
// // // // // //         formDataToSend.append('Image', formData.image);
// // // // // //       }

// // // // // //       const uploadInterval = setInterval(() => {
// // // // // //         setUploadProgress(prev => {
// // // // // //           if (prev >= 90) {
// // // // // //             clearInterval(uploadInterval);
// // // // // //             return 90;
// // // // // //           }
// // // // // //           return prev + 10;
// // // // // //         });
// // // // // //       }, 100);

// // // // // //       const response = await fetch('https://localhost:7178/api/Post/CreatePost', {
// // // // // //         method: 'POST',
// // // // // //         headers: {
// // // // // //           'Authorization': `Bearer ${token}`
// // // // // //         },
// // // // // //         body: formDataToSend
// // // // // //       });

// // // // // //       clearInterval(uploadInterval);
// // // // // //       setUploadProgress(100);

// // // // // //       if (!response.ok) {
// // // // // //         let errorMessage = 'خطا در ثبت مقاله';
// // // // // //         try {
// // // // // //           const errorData = await response.json();
// // // // // //           errorMessage = errorData.message || errorMessage;
// // // // // //         } catch (e) {}
// // // // // //         throw new Error(errorMessage);
// // // // // //       }

// // // // // //       const result = await response.json();
      
// // // // // //       if (result.status === 200 || result.isSuccess) {
// // // // // //         setSuccess(true);
// // // // // //         setTimeout(() => {
// // // // // //           navigate('/blog');
// // // // // //         }, 2000);
// // // // // //       } else {
// // // // // //         throw new Error(result.message || 'خطا در ثبت مقاله');
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('❌ خطا:', error);
// // // // // //       setErrors({ submit: error.message || 'مشکل در ارتباط با سرور' });
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const renderError = (field) => {
// // // // // //     if (errors[field]) {
// // // // // //       return <span className="input-error">{errors[field]}</span>;
// // // // // //     }
// // // // // //     return null;
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="blog-create-wrapper">
// // // // // //       {/* هدر */}
// // // // // //       <div className="blog-create-header">
// // // // // //         <div className="header-content">
// // // // // //           <div className="header-text">
// // // // // //             <h1 className="blog-create-title">✍️ ثبت مقاله جدید</h1>
// // // // // //             <p className="blog-create-subtitle">مقالات خود را با ویرایشگر حرفه‌ای بنویسید و منتشر کنید</p>
// // // // // //           </div>
// // // // // //           <button 
// // // // // //             className="preview-toggle-btn"
// // // // // //             onClick={() => setShowPreview(!showPreview)}
// // // // // //           >
// // // // // //             {showPreview ? '✏️ ویرایش' : '👁️ پیش‌نمایش'}
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* فرم */}
// // // // // //       <div className="blog-create-form-container">
// // // // // //         {success ? (
// // // // // //           <div className="success-message">
// // // // // //             <FaCheckCircle className="success-icon" />
// // // // // //             <h3>🎉 مقاله با موفقیت ثبت شد!</h3>
// // // // // //             <p>در حال انتقال به صفحه وبلاگ...</p>
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           <form onSubmit={handleSubmit} className="blog-create-form">
// // // // // //             {/* خطای سرور */}
// // // // // //             {errors.submit && (
// // // // // //               <div className="submit-error">
// // // // // //                 <FaExclamationCircle />
// // // // // //                 <span>{errors.submit}</span>
// // // // // //               </div>
// // // // // //             )}

// // // // // //             {/* عنوان */}
// // // // // //             <div className="form-group">
// // // // // //               <label htmlFor="title" className="form-label">
// // // // // //                 عنوان مقاله <span className="required">*</span>
// // // // // //               </label>
// // // // // //               <input
// // // // // //                 type="text"
// // // // // //                 id="title"
// // // // // //                 name="title"
// // // // // //                 value={formData.title}
// // // // // //                 onChange={handleChange}
// // // // // //                 placeholder="عنوان جذاب برای مقاله خود بنویسید..."
// // // // // //                 className={`form-input ${errors.title ? 'error' : ''}`}
// // // // // //               />
// // // // // //               {renderError('title')}
// // // // // //             </div>

// // // // // //             {/* خلاصه */}
// // // // // //             <div className="form-group">
// // // // // //               <label htmlFor="summary" className="form-label">
// // // // // //                 خلاصه مقاله <span className="required">*</span>
// // // // // //               </label>
// // // // // //               <textarea
// // // // // //                 id="summary"
// // // // // //                 name="summary"
// // // // // //                 value={formData.summary}
// // // // // //                 onChange={handleChange}
// // // // // //                 placeholder="خلاصه‌ای از مقاله را وارد کنید..."
// // // // // //                 rows="3"
// // // // // //                 className={`form-textarea ${errors.summary ? 'error' : ''}`}
// // // // // //               />
// // // // // //               {renderError('summary')}
// // // // // //             </div>

// // // // // //             {/* ویرایشگر متن پیشرفته */}
// // // // // //             <div className="form-group">
// // // // // //               <label className="form-label">
// // // // // //                 متن مقاله <span className="required">*</span>
// // // // // //               </label>
// // // // // //               <div className={`editor-wrapper ${showPreview ? 'preview-mode' : ''}`}>
// // // // // //                 {showPreview ? (
// // // // // //                   <div 
// // // // // //                     className="preview-content"
// // // // // //                     dangerouslySetInnerHTML={{ __html: formData.content }}
// // // // // //                   />
// // // // // //                 ) : (
// // // // // //                   <ReactQuill
// // // // // //                     ref={quillRef}
// // // // // //                     theme="snow"
// // // // // //                     value={formData.content}
// // // // // //                     onChange={handleContentChange}
// // // // // //                     modules={modules}
// // // // // //                     formats={formats}
// // // // // //                     placeholder="متن مقاله را بنویسید... برای درج تصویر روی آیکون 🖼️ کلیک کنید"
// // // // // //                     className={`blog-editor ${errors.content ? 'error' : ''}`}
// // // // // //                   />
// // // // // //                 )}
// // // // // //               </div>
// // // // // //               {renderError('content')}
// // // // // //               <div className="editor-tips">
// // // // // //                 <span>💡 راهنمای ویرایشگر:</span>
// // // // // //                 <div className="tips-grid">
// // // // // //                   <span className="tip-item">• <strong>بولد</strong> و <em>ایتالیک</em></span>
// // // // // //                   <span className="tip-item">• <span style={{color: '#7d0000'}}>رنگ متن</span></span>
// // // // // //                   <span className="tip-item">• لیست‌های مرتب و نامرتب</span>
// // // // // //                   <span className="tip-item">• سط‌چین راست، چپ، وسط</span>
// // // // // //                   <span className="tip-item">• <span className="highlight">📸 درج تصویر در متن</span></span>
// // // // // //                   <span className="tip-item">• درج لینک و ویدئو</span>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             {/* دسته‌بندی و تگ‌ها */}
// // // // // //             <div className="form-row">
// // // // // //               <div className="form-group half">
// // // // // //                 <label htmlFor="categoryId" className="form-label">
// // // // // //                   دسته‌بندی <span className="required">*</span>
// // // // // //                 </label>
// // // // // //                 <div className="select-wrapper">
// // // // // //                   <FaTag className="select-icon" />
// // // // // //                   <select
// // // // // //                     id="categoryId"
// // // // // //                     name="categoryId"
// // // // // //                     value={formData.categoryId}
// // // // // //                     onChange={handleChange}
// // // // // //                     className={`form-select ${errors.categoryId ? 'error' : ''}`}
// // // // // //                   >
// // // // // //                     <option value="">انتخاب دسته‌بندی...</option>
// // // // // //                     {categories.map(cat => (
// // // // // //                       <option key={cat.id} value={cat.id}>{cat.name}</option>
// // // // // //                     ))}
// // // // // //                   </select>
// // // // // //                 </div>
// // // // // //                 {renderError('categoryId')}
// // // // // //               </div>

// // // // // //               <div className="form-group half">
// // // // // //                 <label htmlFor="tags" className="form-label">
// // // // // //                   برچسب‌ها
// // // // // //                 </label>
// // // // // //                 <input
// // // // // //                   type="text"
// // // // // //                   id="tags"
// // // // // //                   name="tags"
// // // // // //                   value={formData.tags}
// // // // // //                   onChange={handleChange}
// // // // // //                   placeholder="مثلاً: خرید ملک, سرمایه‌گذاری"
// // // // // //                   className="form-input"
// // // // // //                 />
// // // // // //                 <span className="input-hint">با کاما جدا کنید</span>
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             {/* آپلود تصویر شاخص */}
// // // // // //             <div className="form-group">
// // // // // //               <label className="form-label">
// // // // // //                 تصویر شاخص <span className="required">*</span>
// // // // // //               </label>
              
// // // // // //               <div className={`image-upload-area ${errors.image ? 'error' : ''}`}>
// // // // // //                 {imagePreview ? (
// // // // // //                   <div className="image-preview-container">
// // // // // //                     <img src={imagePreview} alt="پیش‌نمایش" className="image-preview" />
// // // // // //                     <button 
// // // // // //                       type="button" 
// // // // // //                       className="remove-image-btn"
// // // // // //                       onClick={handleRemoveImage}
// // // // // //                     >
// // // // // //                       <FaTimes />
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 ) : (
// // // // // //                   <>
// // // // // //                     <input
// // // // // //                       type="file"
// // // // // //                       id="imageInput"
// // // // // //                       accept="image/*"
// // // // // //                       onChange={handleImageChange}
// // // // // //                       className="image-input"
// // // // // //                     />
// // // // // //                     <label htmlFor="imageInput" className="image-upload-label">
// // // // // //                       <FaUpload className="upload-icon" />
// // // // // //                       <span>برای آپلود تصویر کلیک کنید</span>
// // // // // //                       <span className="upload-hint">فرمت‌های مجاز: JPG, PNG, WebP</span>
// // // // // //                       <span className="upload-hint">حداکثر حجم: 5 مگابایت</span>
// // // // // //                     </label>
// // // // // //                   </>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //               {renderError('image')}
// // // // // //             </div>

// // // // // //             {/* وضعیت انتشار */}
// // // // // //             <div className="form-group">
// // // // // //               <label className="form-label">وضعیت انتشار</label>
// // // // // //               <div className="publish-toggle">
// // // // // //                 <button
// // // // // //                   type="button"
// // // // // //                   className={`toggle-btn ${formData.isPublished ? 'active' : ''}`}
// // // // // //                   onClick={() => setFormData(prev => ({ ...prev, isPublished: true }))}
// // // // // //                 >
// // // // // //                   <FaEye /> منتشر شده
// // // // // //                 </button>
// // // // // //                 <button
// // // // // //                   type="button"
// // // // // //                   className={`toggle-btn ${!formData.isPublished ? 'active' : ''}`}
// // // // // //                   onClick={() => setFormData(prev => ({ ...prev, isPublished: false }))}
// // // // // //                 >
// // // // // //                   <FaEyeSlash /> پیش‌نویس
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             {/* دکمه‌ها */}
// // // // // //             <div className="form-actions">
// // // // // //               <button
// // // // // //                 type="button"
// // // // // //                 className="cancel-btn"
// // // // // //                 onClick={() => navigate('/blog')}
// // // // // //               >
// // // // // //                 انصراف
// // // // // //               </button>
// // // // // //               <button
// // // // // //                 type="submit"
// // // // // //                 className="submit-btn"
// // // // // //                 disabled={loading}
// // // // // //               >
// // // // // //                 {loading ? (
// // // // // //                   <>
// // // // // //                     <FaSpinner className="spinner" />
// // // // // //                     <span>در حال ثبت مقاله...</span>
// // // // // //                   </>
// // // // // //                 ) : (
// // // // // //                   <>
// // // // // //                     <FaSave />
// // // // // //                     <span>انتشار مقاله</span>
// // // // // //                   </>
// // // // // //                 )}
// // // // // //               </button>
// // // // // //             </div>

// // // // // //             {/* پیشرفت آپلود */}
// // // // // //             {loading && (
// // // // // //               <div className="upload-progress">
// // // // // //                 <div className="progress-bar">
// // // // // //                   <div 
// // // // // //                     className="progress-fill" 
// // // // // //                     style={{ width: `${uploadProgress}%` }}
// // // // // //                   />
// // // // // //                 </div>
// // // // // //                 <span className="progress-text">{uploadProgress}%</span>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </form>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default BlogCreate;

// // // // // // components/page/blog/BlogCreate.js
// // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import ReactQuill from 'react-quill-new';
// // // // // import 'react-quill-new/dist/quill.snow.css';
// // // // // import { 
// // // // //   FaSpinner, FaTag, FaTimes, FaUpload, FaEye, FaEyeSlash,
// // // // //   FaCheckCircle, FaExclamationCircle, FaSave, FaImage,
// // // // //   FaBold, FaItalic, FaUnderline, FaStrikethrough,
// // // // //   FaListUl, FaListOl, FaAlignLeft, FaAlignCenter, FaAlignRight,
// // // // //   FaQuoteRight, FaLink, FaUndo, FaRedo, FaPlus, FaTrash
// // // // // } from 'react-icons/fa';
// // // // // import './BlogCreate.css';

// // // // // const BlogCreate = () => {
// // // // //   const navigate = useNavigate();
// // // // //   const quillRef = useRef(null);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [categories, setCategories] = useState([]);
// // // // //   const [tags, setTags] = useState([]);
// // // // //   const [selectedTags, setSelectedTags] = useState([]);
// // // // //   const [loadingTags, setLoadingTags] = useState(false);
// // // // //   const [formData, setFormData] = useState({
// // // // //     title: '',
// // // // //     summary: '',
// // // // //     content: '',
// // // // //     categoryId: '',
// // // // //     tags: '',
// // // // //     isPublished: true,
// // // // //     image: null
// // // // //   });
// // // // //   const [imagePreview, setImagePreview] = useState(null);
// // // // //   const [errors, setErrors] = useState({});
// // // // //   const [success, setSuccess] = useState(false);
// // // // //   const [uploadProgress, setUploadProgress] = useState(0);
// // // // //   const [showPreview, setShowPreview] = useState(false);

// // // // //   // دریافت دسته‌بندی‌ها
// // // // //   useEffect(() => {
// // // // //     fetchCategories();
// // // // //   }, []);

// // // // //   const fetchCategories = async () => {
// // // // //     try {
// // // // //       const response = await fetch('https://localhost:7178/api/Post/GetCategoryPostsDTOs', {
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json'
// // // // //         }
// // // // //       });

// // // // //       if (response.ok) {
// // // // //         const result = await response.json();
// // // // //         if (result.status === 200 && result.data) {
// // // // //           setCategories(result.data);
// // // // //         }
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('❌ خطا در دریافت دسته‌بندی‌ها:', error);
// // // // //     }
// // // // //   };

// // // // //   // دریافت تگ‌ها بر اساس دسته‌بندی
// // // // //   const fetchTags = async (categoryId) => {
// // // // //     if (!categoryId) {
// // // // //       setTags([]);
// // // // //       setSelectedTags([]);
// // // // //       return;
// // // // //     }

// // // // //     setLoadingTags(true);
// // // // //     try {
// // // // //       const token = localStorage.getItem('auth_token');

// // // // //       const response = await fetch(`https://localhost:7178/api/Post/GetTagsDtosDTOs?catId=${categoryId}`, {
// // // // //         headers: {
// // // // //            'Authorization': `Bearer ${token}`,
// // // // //           'Content-Type': 'application/json'
// // // // //         }
// // // // //       });

// // // // //       if (response.ok) {
// // // // //         const result = await response.json();
// // // // //         if (result.status === 200 && result.data) {
// // // // //           setTags(result.data);
// // // // //           setSelectedTags([]); // ریست تگ‌های انتخاب شده
// // // // //         } else {
// // // // //           setTags([]);
// // // // //         }
// // // // //       } else {
// // // // //         setTags([]);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('❌ خطا در دریافت تگ‌ها:', error);
// // // // //       setTags([]);
// // // // //     } finally {
// // // // //       setLoadingTags(false);
// // // // //     }
// // // // //   };

// // // // //   // ===== تنظیمات پیشرفته Quill با قابلیت آپلود تصویر =====
// // // // //   const imageHandler = () => {
// // // // //     const input = document.createElement('input');
// // // // //     input.setAttribute('type', 'file');
// // // // //     input.setAttribute('accept', 'image/*');
// // // // //     input.click();

// // // // //     input.onchange = async () => {
// // // // //       const file = input.files[0];
// // // // //       if (file) {
// // // // //         if (file.size > 5 * 1024 * 1024) {
// // // // //           alert('حجم تصویر نباید بیشتر از 5 مگابایت باشد');
// // // // //           return;
// // // // //         }

// // // // //         const quill = quillRef.current.getEditor();
// // // // //         const range = quill.getSelection();
// // // // //         quill.insertEmbed(range.index, 'image', '/loading.gif');

// // // // //         try {
// // // // //           const formData = new FormData();
// // // // //           formData.append('image', file);

// // // // //           const token = localStorage.getItem('auth_token');
// // // // //           const response = await fetch('https://localhost:7178/api/Post/UploadImage', {
// // // // //             method: 'POST',
// // // // //             headers: {
// // // // //               'Authorization': `Bearer ${token}`
// // // // //             },
// // // // //             body: formData
// // // // //           });

// // // // //           if (response.ok) {
// // // // //             const result = await response.json();
// // // // //             if (result.status === 200 && result.data) {
// // // // //               quill.deleteText(range.index, 1);
// // // // //               quill.insertEmbed(range.index, 'image', result.data.url);
// // // // //               quill.setSelection(range.index + 1);
// // // // //             } else {
// // // // //               throw new Error(result.message || 'خطا در آپلود تصویر');
// // // // //             }
// // // // //           } else {
// // // // //             throw new Error('خطا در آپلود تصویر');
// // // // //           }
// // // // //         } catch (error) {
// // // // //           console.error('❌ خطا:', error);
// // // // //           alert('خطا در آپلود تصویر. لطفاً دوباره تلاش کنید.');
// // // // //           quill.deleteText(range.index, 1);
// // // // //         }
// // // // //       }
// // // // //     };
// // // // //   };

// // // // //   // ===== ماژول‌های Quill =====
// // // // //   const modules = {
// // // // //     toolbar: {
// // // // //       container: [
// // // // //         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
// // // // //         [{ 'font': [] }],
// // // // //         [{ 'size': ['small', false, 'large', 'huge'] }],
// // // // //         ['bold', 'italic', 'underline', 'strike'],
// // // // //         [{ 'color': [] }, { 'background': [] }],
// // // // //         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
// // // // //         [{ 'indent': '-1' }, { 'indent': '+1' }],
// // // // //         [{ 'align': [] }],
// // // // //         ['blockquote', 'code-block'],
// // // // //         ['link', 'image', 'video', 'formula'],
// // // // //         ['clean']
// // // // //       ],
// // // // //       handlers: {
// // // // //         image: imageHandler
// // // // //       }
// // // // //     },
// // // // //     clipboard: {
// // // // //       matchVisual: false
// // // // //     }
// // // // //   };

// // // // //   const formats = [
// // // // //     'header', 'font', 'size',
// // // // //     'bold', 'italic', 'underline', 'strike',
// // // // //     'color', 'background',
// // // // //     'list', 'bullet', 'check',
// // // // //     'indent',
// // // // //     'align',
// // // // //     'blockquote', 'code-block',
// // // // //     'link', 'image', 'video', 'formula',
// // // // //     'width', 'height'
// // // // //   ];

// // // // //   // مدیریت تغییرات فیلدها
// // // // //   const handleChange = (e) => {
// // // // //     const { name, value, type, checked } = e.target;
// // // // //     setFormData(prev => ({
// // // // //       ...prev,
// // // // //       [name]: type === 'checkbox' ? checked : value
// // // // //     }));
// // // // //     if (errors[name]) {
// // // // //       setErrors(prev => ({ ...prev, [name]: '' }));
// // // // //     }

// // // // //     // اگر دسته‌بندی تغییر کرد، تگ‌ها را دریافت کن
// // // // //     if (name === 'categoryId') {
// // // // //       fetchTags(value);
// // // // //     }
// // // // //   };

// // // // //   // مدیریت تغییرات محتوای ویرایشگر
// // // // //   const handleContentChange = (value) => {
// // // // //     setFormData(prev => ({ ...prev, content: value }));
// // // // //     if (errors.content) {
// // // // //       setErrors(prev => ({ ...prev, content: '' }));
// // // // //     }
// // // // //   };

// // // // //   // مدیریت انتخاب تگ
// // // // //   const handleTagSelect = (tag) => {
// // // // //     if (selectedTags.some(t => t.id === tag.id)) {
// // // // //       // اگر تگ قبلاً انتخاب شده، آن را حذف کن
// // // // //       setSelectedTags(prev => prev.filter(t => t.id !== tag.id));
// // // // //     } else {
// // // // //       // تگ جدید اضافه کن
// // // // //       setSelectedTags(prev => [...prev, tag]);
// // // // //     }
// // // // //   };

// // // // //   // حذف تگ
// // // // //   const handleRemoveTag = (tagId) => {
// // // // //     setSelectedTags(prev => prev.filter(t => t.id !== tagId));
// // // // //   };

// // // // //   // مدیریت آپلود تصویر شاخص
// // // // //   const handleImageChange = (e) => {
// // // // //     const file = e.target.files[0];
// // // // //     if (file) {
// // // // //       if (!file.type.startsWith('image/')) {
// // // // //         setErrors(prev => ({ ...prev, image: 'لطفاً یک تصویر معتبر انتخاب کنید' }));
// // // // //         return;
// // // // //       }
// // // // //       if (file.size > 5 * 1024 * 1024) {
// // // // //         setErrors(prev => ({ ...prev, image: 'حجم تصویر نباید بیشتر از 5 مگابایت باشد' }));
// // // // //         return;
// // // // //       }

// // // // //       setFormData(prev => ({ ...prev, image: file }));
// // // // //       const reader = new FileReader();
// // // // //       reader.onloadend = () => {
// // // // //         setImagePreview(reader.result);
// // // // //       };
// // // // //       reader.readAsDataURL(file);
      
// // // // //       if (errors.image) {
// // // // //         setErrors(prev => ({ ...prev, image: '' }));
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   // حذف تصویر شاخص
// // // // //   const handleRemoveImage = () => {
// // // // //     setFormData(prev => ({ ...prev, image: null }));
// // // // //     setImagePreview(null);
// // // // //     const fileInput = document.getElementById('imageInput');
// // // // //     if (fileInput) {
// // // // //       fileInput.value = '';
// // // // //     }
// // // // //   };

// // // // //   // اعتبارسنجی فرم
// // // // //   const validateForm = () => {
// // // // //     const newErrors = {};
    
// // // // //     if (!formData.title.trim()) {
// // // // //       newErrors.title = 'عنوان مقاله الزامی است';
// // // // //     } else if (formData.title.length < 5) {
// // // // //       newErrors.title = 'عنوان باید حداقل 5 کاراکتر باشد';
// // // // //     }

// // // // //     if (!formData.summary.trim()) {
// // // // //       newErrors.summary = 'خلاصه مقاله الزامی است';
// // // // //     } else if (formData.summary.length < 10) {
// // // // //       newErrors.summary = 'خلاصه باید حداقل 10 کاراکتر باشد';
// // // // //     }

// // // // //     const plainText = formData.content.replace(/<[^>]*>/g, '').trim();
// // // // //     if (!plainText) {
// // // // //       newErrors.content = 'متن مقاله الزامی است';
// // // // //     } else if (plainText.length < 50) {
// // // // //       newErrors.content = 'متن مقاله باید حداقل 50 کاراکتر باشد';
// // // // //     }

// // // // //     if (!formData.categoryId) {
// // // // //       newErrors.categoryId = 'لطفاً یک دسته‌بندی انتخاب کنید';
// // // // //     }

// // // // //     if (selectedTags.length === 0) {
// // // // //       newErrors.tags = 'لطفاً حداقل یک برچسب انتخاب کنید';
// // // // //     }

// // // // //     if (!formData.image) {
// // // // //       newErrors.image = 'تصویر شاخص الزامی است';
// // // // //     }

// // // // //     setErrors(newErrors);
// // // // //     return Object.keys(newErrors).length === 0;
// // // // //   };

// // // // //   // ارسال فرم
// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
    
// // // // //     if (!validateForm()) {
// // // // //       const firstError = document.querySelector('.input-error');
// // // // //       if (firstError) {
// // // // //         firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
// // // // //       }
// // // // //       return;
// // // // //     }

// // // // //     setLoading(true);
// // // // //     setUploadProgress(0);

// // // // //     try {
// // // // //       const token = localStorage.getItem('auth_token');
      
// // // // //       const formDataToSend = new FormData();
// // // // //       formDataToSend.append('Title', formData.title);
// // // // //       formDataToSend.append('Summary', formData.summary);
// // // // //       formDataToSend.append('Content', formData.content);
// // // // //       formDataToSend.append('CategoryId', formData.categoryId);
// // // // //       // ارسال تگ‌ها به صورت آرایه JSON
// // // // //       const tagIds = selectedTags.map(tag => tag.id);
// // // // //       formDataToSend.append('TagIds', JSON.stringify(tagIds));
// // // // //       formDataToSend.append('IsPublished', formData.isPublished);
      
// // // // //       if (formData.image) {
// // // // //         formDataToSend.append('Image', formData.image);
// // // // //       }

// // // // //       const uploadInterval = setInterval(() => {
// // // // //         setUploadProgress(prev => {
// // // // //           if (prev >= 90) {
// // // // //             clearInterval(uploadInterval);
// // // // //             return 90;
// // // // //           }
// // // // //           return prev + 10;
// // // // //         });
// // // // //       }, 100);

// // // // //       const response = await fetch('https://localhost:7178/api/Post/CreatePost', {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Authorization': `Bearer ${token}`
// // // // //         },
// // // // //         body: formDataToSend
// // // // //       });

// // // // //       clearInterval(uploadInterval);
// // // // //       setUploadProgress(100);

// // // // //       if (!response.ok) {
// // // // //         let errorMessage = 'خطا در ثبت مقاله';
// // // // //         try {
// // // // //           const errorData = await response.json();
// // // // //           errorMessage = errorData.message || errorMessage;
// // // // //         } catch (e) {}
// // // // //         throw new Error(errorMessage);
// // // // //       }

// // // // //       const result = await response.json();
      
// // // // //       if (result.status === 200 || result.isSuccess) {
// // // // //         setSuccess(true);
// // // // //         setTimeout(() => {
// // // // //           navigate('/blog');
// // // // //         }, 2000);
// // // // //       } else {
// // // // //         throw new Error(result.message || 'خطا در ثبت مقاله');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('❌ خطا:', error);
// // // // //       setErrors({ submit: error.message || 'مشکل در ارتباط با سرور' });
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const renderError = (field) => {
// // // // //     if (errors[field]) {
// // // // //       return <span className="input-error">{errors[field]}</span>;
// // // // //     }
// // // // //     return null;
// // // // //   };

// // // // //   return (
// // // // //     <div className="blog-create-wrapper">
// // // // //       {/* هدر */}
// // // // //       <div className="blog-create-header">
// // // // //         <div className="header-content">
// // // // //           <div className="header-text">
// // // // //             <h1 className="blog-create-title">✍️ ثبت مقاله جدید</h1>
// // // // //             <p className="blog-create-subtitle">مقالات خود را با ویرایشگر حرفه‌ای بنویسید و منتشر کنید</p>
// // // // //           </div>
// // // // //           <button 
// // // // //             className="preview-toggle-btn"
// // // // //             onClick={() => setShowPreview(!showPreview)}
// // // // //           >
// // // // //             {showPreview ? '✏️ ویرایش' : '👁️ پیش‌نمایش'}
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* فرم */}
// // // // //       <div className="blog-create-form-container">
// // // // //         {success ? (
// // // // //           <div className="success-message">
// // // // //             <FaCheckCircle className="success-icon" />
// // // // //             <h3>🎉 مقاله با موفقیت ثبت شد!</h3>
// // // // //             <p>در حال انتقال به صفحه وبلاگ...</p>
// // // // //           </div>
// // // // //         ) : (
// // // // //           <form onSubmit={handleSubmit} className="blog-create-form">
// // // // //             {/* خطای سرور */}
// // // // //             {errors.submit && (
// // // // //               <div className="submit-error">
// // // // //                 <FaExclamationCircle />
// // // // //                 <span>{errors.submit}</span>
// // // // //               </div>
// // // // //             )}

// // // // //             {/* عنوان */}
// // // // //             <div className="form-group">
// // // // //               <label htmlFor="title" className="form-label">
// // // // //                 عنوان مقاله <span className="required">*</span>
// // // // //               </label>
// // // // //               <input
// // // // //                 type="text"
// // // // //                 id="title"
// // // // //                 name="title"
// // // // //                 value={formData.title}
// // // // //                 onChange={handleChange}
// // // // //                 placeholder="عنوان جذاب برای مقاله خود بنویسید..."
// // // // //                 className={`form-input ${errors.title ? 'error' : ''}`}
// // // // //               />
// // // // //               {renderError('title')}
// // // // //             </div>

// // // // //             {/* خلاصه */}
// // // // //             <div className="form-group">
// // // // //               <label htmlFor="summary" className="form-label">
// // // // //                 خلاصه مقاله <span className="required">*</span>
// // // // //               </label>
// // // // //               <textarea
// // // // //                 id="summary"
// // // // //                 name="summary"
// // // // //                 value={formData.summary}
// // // // //                 onChange={handleChange}
// // // // //                 placeholder="خلاصه‌ای از مقاله را وارد کنید..."
// // // // //                 rows="3"
// // // // //                 className={`form-textarea ${errors.summary ? 'error' : ''}`}
// // // // //               />
// // // // //               {renderError('summary')}
// // // // //             </div>

// // // // //             {/* ویرایشگر متن پیشرفته */}
// // // // //             <div className="form-group">
// // // // //               <label className="form-label">
// // // // //                 متن مقاله <span className="required">*</span>
// // // // //               </label>
// // // // //               <div className={`editor-wrapper ${showPreview ? 'preview-mode' : ''}`}>
// // // // //                 {showPreview ? (
// // // // //                   <div 
// // // // //                     className="preview-content"
// // // // //                     dangerouslySetInnerHTML={{ __html: formData.content }}
// // // // //                   />
// // // // //                 ) : (
// // // // //                   <ReactQuill
// // // // //                     ref={quillRef}
// // // // //                     theme="snow"
// // // // //                     value={formData.content}
// // // // //                     onChange={handleContentChange}
// // // // //                     modules={modules}
// // // // //                     formats={formats}
// // // // //                     placeholder="متن مقاله را بنویسید... برای درج تصویر روی آیکون 🖼️ کلیک کنید"
// // // // //                     className={`blog-editor ${errors.content ? 'error' : ''}`}
// // // // //                   />
// // // // //                 )}
// // // // //               </div>
// // // // //               {renderError('content')}
// // // // //               <div className="editor-tips">
// // // // //                 <span>💡 راهنمای ویرایشگر:</span>
// // // // //                 <div className="tips-grid">
// // // // //                   <span className="tip-item">• <strong>بولد</strong> و <em>ایتالیک</em></span>
// // // // //                   <span className="tip-item">• <span style={{color: '#7d0000'}}>رنگ متن</span></span>
// // // // //                   <span className="tip-item">• لیست‌های مرتب و نامرتب</span>
// // // // //                   <span className="tip-item">• سط‌چین راست، چپ، وسط</span>
// // // // //                   <span className="tip-item">• <span className="highlight">📸 درج تصویر در متن</span></span>
// // // // //                   <span className="tip-item">• درج لینک و ویدئو</span>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* دسته‌بندی */}
// // // // //             <div className="form-group">
// // // // //               <label htmlFor="categoryId" className="form-label">
// // // // //                 دسته‌بندی <span className="required">*</span>
// // // // //               </label>
// // // // //               <div className="select-wrapper">
// // // // //                 <FaTag className="select-icon" />
// // // // //                 <select
// // // // //                   id="categoryId"
// // // // //                   name="categoryId"
// // // // //                   value={formData.categoryId}
// // // // //                   onChange={handleChange}
// // // // //                   className={`form-select ${errors.categoryId ? 'error' : ''}`}
// // // // //                 >
// // // // //                   <option value="">انتخاب دسته‌بندی...</option>
// // // // //                   {categories.map(cat => (
// // // // //                     <option key={cat.id} value={cat.id}>{cat.name}</option>
// // // // //                   ))}
// // // // //                 </select>
// // // // //               </div>
// // // // //               {renderError('categoryId')}
// // // // //             </div>

// // // // //             {/* برچسب‌ها (تگ‌ها) - مولتی سلکت */}
// // // // //             <div className="form-group">
// // // // //               <label className="form-label">
// // // // //                 برچسب‌ها <span className="required">*</span>
// // // // //               </label>
              
// // // // //               {loadingTags ? (
// // // // //                 <div className="tags-loading">
// // // // //                   <FaSpinner className="spinner-small" />
// // // // //                   <span>در حال بارگذاری برچسب‌ها...</span>
// // // // //                 </div>
// // // // //               ) : (
// // // // //                 <>
// // // // //                   {tags.length > 0 ? (
// // // // //                     <div className="tags-multiselect">
// // // // //                       {/* تگ‌های انتخاب شده */}
// // // // //                       {selectedTags.length > 0 && (
// // // // //                         <div className="selected-tags">
// // // // //                           {selectedTags.map(tag => (
// // // // //                             <span key={tag.id} className="selected-tag">
// // // // //                               <span className="tag-name">{tag.name}</span>
// // // // //                               <button 
// // // // //                                 type="button" 
// // // // //                                 className="remove-tag-btn"
// // // // //                                 onClick={() => handleRemoveTag(tag.id)}
// // // // //                               >
// // // // //                                 <FaTimes />
// // // // //                               </button>
// // // // //                             </span>
// // // // //                           ))}
// // // // //                         </div>
// // // // //                       )}

// // // // //                       {/* لیست تگ‌های موجود */}
// // // // //                       <div className="tags-list">
// // // // //                         {tags.map(tag => {
// // // // //                           const isSelected = selectedTags.some(t => t.id === tag.id);
// // // // //                           return (
// // // // //                             <button
// // // // //                               key={tag.id}
// // // // //                               type="button"
// // // // //                               className={`tag-item ${isSelected ? 'selected' : ''}`}
// // // // //                               onClick={() => handleTagSelect(tag)}
// // // // //                             >
// // // // //                               <span className="tag-check">{isSelected ? '✓' : '+'}</span>
// // // // //                               <span className="tag-name">{tag.name}</span>
// // // // //                             </button>
// // // // //                           );
// // // // //                         })}
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   ) : (
// // // // //                     <div className="no-tags-message">
// // // // //                       <FaExclamationCircle />
// // // // //                       <span>برای این دسته‌بندی برچسبی تعریف نشده است</span>
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </>
// // // // //               )}
// // // // //               {renderError('tags')}
// // // // //             </div>

// // // // //             {/* آپلود تصویر شاخص */}
// // // // //             <div className="form-group">
// // // // //               <label className="form-label">
// // // // //                 تصویر شاخص <span className="required">*</span>
// // // // //               </label>
              
// // // // //               <div className={`image-upload-area ${errors.image ? 'error' : ''}`}>
// // // // //                 {imagePreview ? (
// // // // //                   <div className="image-preview-container">
// // // // //                     <img src={imagePreview} alt="پیش‌نمایش" className="image-preview" />
// // // // //                     <button 
// // // // //                       type="button" 
// // // // //                       className="remove-image-btn"
// // // // //                       onClick={handleRemoveImage}
// // // // //                     >
// // // // //                       <FaTimes />
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 ) : (
// // // // //                   <>
// // // // //                     <input
// // // // //                       type="file"
// // // // //                       id="imageInput"
// // // // //                       accept="image/*"
// // // // //                       onChange={handleImageChange}
// // // // //                       className="image-input"
// // // // //                     />
// // // // //                     <label htmlFor="imageInput" className="image-upload-label">
// // // // //                       <FaUpload className="upload-icon" />
// // // // //                       <span>برای آپلود تصویر کلیک کنید</span>
// // // // //                       <span className="upload-hint">فرمت‌های مجاز: JPG, PNG, WebP</span>
// // // // //                       <span className="upload-hint">حداکثر حجم: 5 مگابایت</span>
// // // // //                     </label>
// // // // //                   </>
// // // // //                 )}
// // // // //               </div>
// // // // //               {renderError('image')}
// // // // //             </div>

// // // // //             {/* وضعیت انتشار */}
// // // // //             <div className="form-group">
// // // // //               <label className="form-label">وضعیت انتشار</label>
// // // // //               <div className="publish-toggle">
// // // // //                 <button
// // // // //                   type="button"
// // // // //                   className={`toggle-btn ${formData.isPublished ? 'active' : ''}`}
// // // // //                   onClick={() => setFormData(prev => ({ ...prev, isPublished: true }))}
// // // // //                 >
// // // // //                   <FaEye /> منتشر شده
// // // // //                 </button>
// // // // //                 <button
// // // // //                   type="button"
// // // // //                   className={`toggle-btn ${!formData.isPublished ? 'active' : ''}`}
// // // // //                   onClick={() => setFormData(prev => ({ ...prev, isPublished: false }))}
// // // // //                 >
// // // // //                   <FaEyeSlash /> پیش‌نویس
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* دکمه‌ها */}
// // // // //             <div className="form-actions">
// // // // //               <button
// // // // //                 type="button"
// // // // //                 className="cancel-btn"
// // // // //                 onClick={() => navigate('/blog')}
// // // // //               >
// // // // //                 انصراف
// // // // //               </button>
// // // // //               <button
// // // // //                 type="submit"
// // // // //                 className="submit-btn"
// // // // //                 disabled={loading}
// // // // //               >
// // // // //                 {loading ? (
// // // // //                   <>
// // // // //                     <FaSpinner className="spinner" />
// // // // //                     <span>در حال ثبت مقاله...</span>
// // // // //                   </>
// // // // //                 ) : (
// // // // //                   <>
// // // // //                     <FaSave />
// // // // //                     <span>انتشار مقاله</span>
// // // // //                   </>
// // // // //                 )}
// // // // //               </button>
// // // // //             </div>

// // // // //             {/* پیشرفت آپلود */}
// // // // //             {loading && (
// // // // //               <div className="upload-progress">
// // // // //                 <div className="progress-bar">
// // // // //                   <div 
// // // // //                     className="progress-fill" 
// // // // //                     style={{ width: `${uploadProgress}%` }}
// // // // //                   />
// // // // //                 </div>
// // // // //                 <span className="progress-text">{uploadProgress}%</span>
// // // // //               </div>
// // // // //             )}
// // // // //           </form>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default BlogCreate;


// // // // // components/page/blog/BlogCreate.js
// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import ReactQuill from 'react-quill-new';
// // // // import 'react-quill-new/dist/quill.snow.css';
// // // // import { 
// // // //   FaSpinner, FaTag, FaTimes, FaUpload, FaEye, FaEyeSlash,
// // // //   FaCheckCircle, FaExclamationCircle, FaSave, FaImage,
// // // //   FaBold, FaItalic, FaUnderline, FaStrikethrough,
// // // //   FaListUl, FaListOl, FaAlignLeft, FaAlignCenter, FaAlignRight,
// // // //   FaQuoteRight, FaLink, FaUndo, FaRedo, FaPlus, FaTrash
// // // // } from 'react-icons/fa';
// // // // import './BlogCreate.css';

// // // // const BlogCreate = () => {
// // // //   const navigate = useNavigate();
// // // //   const quillRef = useRef(null);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [categories, setCategories] = useState([]);
// // // //   const [tags, setTags] = useState([]);
// // // //   const [selectedTags, setSelectedTags] = useState([]);
// // // //   const [loadingTags, setLoadingTags] = useState(false);
// // // //   const [formData, setFormData] = useState({
// // // //     title: '',
// // // //     summary: '',
// // // //     content: '',
// // // //     categoryId: '',
// // // //     isPublished: true,
// // // //     image: null
// // // //   });
// // // //   const [imagePreview, setImagePreview] = useState(null);
// // // //   const [errors, setErrors] = useState({});
// // // //   const [success, setSuccess] = useState(false);
// // // //   const [uploadProgress, setUploadProgress] = useState(0);
// // // //   const [showPreview, setShowPreview] = useState(false);
  
// // // //   // State برای مدیریت آپلود تصاویر
// // // //   const [uploadedImages, setUploadedImages] = useState([]); // { cacheId, url, file, progress, status }
// // // //   const [isUploading, setIsUploading] = useState(false);

// // // //   // دریافت دسته‌بندی‌ها
// // // //   useEffect(() => {
// // // //     fetchCategories();
// // // //   }, []);

// // // //   const fetchCategories = async () => {
// // // //     try {
// // // //       const response = await fetch('https://localhost:7178/api/Post/GetCategoryPostsDTOs', {
// // // //         headers: {
// // // //           'Content-Type': 'application/json'
// // // //         }
// // // //       });

// // // //       if (response.ok) {
// // // //         const result = await response.json();
// // // //         if (result.status === 200 && result.data) {
// // // //           setCategories(result.data);
// // // //         }
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('❌ خطا در دریافت دسته‌بندی‌ها:', error);
// // // //     }
// // // //   };

// // // //   // دریافت تگ‌ها بر اساس دسته‌بندی
// // // //   const fetchTags = async (categoryId) => {
// // // //     if (!categoryId) {
// // // //       setTags([]);
// // // //       setSelectedTags([]);
// // // //       return;
// // // //     }

// // // //     setLoadingTags(true);
// // // //     try {
// // // //       const token = localStorage.getItem('auth_token');
// // // //       const response = await fetch(`https://localhost:7178/api/Post/GetTagsDtosDTOs?catId=${categoryId}`, {
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json'
// // // //         }
// // // //       });

// // // //       if (response.ok) {
// // // //         const result = await response.json();
// // // //         if (result.status === 200 && result.data) {
// // // //           setTags(result.data);
// // // //           setSelectedTags([]);
// // // //         } else {
// // // //           setTags([]);
// // // //         }
// // // //       } else {
// // // //         setTags([]);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('❌ خطا در دریافت تگ‌ها:', error);
// // // //       setTags([]);
// // // //     } finally {
// // // //       setLoadingTags(false);
// // // //     }
// // // //   };

// // // //   // ===== آپلود تصویر با پیشرفت =====
// // // //   const uploadImage = async (file) => {
// // // //     return new Promise((resolve, reject) => {
// // // //       const formData = new FormData();
// // // //       formData.append('image', file);

// // // //       const xhr = new XMLHttpRequest();
// // // //       const token = localStorage.getItem('auth_token');

// // // //       xhr.open('POST', 'https://localhost:7178/api/RealEstatePage/UploadTempImage', true);
// // // //       xhr.setRequestHeader('Authorization', `Bearer ${token}`);

// // // //       // پیشرفت آپلود
// // // //       xhr.upload.onprogress = (event) => {
// // // //         if (event.lengthComputable) {
// // // //           const progress = Math.round((event.loaded / event.total) * 100);
// // // //           // به‌روزرسانی وضعیت آپلود
// // // //           setUploadedImages(prev => 
// // // //             prev.map(img => 
// // // //               img.file === file ? { ...img, progress } : img
// // // //             )
// // // //           );
// // // //         }
// // // //       };

// // // //       xhr.onload = () => {
// // // //         if (xhr.status === 200) {
// // // //           try {
// // // //             const result = JSON.parse(xhr.responseText);
// // // //             if (result.success && result.cacheId) {
// // // //               // به‌روزرسانی وضعیت به success
// // // //               setUploadedImages(prev => 
// // // //                 prev.map(img => 
// // // //                   img.file === file ? { 
// // // //                     ...img, 
// // // //                     status: 'success', 
// // // //                     cacheId: result.cacheId,
// // // //                     progress: 100 
// // // //                   } : img
// // // //                 )
// // // //               );
// // // //               resolve(result.cacheId);
// // // //             } else {
// // // //               reject(new Error('خطا در آپلود تصویر'));
// // // //             }
// // // //           } catch (error) {
// // // //             reject(error);
// // // //           }
// // // //         } else {
// // // //           reject(new Error(`خطا در آپلود: ${xhr.status}`));
// // // //         }
// // // //       };

// // // //       xhr.onerror = () => {
// // // //         // به‌روزرسانی وضعیت به error
// // // //         setUploadedImages(prev => 
// // // //           prev.map(img => 
// // // //             img.file === file ? { ...img, status: 'error' } : img
// // // //           )
// // // //         );
// // // //         reject(new Error('خطا در ارتباط با سرور'));
// // // //       };

// // // //       xhr.send(formData);
// // // //     });
// // // //   };

// // // //   // ===== حذف تصویر از کش =====
// // // //   const clearTempImage = async (cacheId) => {
// // // //     try {
// // // //       const token = localStorage.getItem('auth_token');
// // // //       const response = await fetch('https://localhost:7178/api/RealEstatePage/ClearTempImage', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json'
// // // //         },
// // // //         body: JSON.stringify({ cacheId })
// // // //       });

// // // //       if (response.ok) {
// // // //         const result = await response.json();
// // // //         return result.success;
// // // //       }
// // // //       return false;
// // // //     } catch (error) {
// // // //       console.error('❌ خطا در حذف تصویر:', error);
// // // //       return false;
// // // //     }
// // // //   };

// // // //   // ===== هندلر آپلود تصویر در ویرایشگر =====
// // // //   const imageHandler = () => {
// // // //     const input = document.createElement('input');
// // // //     input.setAttribute('type', 'file');
// // // //     input.setAttribute('accept', 'image/*');
// // // //     input.click();

// // // //     input.onchange = async () => {
// // // //       const file = input.files[0];
// // // //       if (!file) return;

// // // //       if (file.size > 10 * 1024 * 1024) {
// // // //         alert('حجم تصویر نباید بیشتر از 10 مگابایت باشد');
// // // //         return;
// // // //       }

// // // //       const quill = quillRef.current.getEditor();
// // // //       const range = quill.getSelection();
      
// // // //       // نمایش لودینگ در ویرایشگر
// // // //       quill.insertEmbed(range.index, 'image', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');

// // // //       // اضافه کردن به لیست آپلودها
// // // //       const newImage = {
// // // //         file,
// // // //         progress: 0,
// // // //         status: 'uploading',
// // // //         cacheId: null,
// // // //         url: null
// // // //       };
// // // //       setUploadedImages(prev => [...prev, newImage]);
// // // //       setIsUploading(true);

// // // //       try {
// // // //         const cacheId = await uploadImage(file);
        
// // // //         // پس از آپلود موفق، تصویر را در ویرایشگر جایگزین کن
// // // //         const imageUrl = URL.createObjectURL(file);
// // // //         quill.deleteText(range.index, 1);
// // // //         quill.insertEmbed(range.index, 'image', imageUrl);
// // // //         quill.setSelection(range.index + 1);

// // // //         // به‌روزرسانی با cacheId
// // // //         setUploadedImages(prev => 
// // // //           prev.map(img => 
// // // //             img.file === file ? { ...img, cacheId, url: imageUrl, status: 'success' } : img
// // // //           )
// // // //         );
// // // //       } catch (error) {
// // // //         console.error('❌ خطا:', error);
// // // //         alert('خطا در آپلود تصویر. لطفاً دوباره تلاش کنید.');
// // // //         quill.deleteText(range.index, 1);
        
// // // //         // حذف از لیست آپلودها
// // // //         setUploadedImages(prev => prev.filter(img => img.file !== file));
// // // //       } finally {
// // // //         setIsUploading(false);
// // // //       }
// // // //     };
// // // //   };

// // // //   // ===== حذف تصویر آپلود شده =====
// // // //   const removeUploadedImage = async (imageToRemove) => {
// // // //     if (imageToRemove.cacheId) {
// // // //       await clearTempImage(imageToRemove.cacheId);
// // // //     }
// // // //     setUploadedImages(prev => prev.filter(img => img.file !== imageToRemove.file));
// // // //   };

// // // //   // ===== ماژول‌های Quill =====
// // // //   const modules = {
// // // //     toolbar: {
// // // //       container: [
// // // //         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
// // // //         [{ 'font': [] }],
// // // //         [{ 'size': ['small', false, 'large', 'huge'] }],
// // // //         ['bold', 'italic', 'underline', 'strike'],
// // // //         [{ 'color': [] }, { 'background': [] }],
// // // //         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
// // // //         [{ 'indent': '-1' }, { 'indent': '+1' }],
// // // //         [{ 'align': [] }],
// // // //         ['blockquote', 'code-block'],
// // // //         ['link', 'image', 'video', 'formula'],
// // // //         ['clean']
// // // //       ],
// // // //       handlers: {
// // // //         image: imageHandler
// // // //       }
// // // //     },
// // // //     clipboard: {
// // // //       matchVisual: false
// // // //     }
// // // //   };

// // // //   const formats = [
// // // //     'header', 'font', 'size',
// // // //     'bold', 'italic', 'underline', 'strike',
// // // //     'color', 'background',
// // // //     'list', 'bullet', 'check',
// // // //     'indent',
// // // //     'align',
// // // //     'blockquote', 'code-block',
// // // //     'link', 'image', 'video', 'formula',
// // // //     'width', 'height'
// // // //   ];

// // // //   // مدیریت تغییرات فیلدها
// // // //   const handleChange = (e) => {
// // // //     const { name, value, type, checked } = e.target;
// // // //     setFormData(prev => ({
// // // //       ...prev,
// // // //       [name]: type === 'checkbox' ? checked : value
// // // //     }));
// // // //     if (errors[name]) {
// // // //       setErrors(prev => ({ ...prev, [name]: '' }));
// // // //     }

// // // //     if (name === 'categoryId') {
// // // //       fetchTags(value);
// // // //     }
// // // //   };

// // // //   // مدیریت تغییرات محتوای ویرایشگر
// // // //   const handleContentChange = (value) => {
// // // //     setFormData(prev => ({ ...prev, content: value }));
// // // //     if (errors.content) {
// // // //       setErrors(prev => ({ ...prev, content: '' }));
// // // //     }
// // // //   };

// // // //   // مدیریت انتخاب تگ
// // // //   const handleTagSelect = (tag) => {
// // // //     if (selectedTags.some(t => t.id === tag.id)) {
// // // //       setSelectedTags(prev => prev.filter(t => t.id !== tag.id));
// // // //     } else {
// // // //       setSelectedTags(prev => [...prev, tag]);
// // // //     }
// // // //   };

// // // //   const handleRemoveTag = (tagId) => {
// // // //     setSelectedTags(prev => prev.filter(t => t.id !== tagId));
// // // //   };

// // // //   // مدیریت آپلود تصویر شاخص
// // // //   const handleImageChange = (e) => {
// // // //     const file = e.target.files[0];
// // // //     if (file) {
// // // //       if (!file.type.startsWith('image/')) {
// // // //         setErrors(prev => ({ ...prev, image: 'لطفاً یک تصویر معتبر انتخاب کنید' }));
// // // //         return;
// // // //       }
// // // //       if (file.size > 10 * 1024 * 1024) {
// // // //         setErrors(prev => ({ ...prev, image: 'حجم تصویر نباید بیشتر از 10 مگابایت باشد' }));
// // // //         return;
// // // //       }

// // // //       setFormData(prev => ({ ...prev, image: file }));
// // // //       const reader = new FileReader();
// // // //       reader.onloadend = () => {
// // // //         setImagePreview(reader.result);
// // // //       };
// // // //       reader.readAsDataURL(file);
      
// // // //       if (errors.image) {
// // // //         setErrors(prev => ({ ...prev, image: '' }));
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleRemoveImage = () => {
// // // //     setFormData(prev => ({ ...prev, image: null }));
// // // //     setImagePreview(null);
// // // //     const fileInput = document.getElementById('imageInput');
// // // //     if (fileInput) {
// // // //       fileInput.value = '';
// // // //     }
// // // //   };

// // // //   // اعتبارسنجی فرم
// // // //   const validateForm = () => {
// // // //     const newErrors = {};
    
// // // //     if (!formData.title.trim()) {
// // // //       newErrors.title = 'عنوان مقاله الزامی است';
// // // //     } else if (formData.title.length < 5) {
// // // //       newErrors.title = 'عنوان باید حداقل 5 کاراکتر باشد';
// // // //     }

// // // //     if (!formData.summary.trim()) {
// // // //       newErrors.summary = 'خلاصه مقاله الزامی است';
// // // //     } else if (formData.summary.length < 10) {
// // // //       newErrors.summary = 'خلاصه باید حداقل 10 کاراکتر باشد';
// // // //     }

// // // //     const plainText = formData.content.replace(/<[^>]*>/g, '').trim();
// // // //     if (!plainText) {
// // // //       newErrors.content = 'متن مقاله الزامی است';
// // // //     } else if (plainText.length < 50) {
// // // //       newErrors.content = 'متن مقاله باید حداقل 50 کاراکتر باشد';
// // // //     }

// // // //     if (!formData.categoryId) {
// // // //       newErrors.categoryId = 'لطفاً یک دسته‌بندی انتخاب کنید';
// // // //     }

// // // //     if (selectedTags.length === 0) {
// // // //       newErrors.tags = 'لطفاً حداقل یک برچسب انتخاب کنید';
// // // //     }

// // // //     if (!formData.image) {
// // // //       newErrors.image = 'تصویر شاخص الزامی است';
// // // //     }

// // // //     setErrors(newErrors);
// // // //     return Object.keys(newErrors).length === 0;
// // // //   };

// // // //   // ارسال فرم
// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
    
// // // //     if (!validateForm()) {
// // // //       const firstError = document.querySelector('.input-error');
// // // //       if (firstError) {
// // // //         firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
// // // //       }
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     setUploadProgress(0);

// // // //     try {
// // // //       const token = localStorage.getItem('auth_token');
      
// // // //       // آماده‌سازی داده‌ها برای ارسال
// // // //       const tagIds = selectedTags.map(tag => tag.id);
// // // //       const imageCacheIds = uploadedImages
// // // //         .filter(img => img.status === 'success' && img.cacheId)
// // // //         .map(img => img.cacheId);

// // // //       const submitData = {
// // // //         title: formData.title,
// // // //         summary: formData.summary,
// // // //         content: formData.content,
// // // //         categoryId: parseInt(formData.categoryId),
// // // //         tagsId: tagIds,
// // // //         isPublished: formData.isPublished,
// // // //         tempImageCacheIds: imageCacheIds.join(',')
// // // //       };

// // // //       console.log('📤 ارسال داده:', submitData);

// // // //       const response = await fetch('https://localhost:7178/api/Post/CreatePost', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json'
// // // //         },
// // // //         body: JSON.stringify(submitData)
// // // //       });

// // // //       if (!response.ok) {
// // // //         let errorMessage = 'خطا در ثبت مقاله';
// // // //         try {
// // // //           const errorData = await response.json();
// // // //           errorMessage = errorData.message || errorMessage;
// // // //         } catch (e) {}
// // // //         throw new Error(errorMessage);
// // // //       }

// // // //       const result = await response.json();
      
// // // //       if (result.status === 200 || result.isSuccess) {
// // // //         setSuccess(true);
// // // //         setTimeout(() => {
// // // //           navigate('/blog');
// // // //         }, 2000);
// // // //       } else {
// // // //         throw new Error(result.message || 'خطا در ثبت مقاله');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('❌ خطا:', error);
// // // //       setErrors({ submit: error.message || 'مشکل در ارتباط با سرور' });
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const renderError = (field) => {
// // // //     if (errors[field]) {
// // // //       return <span className="input-error">{errors[field]}</span>;
// // // //     }
// // // //     return null;
// // // //   };

// // // //   return (
// // // //     <div className="blog-create-wrapper">
// // // //       {/* هدر */}
// // // //       <div className="blog-create-header">
// // // //         <div className="header-content">
// // // //           <div className="header-text">
// // // //             <h1 className="blog-create-title">✍️ ثبت مقاله جدید</h1>
// // // //             <p className="blog-create-subtitle">مقالات خود را با ویرایشگر حرفه‌ای بنویسید و منتشر کنید</p>
// // // //           </div>
// // // //           <button 
// // // //             className="preview-toggle-btn"
// // // //             onClick={() => setShowPreview(!showPreview)}
// // // //           >
// // // //             {showPreview ? '✏️ ویرایش' : '👁️ پیش‌نمایش'}
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* فرم */}
// // // //       <div className="blog-create-form-container">
// // // //         {success ? (
// // // //           <div className="success-message">
// // // //             <FaCheckCircle className="success-icon" />
// // // //             <h3>🎉 مقاله با موفقیت ثبت شد!</h3>
// // // //             <p>در حال انتقال به صفحه وبلاگ...</p>
// // // //           </div>
// // // //         ) : (
// // // //           <form onSubmit={handleSubmit} className="blog-create-form">
// // // //             {/* خطای سرور */}
// // // //             {errors.submit && (
// // // //               <div className="submit-error">
// // // //                 <FaExclamationCircle />
// // // //                 <span>{errors.submit}</span>
// // // //               </div>
// // // //             )}

// // // //             {/* عنوان */}
// // // //             <div className="form-group">
// // // //               <label htmlFor="title" className="form-label">
// // // //                 عنوان مقاله <span className="required">*</span>
// // // //               </label>
// // // //               <input
// // // //                 type="text"
// // // //                 id="title"
// // // //                 name="title"
// // // //                 value={formData.title}
// // // //                 onChange={handleChange}
// // // //                 placeholder="عنوان جذاب برای مقاله خود بنویسید..."
// // // //                 className={`form-input ${errors.title ? 'error' : ''}`}
// // // //               />
// // // //               {renderError('title')}
// // // //             </div>

// // // //             {/* خلاصه */}
// // // //             <div className="form-group">
// // // //               <label htmlFor="summary" className="form-label">
// // // //                 خلاصه مقاله <span className="required">*</span>
// // // //               </label>
// // // //               <textarea
// // // //                 id="summary"
// // // //                 name="summary"
// // // //                 value={formData.summary}
// // // //                 onChange={handleChange}
// // // //                 placeholder="خلاصه‌ای از مقاله را وارد کنید..."
// // // //                 rows="3"
// // // //                 className={`form-textarea ${errors.summary ? 'error' : ''}`}
// // // //               />
// // // //               {renderError('summary')}
// // // //             </div>

// // // //             {/* ویرایشگر متن پیشرفته */}
// // // //             <div className="form-group">
// // // //               <label className="form-label">
// // // //                 متن مقاله <span className="required">*</span>
// // // //               </label>
// // // //               <div className={`editor-wrapper ${showPreview ? 'preview-mode' : ''}`}>
// // // //                 {showPreview ? (
// // // //                   <div 
// // // //                     className="preview-content"
// // // //                     dangerouslySetInnerHTML={{ __html: formData.content }}
// // // //                   />
// // // //                 ) : (
// // // //                   <ReactQuill
// // // //                     ref={quillRef}
// // // //                     theme="snow"
// // // //                     value={formData.content}
// // // //                     onChange={handleContentChange}
// // // //                     modules={modules}
// // // //                     formats={formats}
// // // //                     placeholder="متن مقاله را بنویسید... برای درج تصویر روی آیکون 🖼️ کلیک کنید"
// // // //                     className={`blog-editor ${errors.content ? 'error' : ''}`}
// // // //                   />
// // // //                 )}
// // // //               </div>
// // // //               {renderError('content')}
              
// // // //               {/* نمایش وضعیت آپلود تصاویر */}
// // // //               {uploadedImages.length > 0 && (
// // // //                 <div className="upload-status-container">
// // // //                   <div className="upload-status-header">
// // // //                     <FaImage className="upload-status-icon" />
// // // //                     <span>تصاویر در حال آپلود ({uploadedImages.length})</span>
// // // //                   </div>
// // // //                   <div className="upload-status-list">
// // // //                     {uploadedImages.map((img, index) => (
// // // //                       <div key={index} className="upload-status-item">
// // // //                         <div className="upload-file-info">
// // // //                           <span className="upload-file-name">{img.file.name}</span>
// // // //                           <span className="upload-file-size">
// // // //                             {(img.file.size / 1024).toFixed(1)} KB
// // // //                           </span>
// // // //                         </div>
// // // //                         <div className="upload-progress-bar">
// // // //                           <div 
// // // //                             className={`upload-progress-fill ${img.status}`}
// // // //                             style={{ width: `${img.progress}%` }}
// // // //                           />
// // // //                         </div>
// // // //                         <div className="upload-status-actions">
// // // //                           {img.status === 'uploading' && (
// // // //                             <span className="upload-status-text uploading">
// // // //                               {img.progress}%
// // // //                             </span>
// // // //                           )}
// // // //                           {img.status === 'success' && (
// // // //                             <span className="upload-status-text success">
// // // //                               <FaCheckCircle /> آپلود شد
// // // //                             </span>
// // // //                           )}
// // // //                           {img.status === 'error' && (
// // // //                             <span className="upload-status-text error">
// // // //                               خطا
// // // //                             </span>
// // // //                           )}
// // // //                           {img.status === 'success' && (
// // // //                             <button
// // // //                               type="button"
// // // //                               className="remove-upload-btn"
// // // //                               onClick={() => removeUploadedImage(img)}
// // // //                             >
// // // //                               <FaTrash />
// // // //                             </button>
// // // //                           )}
// // // //                         </div>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             {/* دسته‌بندی */}
// // // //             <div className="form-group">
// // // //               <label htmlFor="categoryId" className="form-label">
// // // //                 دسته‌بندی <span className="required">*</span>
// // // //               </label>
// // // //               <div className="select-wrapper">
// // // //                 <FaTag className="select-icon" />
// // // //                 <select
// // // //                   id="categoryId"
// // // //                   name="categoryId"
// // // //                   value={formData.categoryId}
// // // //                   onChange={handleChange}
// // // //                   className={`form-select ${errors.categoryId ? 'error' : ''}`}
// // // //                 >
// // // //                   <option value="">انتخاب دسته‌بندی...</option>
// // // //                   {categories.map(cat => (
// // // //                     <option key={cat.id} value={cat.id}>{cat.name}</option>
// // // //                   ))}
// // // //                 </select>
// // // //               </div>
// // // //               {renderError('categoryId')}
// // // //             </div>

// // // //             {/* برچسب‌ها */}
// // // //             <div className="form-group">
// // // //               <label className="form-label">
// // // //                 برچسب‌ها <span className="required">*</span>
// // // //               </label>
              
// // // //               {loadingTags ? (
// // // //                 <div className="tags-loading">
// // // //                   <FaSpinner className="spinner-small" />
// // // //                   <span>در حال بارگذاری برچسب‌ها...</span>
// // // //                 </div>
// // // //               ) : (
// // // //                 <>
// // // //                   {tags.length > 0 ? (
// // // //                     <div className="tags-multiselect">
// // // //                       {selectedTags.length > 0 && (
// // // //                         <div className="selected-tags">
// // // //                           {selectedTags.map(tag => (
// // // //                             <span key={tag.id} className="selected-tag">
// // // //                               <span className="tag-name">{tag.name}</span>
// // // //                               <button 
// // // //                                 type="button" 
// // // //                                 className="remove-tag-btn"
// // // //                                 onClick={() => handleRemoveTag(tag.id)}
// // // //                               >
// // // //                                 <FaTimes />
// // // //                               </button>
// // // //                             </span>
// // // //                           ))}
// // // //                         </div>
// // // //                       )}

// // // //                       <div className="tags-list">
// // // //                         {tags.map(tag => {
// // // //                           const isSelected = selectedTags.some(t => t.id === tag.id);
// // // //                           return (
// // // //                             <button
// // // //                               key={tag.id}
// // // //                               type="button"
// // // //                               className={`tag-item ${isSelected ? 'selected' : ''}`}
// // // //                               onClick={() => handleTagSelect(tag)}
// // // //                             >
// // // //                               <span className="tag-check">{isSelected ? '✓' : '+'}</span>
// // // //                               <span className="tag-name">{tag.name}</span>
// // // //                             </button>
// // // //                           );
// // // //                         })}
// // // //                       </div>
// // // //                     </div>
// // // //                   ) : (
// // // //                     <div className="no-tags-message">
// // // //                       <FaExclamationCircle />
// // // //                       <span>برای این دسته‌بندی برچسبی تعریف نشده است</span>
// // // //                     </div>
// // // //                   )}
// // // //                 </>
// // // //               )}
// // // //               {renderError('tags')}
// // // //             </div>

// // // //             {/* آپلود تصویر شاخص */}
// // // //             <div className="form-group">
// // // //               <label className="form-label">
// // // //                 تصویر شاخص <span className="required">*</span>
// // // //               </label>
              
// // // //               <div className={`image-upload-area ${errors.image ? 'error' : ''}`}>
// // // //                 {imagePreview ? (
// // // //                   <div className="image-preview-container">
// // // //                     <img src={imagePreview} alt="پیش‌نمایش" className="image-preview" />
// // // //                     <button 
// // // //                       type="button" 
// // // //                       className="remove-image-btn"
// // // //                       onClick={handleRemoveImage}
// // // //                     >
// // // //                       <FaTimes />
// // // //                     </button>
// // // //                   </div>
// // // //                 ) : (
// // // //                   <>
// // // //                     <input
// // // //                       type="file"
// // // //                       id="imageInput"
// // // //                       accept="image/*"
// // // //                       onChange={handleImageChange}
// // // //                       className="image-input"
// // // //                     />
// // // //                     <label htmlFor="imageInput" className="image-upload-label">
// // // //                       <FaUpload className="upload-icon" />
// // // //                       <span>برای آپلود تصویر کلیک کنید</span>
// // // //                       <span className="upload-hint">فرمت‌های مجاز: JPG, PNG, WebP</span>
// // // //                       <span className="upload-hint">حداکثر حجم: 10 مگابایت</span>
// // // //                     </label>
// // // //                   </>
// // // //                 )}
// // // //               </div>
// // // //               {renderError('image')}
// // // //             </div>

// // // //             {/* وضعیت انتشار */}
// // // //             <div className="form-group">
// // // //               <label className="form-label">وضعیت انتشار</label>
// // // //               <div className="publish-toggle">
// // // //                 <button
// // // //                   type="button"
// // // //                   className={`toggle-btn ${formData.isPublished ? 'active' : ''}`}
// // // //                   onClick={() => setFormData(prev => ({ ...prev, isPublished: true }))}
// // // //                 >
// // // //                   <FaEye /> منتشر شده
// // // //                 </button>
// // // //                 <button
// // // //                   type="button"
// // // //                   className={`toggle-btn ${!formData.isPublished ? 'active' : ''}`}
// // // //                   onClick={() => setFormData(prev => ({ ...prev, isPublished: false }))}
// // // //                 >
// // // //                   <FaEyeSlash /> پیش‌نویس
// // // //                 </button>
// // // //               </div>
// // // //             </div>

// // // //             {/* دکمه‌ها */}
// // // //             <div className="form-actions">
// // // //               <button
// // // //                 type="button"
// // // //                 className="cancel-btn"
// // // //                 onClick={() => navigate('/blog')}
// // // //               >
// // // //                 انصراف
// // // //               </button>
// // // //               <button
// // // //                 type="submit"
// // // //                 className="submit-btn"
// // // //                 disabled={loading || isUploading}
// // // //               >
// // // //                 {loading ? (
// // // //                   <>
// // // //                     <FaSpinner className="spinner" />
// // // //                     <span>در حال ثبت مقاله...</span>
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     <FaSave />
// // // //                     <span>انتشار مقاله</span>
// // // //                   </>
// // // //                 )}
// // // //               </button>
// // // //             </div>

// // // //             {/* پیشرفت کلی */}
// // // //             {(loading || isUploading) && (
// // // //               <div className="upload-progress">
// // // //                 <div className="progress-bar">
// // // //                   <div 
// // // //                     className="progress-fill" 
// // // //                     style={{ width: `${uploadProgress}%` }}
// // // //                   />
// // // //                 </div>
// // // //                 <span className="progress-text">
// // // //                   {isUploading ? 'در حال آپلود تصاویر...' : `${uploadProgress}%`}
// // // //                 </span>
// // // //               </div>
// // // //             )}
// // // //           </form>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default BlogCreate;

// // // // components/page/blog/BlogCreate.js
// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import ReactQuill from 'react-quill-new';
// // // import 'react-quill-new/dist/quill.snow.css';
// // // import { 
// // //   FaSpinner, FaTag, FaTimes, FaUpload, FaEye, FaEyeSlash,
// // //   FaCheckCircle, FaExclamationCircle, FaSave, FaImage,
// // //   FaTrash
// // // } from 'react-icons/fa';
// // // import './BlogCreate.css';

// // // const BlogCreate = () => {
// // //   const navigate = useNavigate();
// // //   const quillRef = useRef(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [categories, setCategories] = useState([]);
// // //   const [tags, setTags] = useState([]);
// // //   const [selectedTags, setSelectedTags] = useState([]);
// // //   const [loadingTags, setLoadingTags] = useState(false);
// // //   const [formData, setFormData] = useState({
// // //     title: '',
// // //     summary: '',
// // //     content: '',
// // //     categoryId: '',
// // //     isPublished: true,
// // //     image: null,
// // //     imageCacheId: null
// // //   });
// // //   const [imagePreview, setImagePreview] = useState(null);
// // //   const [imageUploadProgress, setImageUploadProgress] = useState(0);
// // //   const [isImageUploading, setIsImageUploading] = useState(false);
// // //   const [errors, setErrors] = useState({});
// // //   const [success, setSuccess] = useState(false);
// // //   const [uploadProgress, setUploadProgress] = useState(0);
// // //   const [showPreview, setShowPreview] = useState(false);
  
// // //   // State برای مدیریت آپلود تصاویر در ویرایشگر
// // //   const [uploadedImages, setUploadedImages] = useState([]);
// // //   const [isUploading, setIsUploading] = useState(false);

// // //   // دریافت دسته‌بندی‌ها
// // //   useEffect(() => {
// // //     fetchCategories();
// // //   }, []);

// // //   const fetchCategories = async () => {
// // //     try {
// // //       const response = await fetch('https://localhost:7178/api/Post/GetCategoryPostsDTOs', {
// // //         headers: {
// // //           'Content-Type': 'application/json'
// // //         }
// // //       });

// // //       if (response.ok) {
// // //         const result = await response.json();
// // //         if (result.status === 200 && result.data) {
// // //           setCategories(result.data);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ خطا در دریافت دسته‌بندی‌ها:', error);
// // //     }
// // //   };

// // //   // دریافت تگ‌ها بر اساس دسته‌بندی
// // //   const fetchTags = async (categoryId) => {
// // //     if (!categoryId) {
// // //       setTags([]);
// // //       setSelectedTags([]);
// // //       return;
// // //     }

// // //     setLoadingTags(true);
// // //     try {
// // //       const token = localStorage.getItem('auth_token');
// // //       const response = await fetch(`https://localhost:7178/api/Post/GetTagsDtosDTOs?catId=${categoryId}`, {
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //           'Content-Type': 'application/json'
// // //         }
// // //       });

// // //       if (response.ok) {
// // //         const result = await response.json();
// // //         if (result.status === 200 && result.data) {
// // //           setTags(result.data);
// // //           setSelectedTags([]);
// // //         } else {
// // //           setTags([]);
// // //         }
// // //       } else {
// // //         setTags([]);
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ خطا در دریافت تگ‌ها:', error);
// // //       setTags([]);
// // //     } finally {
// // //       setLoadingTags(false);
// // //     }
// // //   };

// // //   // ===== آپلود تصویر با پیشرفت =====
// // //   const uploadImage = async (file, onProgress, isPostContent = false) => {
// // //     return new Promise((resolve, reject) => {
// // //       const formData = new FormData();
// // //       formData.append('image', file);

// // //       const xhr = new XMLHttpRequest();
// // //       const token = localStorage.getItem('auth_token');

// // //       // انتخاب API مناسب
// // //       const url = isPostContent 
// // //         ? 'https://localhost:7178/api/RealEstate/UploadTempImagePost'
// // //         : 'https://localhost:7178/api/RealEstatePage/UploadTempImage';

// // //       xhr.open('POST', url, true);
// // //       xhr.setRequestHeader('Authorization', `Bearer ${token}`);

// // //       xhr.upload.onprogress = (event) => {
// // //         if (event.lengthComputable && onProgress) {
// // //           const progress = Math.round((event.loaded / event.total) * 100);
// // //           onProgress(progress);
// // //         }
// // //       };

// // //       xhr.onload = () => {
// // //         if (xhr.status === 200) {
// // //           try {
// // //             const result = JSON.parse(xhr.responseText);
// // //             if (result.success && result.cacheId) {
// // //               resolve(result.cacheId);
// // //             } else {
// // //               reject(new Error('خطا در آپلود تصویر'));
// // //             }
// // //           } catch (error) {
// // //             reject(error);
// // //           }
// // //         } else {
// // //           reject(new Error(`خطا در آپلود: ${xhr.status}`));
// // //         }
// // //       };

// // //       xhr.onerror = () => {
// // //         reject(new Error('خطا در ارتباط با سرور'));
// // //       };

// // //       xhr.send(formData);
// // //     });
// // //   };

// // //   // ===== حذف تصویر از کش =====
// // //   const clearTempImage = async (cacheId) => {
// // //     try {
// // //       const token = localStorage.getItem('auth_token');
// // //       const response = await fetch('https://localhost:7178/api/RealEstatePage/ClearTempImage', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify({ cacheId })
// // //       });

// // //       if (response.ok) {
// // //         const result = await response.json();
// // //         return result.success;
// // //       }
// // //       return false;
// // //     } catch (error) {
// // //       console.error('❌ خطا در حذف تصویر:', error);
// // //       return false;
// // //     }
// // //   };

// // //   // ===== تبدیل Base64 به File =====
// // //   const base64ToFile = (base64, fileName) => {
// // //     const arr = base64.split(',');
// // //     const mime = arr[0].match(/:(.*?);/)[1];
// // //     const bstr = atob(arr[1]);
// // //     let n = bstr.length;
// // //     const u8arr = new Uint8Array(n);
// // //     while (n--) {
// // //       u8arr[n] = bstr.charCodeAt(n);
// // //     }
// // //     return new File([u8arr], fileName, { type: mime });
// // //   };

// // //   // ===== استخراج تصاویر از محتوای HTML =====
// // //   const extractImagesFromContent = (html) => {
// // //     const temp = document.createElement('div');
// // //     temp.innerHTML = html;
// // //     const images = temp.querySelectorAll('img');
// // //     const imageData = [];
    
// // //     images.forEach((img, index) => {
// // //       const src = img.getAttribute('src');
// // //       if (src && src.startsWith('data:image')) {
// // //         const fileName = `content_image_${Date.now()}_${index}.jpg`;
// // //         imageData.push({
// // //           src: src,
// // //           fileName: fileName,
// // //           element: img
// // //         });
// // //       }
// // //     });
    
// // //     return imageData;
// // //   };

// // //   // ===== آپلود تصاویر محتوای مقاله =====
// // //   const uploadContentImages = async (htmlContent) => {
// // //     const temp = document.createElement('div');
// // //     temp.innerHTML = htmlContent;
// // //     const images = temp.querySelectorAll('img');
// // //     const uploadPromises = [];
// // //     const imageMap = {};
// // //     const cacheIds = [];

// // //     images.forEach((img, index) => {
// // //       const src = img.getAttribute('src');
// // //       if (src && src.startsWith('data:image')) {
// // //         const fileName = `content_image_${Date.now()}_${index}.jpg`;
// // //         const file = base64ToFile(src, fileName);
        
// // //         const promise = uploadImage(file, (progress) => {
// // //           console.log(`آپلود تصویر محتوا ${index + 1}: ${progress}%`);
// // //         }, true) // true = استفاده از UploadTempImagePost
// // //         .then((cacheId) => {
// // //           const imageUrl = `https://localhost:7178/api/Post/GetImage/${cacheId}`;
// // //           imageMap[src] = imageUrl;
// // //           cacheIds.push(cacheId);
// // //           return { cacheId, src, imageUrl };
// // //         }).catch((error) => {
// // //           console.error(`خطا در آپلود تصویر ${index + 1}:`, error);
// // //           return null;
// // //         });
        
// // //         uploadPromises.push(promise);
// // //       }
// // //     });

// // //     const results = await Promise.all(uploadPromises);
    
// // //     let updatedContent = htmlContent;
// // //     results.forEach((result) => {
// // //       if (result && result.src && result.imageUrl) {
// // //         updatedContent = updatedContent.replace(result.src, result.imageUrl);
// // //       }
// // //     });

// // //     return { updatedContent, cacheIds };
// // //   };

// // //   // ===== هندلر آپلود تصویر در ویرایشگر =====
// // //   const imageHandler = () => {
// // //     const input = document.createElement('input');
// // //     input.setAttribute('type', 'file');
// // //     input.setAttribute('accept', 'image/*');
// // //     input.click();

// // //     input.onchange = async () => {
// // //       const file = input.files[0];
// // //       if (!file) return;

// // //       if (file.size > 10 * 1024 * 1024) {
// // //         alert('حجم تصویر نباید بیشتر از 10 مگابایت باشد');
// // //         return;
// // //       }

// // //       const quill = quillRef.current.getEditor();
// // //       const range = quill.getSelection();
      
// // //       // نمایش لودینگ در ویرایشگر
// // //       const loadingGif = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
// // //       quill.insertEmbed(range.index, 'image', loadingGif);

// // //       const newImage = {
// // //         file,
// // //         progress: 0,
// // //         status: 'uploading',
// // //         cacheId: null,
// // //         url: null
// // //       };
// // //       setUploadedImages(prev => [...prev, newImage]);
// // //       setIsUploading(true);

// // //       try {
// // //         // استفاده از API مخصوص محتوای مقاله
// // //         const cacheId = await uploadImage(file, (progress) => {
// // //           setUploadedImages(prev => 
// // //             prev.map(img => 
// // //               img.file === file ? { ...img, progress } : img
// // //             )
// // //           );
// // //         }, true); // true = استفاده از UploadTempImagePost
        
// // //         const imageUrl = `https://localhost:7178/api/Post/GetImage/${cacheId}`;
// // //         quill.deleteText(range.index, 1);
// // //         quill.insertEmbed(range.index, 'image', imageUrl);
// // //         quill.setSelection(range.index + 1);

// // //         setUploadedImages(prev => 
// // //           prev.map(img => 
// // //             img.file === file ? { ...img, cacheId, url: imageUrl, status: 'success', progress: 100 } : img
// // //           )
// // //         );
// // //       } catch (error) {
// // //         console.error('❌ خطا:', error);
// // //         alert('خطا در آپلود تصویر. لطفاً دوباره تلاش کنید.');
// // //         quill.deleteText(range.index, 1);
// // //         setUploadedImages(prev => prev.filter(img => img.file !== file));
// // //       } finally {
// // //         setIsUploading(false);
// // //       }
// // //     };
// // //   };

// // //   // ===== حذف تصویر آپلود شده =====
// // //   const removeUploadedImage = async (imageToRemove) => {
// // //     if (imageToRemove.cacheId) {
// // //       await clearTempImage(imageToRemove.cacheId);
// // //     }
// // //     setUploadedImages(prev => prev.filter(img => img.file !== imageToRemove.file));
// // //   };

// // //   // ===== آپلود تصویر شاخص =====
// // //   const handleImageChange = async (e) => {
// // //     const file = e.target.files[0];
// // //     if (!file) return;

// // //     if (!file.type.startsWith('image/')) {
// // //       setErrors(prev => ({ ...prev, image: 'لطفاً یک تصویر معتبر انتخاب کنید' }));
// // //       return;
// // //     }
// // //     if (file.size > 10 * 1024 * 1024) {
// // //       setErrors(prev => ({ ...prev, image: 'حجم تصویر نباید بیشتر از 10 مگابایت باشد' }));
// // //       return;
// // //     }

// // //     // نمایش پیش‌نمایش
// // //     const reader = new FileReader();
// // //     reader.onloadend = () => {
// // //       setImagePreview(reader.result);
// // //     };
// // //     reader.readAsDataURL(file);

// // //     // آپلود تصویر شاخص با API معمولی (UploadTempImage)
// // //     setIsImageUploading(true);
// // //     setImageUploadProgress(0);

// // //     try {
// // //       const cacheId = await uploadImage(file, (progress) => {
// // //         setImageUploadProgress(progress);
// // //       }, false); // false = استفاده از UploadTempImage

// // //       setFormData(prev => ({ ...prev, image: file, imageCacheId: cacheId }));
      
// // //       if (errors.image) {
// // //         setErrors(prev => ({ ...prev, image: '' }));
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ خطا در آپلود تصویر شاخص:', error);
// // //       setErrors(prev => ({ ...prev, image: 'خطا در آپلود تصویر' }));
// // //       setImagePreview(null);
// // //     } finally {
// // //       setIsImageUploading(false);
// // //     }
// // //   };

// // //   // ===== حذف تصویر شاخص =====
// // //   const handleRemoveImage = async () => {
// // //     if (formData.imageCacheId) {
// // //       await clearTempImage(formData.imageCacheId);
// // //     }
// // //     setFormData(prev => ({ ...prev, image: null, imageCacheId: null }));
// // //     setImagePreview(null);
// // //     setImageUploadProgress(0);
// // //     const fileInput = document.getElementById('imageInput');
// // //     if (fileInput) {
// // //       fileInput.value = '';
// // //     }
// // //   };

// // //   // ===== ماژول‌های Quill =====
// // //   const modules = {
// // //     toolbar: {
// // //       container: [
// // //         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
// // //         [{ 'font': [] }],
// // //         [{ 'size': ['small', false, 'large', 'huge'] }],
// // //         ['bold', 'italic', 'underline', 'strike'],
// // //         [{ 'color': [] }, { 'background': [] }],
// // //         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
// // //         [{ 'indent': '-1' }, { 'indent': '+1' }],
// // //         [{ 'align': [] }],
// // //         ['blockquote', 'code-block'],
// // //         ['link', 'image', 'video', 'formula'],
// // //         ['clean']
// // //       ],
// // //       handlers: {
// // //         image: imageHandler
// // //       }
// // //     },
// // //     clipboard: {
// // //       matchVisual: false
// // //     }
// // //   };

// // //   const formats = [
// // //     'header', 'font', 'size',
// // //     'bold', 'italic', 'underline', 'strike',
// // //     'color', 'background',
// // //     'list', 'bullet', 'check',
// // //     'indent',
// // //     'align',
// // //     'blockquote', 'code-block',
// // //     'link', 'image', 'video', 'formula',
// // //     'width', 'height'
// // //   ];

// // //   // مدیریت تغییرات فیلدها
// // //   const handleChange = (e) => {
// // //     const { name, value, type, checked } = e.target;
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [name]: type === 'checkbox' ? checked : value
// // //     }));
// // //     if (errors[name]) {
// // //       setErrors(prev => ({ ...prev, [name]: '' }));
// // //     }

// // //     if (name === 'categoryId') {
// // //       fetchTags(value);
// // //     }
// // //   };

// // //   // مدیریت تغییرات محتوای ویرایشگر
// // //   const handleContentChange = (value) => {
// // //     setFormData(prev => ({ ...prev, content: value }));
// // //     if (errors.content) {
// // //       setErrors(prev => ({ ...prev, content: '' }));
// // //     }
// // //   };

// // //   // مدیریت انتخاب تگ
// // //   const handleTagSelect = (tag) => {
// // //     if (selectedTags.some(t => t.id === tag.id)) {
// // //       setSelectedTags(prev => prev.filter(t => t.id !== tag.id));
// // //     } else {
// // //       setSelectedTags(prev => [...prev, tag]);
// // //     }
// // //   };

// // //   const handleRemoveTag = (tagId) => {
// // //     setSelectedTags(prev => prev.filter(t => t.id !== tagId));
// // //   };

// // //   // اعتبارسنجی فرم
// // //   const validateForm = () => {
// // //     const newErrors = {};
    
// // //     if (!formData.title.trim()) {
// // //       newErrors.title = 'عنوان مقاله الزامی است';
// // //     } else if (formData.title.length < 5) {
// // //       newErrors.title = 'عنوان باید حداقل 5 کاراکتر باشد';
// // //     }

// // //     if (!formData.summary.trim()) {
// // //       newErrors.summary = 'خلاصه مقاله الزامی است';
// // //     } else if (formData.summary.length < 10) {
// // //       newErrors.summary = 'خلاصه باید حداقل 10 کاراکتر باشد';
// // //     }

// // //     const plainText = formData.content.replace(/<[^>]*>/g, '').trim();
// // //     if (!plainText) {
// // //       newErrors.content = 'متن مقاله الزامی است';
// // //     } else if (plainText.length < 50) {
// // //       newErrors.content = 'متن مقاله باید حداقل 50 کاراکتر باشد';
// // //     }

// // //     if (!formData.categoryId) {
// // //       newErrors.categoryId = 'لطفاً یک دسته‌بندی انتخاب کنید';
// // //     }

// // //     if (selectedTags.length === 0) {
// // //       newErrors.tags = 'لطفاً حداقل یک برچسب انتخاب کنید';
// // //     }

// // //     if (!formData.imageCacheId && !formData.image) {
// // //       newErrors.image = 'تصویر شاخص الزامی است';
// // //     }

// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   // ارسال فرم
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
    
// // //     if (!validateForm()) {
// // //       const firstError = document.querySelector('.input-error');
// // //       if (firstError) {
// // //         firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
// // //       }
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setUploadProgress(0);

// // //     try {
// // //       const token = localStorage.getItem('auth_token');
      
// // //       // آپلود تصاویر موجود در محتوا
// // //       setUploadProgress(20);
// // //       const { updatedContent, cacheIds: contentCacheIds } = await uploadContentImages(formData.content);
// // //       setUploadProgress(60);

// // //       // آماده‌سازی داده‌ها
// // //       const tagIds = selectedTags.map(tag => tag.id);
      
// // //       // جمع‌آوری همه cacheId ها
// // //       const allCacheIds = [...contentCacheIds];
      
// // //       // اضافه کردن cacheId تصویر شاخص
// // //       if (formData.imageCacheId) {
// // //         allCacheIds.push(formData.imageCacheId);
// // //       }

// // //       // اضافه کردن cacheId تصاویر آپلود شده در ویرایشگر
// // //       const editorImageCacheIds = uploadedImages
// // //         .filter(img => img.status === 'success' && img.cacheId)
// // //         .map(img => img.cacheId);
// // //       allCacheIds.push(...editorImageCacheIds);

// // //       const submitData = {
// // //         title: formData.title,
// // //         summary: formData.summary,
// // //         content: updatedContent,
// // //         categoryId: parseInt(formData.categoryId),
// // //         tagsId: tagIds,
// // //         isPublished: formData.isPublished,
// // //         tempImageCacheIds: allCacheIds.join(',')
// // //       };

// // //       console.log('📤 ارسال داده:', submitData);

// // //       setUploadProgress(80);

// // //       const response = await fetch('https://localhost:7178/api/Post/CreatePost', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //           'Content-Type': 'application/json'
// // //         },
// // //         body: JSON.stringify(submitData)
// // //       });

// // //       setUploadProgress(100);

// // //       if (!response.ok) {
// // //         let errorMessage = 'خطا در ثبت مقاله';
// // //         try {
// // //           const errorData = await response.json();
// // //           errorMessage = errorData.message || errorMessage;
// // //         } catch (e) {}
// // //         throw new Error(errorMessage);
// // //       }

// // //       const result = await response.json();
      
// // //       if (result.status === 200 || result.isSuccess) {
// // //         setSuccess(true);
// // //         setTimeout(() => {
// // //           navigate('/blog');
// // //         }, 2000);
// // //       } else {
// // //         throw new Error(result.message || 'خطا در ثبت مقاله');
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ خطا:', error);
// // //       setErrors({ submit: error.message || 'مشکل در ارتباط با سرور' });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const renderError = (field) => {
// // //     if (errors[field]) {
// // //       return <span className="input-error">{errors[field]}</span>;
// // //     }
// // //     return null;
// // //   };

// // //   return (
// // //     <div className="blog-create-wrapper">
// // //       {/* هدر */}
// // //       <div className="blog-create-header">
// // //         <div className="header-content">
// // //           <div className="header-text">
// // //             <h1 className="blog-create-title">✍️ ثبت مقاله جدید</h1>
// // //             <p className="blog-create-subtitle">مقالات خود را با ویرایشگر حرفه‌ای بنویسید و منتشر کنید</p>
// // //           </div>
// // //           <button 
// // //             className="preview-toggle-btn"
// // //             onClick={() => setShowPreview(!showPreview)}
// // //           >
// // //             {showPreview ? '✏️ ویرایش' : '👁️ پیش‌نمایش'}
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* فرم */}
// // //       <div className="blog-create-form-container">
// // //         {success ? (
// // //           <div className="success-message">
// // //             <FaCheckCircle className="success-icon" />
// // //             <h3>🎉 مقاله با موفقیت ثبت شد!</h3>
// // //             <p>در حال انتقال به صفحه وبلاگ...</p>
// // //           </div>
// // //         ) : (
// // //           <form onSubmit={handleSubmit} className="blog-create-form">
// // //             {/* خطای سرور */}
// // //             {errors.submit && (
// // //               <div className="submit-error">
// // //                 <FaExclamationCircle />
// // //                 <span>{errors.submit}</span>
// // //               </div>
// // //             )}

// // //             {/* عنوان */}
// // //             <div className="form-group">
// // //               <label htmlFor="title" className="form-label">
// // //                 عنوان مقاله <span className="required">*</span>
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 id="title"
// // //                 name="title"
// // //                 value={formData.title}
// // //                 onChange={handleChange}
// // //                 placeholder="عنوان جذاب برای مقاله خود بنویسید..."
// // //                 className={`form-input ${errors.title ? 'error' : ''}`}
// // //               />
// // //               {renderError('title')}
// // //             </div>

// // //             {/* خلاصه */}
// // //             <div className="form-group">
// // //               <label htmlFor="summary" className="form-label">
// // //                 خلاصه مقاله <span className="required">*</span>
// // //               </label>
// // //               <textarea
// // //                 id="summary"
// // //                 name="summary"
// // //                 value={formData.summary}
// // //                 onChange={handleChange}
// // //                 placeholder="خلاصه‌ای از مقاله را وارد کنید..."
// // //                 rows="3"
// // //                 className={`form-textarea ${errors.summary ? 'error' : ''}`}
// // //               />
// // //               {renderError('summary')}
// // //             </div>

// // //             {/* ویرایشگر متن پیشرفته */}
// // //             <div className="form-group">
// // //               <label className="form-label">
// // //                 متن مقاله <span className="required">*</span>
// // //               </label>
// // //               <div className={`editor-wrapper ${showPreview ? 'preview-mode' : ''}`}>
// // //                 {showPreview ? (
// // //                   <div 
// // //                     className="preview-content"
// // //                     dangerouslySetInnerHTML={{ __html: formData.content }}
// // //                   />
// // //                 ) : (
// // //                   <ReactQuill
// // //                     ref={quillRef}
// // //                     theme="snow"
// // //                     value={formData.content}
// // //                     onChange={handleContentChange}
// // //                     modules={modules}
// // //                     formats={formats}
// // //                     placeholder="متن مقاله را بنویسید... برای درج تصویر روی آیکون 🖼️ کلیک کنید"
// // //                     className={`blog-editor ${errors.content ? 'error' : ''}`}
// // //                   />
// // //                 )}
// // //               </div>
// // //               {renderError('content')}
              
// // //               {/* نمایش وضعیت آپلود تصاویر */}
// // //               {uploadedImages.length > 0 && (
// // //                 <div className="upload-status-container">
// // //                   <div className="upload-status-header">
// // //                     <FaImage className="upload-status-icon" />
// // //                     <span>تصاویر در حال آپلود ({uploadedImages.length})</span>
// // //                   </div>
// // //                   <div className="upload-status-list">
// // //                     {uploadedImages.map((img, index) => (
// // //                       <div key={index} className="upload-status-item">
// // //                         <div className="upload-file-info">
// // //                           <span className="upload-file-name">{img.file.name}</span>
// // //                           <span className="upload-file-size">
// // //                             {(img.file.size / 1024).toFixed(1)} KB
// // //                           </span>
// // //                         </div>
// // //                         <div className="upload-progress-bar">
// // //                           <div 
// // //                             className={`upload-progress-fill ${img.status}`}
// // //                             style={{ width: `${img.progress}%` }}
// // //                           />
// // //                         </div>
// // //                         <div className="upload-status-actions">
// // //                           {img.status === 'uploading' && (
// // //                             <span className="upload-status-text uploading">
// // //                               {img.progress}%
// // //                             </span>
// // //                           )}
// // //                           {img.status === 'success' && (
// // //                             <span className="upload-status-text success">
// // //                               <FaCheckCircle /> آپلود شد
// // //                             </span>
// // //                           )}
// // //                           {img.status === 'error' && (
// // //                             <span className="upload-status-text error">
// // //                               خطا
// // //                             </span>
// // //                           )}
// // //                           {img.status === 'success' && (
// // //                             <button
// // //                               type="button"
// // //                               className="remove-upload-btn"
// // //                               onClick={() => removeUploadedImage(img)}
// // //                             >
// // //                               <FaTrash />
// // //                             </button>
// // //                           )}
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* دسته‌بندی */}
// // //             <div className="form-group">
// // //               <label htmlFor="categoryId" className="form-label">
// // //                 دسته‌بندی <span className="required">*</span>
// // //               </label>
// // //               <div className="select-wrapper">
// // //                 <FaTag className="select-icon" />
// // //                 <select
// // //                   id="categoryId"
// // //                   name="categoryId"
// // //                   value={formData.categoryId}
// // //                   onChange={handleChange}
// // //                   className={`form-select ${errors.categoryId ? 'error' : ''}`}
// // //                 >
// // //                   <option value="">انتخاب دسته‌بندی...</option>
// // //                   {categories.map(cat => (
// // //                     <option key={cat.id} value={cat.id}>{cat.name}</option>
// // //                   ))}
// // //                 </select>
// // //               </div>
// // //               {renderError('categoryId')}
// // //             </div>

// // //             {/* برچسب‌ها */}
// // //             <div className="form-group">
// // //               <label className="form-label">
// // //                 برچسب‌ها <span className="required">*</span>
// // //               </label>
              
// // //               {loadingTags ? (
// // //                 <div className="tags-loading">
// // //                   <FaSpinner className="spinner-small" />
// // //                   <span>در حال بارگذاری برچسب‌ها...</span>
// // //                 </div>
// // //               ) : (
// // //                 <>
// // //                   {tags.length > 0 ? (
// // //                     <div className="tags-multiselect">
// // //                       {selectedTags.length > 0 && (
// // //                         <div className="selected-tags">
// // //                           {selectedTags.map(tag => (
// // //                             <span key={tag.id} className="selected-tag">
// // //                               <span className="tag-name">{tag.name}</span>
// // //                               <button 
// // //                                 type="button" 
// // //                                 className="remove-tag-btn"
// // //                                 onClick={() => handleRemoveTag(tag.id)}
// // //                               >
// // //                                 <FaTimes />
// // //                               </button>
// // //                             </span>
// // //                           ))}
// // //                         </div>
// // //                       )}

// // //                       <div className="tags-list">
// // //                         {tags.map(tag => {
// // //                           const isSelected = selectedTags.some(t => t.id === tag.id);
// // //                           return (
// // //                             <button
// // //                               key={tag.id}
// // //                               type="button"
// // //                               className={`tag-item ${isSelected ? 'selected' : ''}`}
// // //                               onClick={() => handleTagSelect(tag)}
// // //                             >
// // //                               <span className="tag-check">{isSelected ? '✓' : '+'}</span>
// // //                               <span className="tag-name">{tag.name}</span>
// // //                             </button>
// // //                           );
// // //                         })}
// // //                       </div>
// // //                     </div>
// // //                   ) : (
// // //                     <div className="no-tags-message">
// // //                       <FaExclamationCircle />
// // //                       <span>برای این دسته‌بندی برچسبی تعریف نشده است</span>
// // //                     </div>
// // //                   )}
// // //                 </>
// // //               )}
// // //               {renderError('tags')}
// // //             </div>

// // //             {/* آپلود تصویر شاخص */}
// // //             <div className="form-group">
// // //               <label className="form-label">
// // //                 تصویر شاخص <span className="required">*</span>
// // //               </label>
              
// // //               <div className={`image-upload-area ${errors.image ? 'error' : ''}`}>
// // //                 {imagePreview ? (
// // //                   <div className="image-preview-container">
// // //                     <img src={imagePreview} alt="پیش‌نمایش" className="image-preview" />
// // //                     {isImageUploading && (
// // //                       <div className="image-upload-overlay">
// // //                         <div className="upload-spinner"></div>
// // //                         <span>{imageUploadProgress}%</span>
// // //                       </div>
// // //                     )}
// // //                     <button 
// // //                       type="button" 
// // //                       className="remove-image-btn"
// // //                       onClick={handleRemoveImage}
// // //                       disabled={isImageUploading}
// // //                     >
// // //                       <FaTimes />
// // //                     </button>
// // //                   </div>
// // //                 ) : (
// // //                   <>
// // //                     <input
// // //                       type="file"
// // //                       id="imageInput"
// // //                       accept="image/*"
// // //                       onChange={handleImageChange}
// // //                       className="image-input"
// // //                       disabled={isImageUploading}
// // //                     />
// // //                     <label htmlFor="imageInput" className="image-upload-label">
// // //                       {isImageUploading ? (
// // //                         <>
// // //                           <FaSpinner className="upload-spinner-icon" />
// // //                           <span>در حال آپلود... {imageUploadProgress}%</span>
// // //                         </>
// // //                       ) : (
// // //                         <>
// // //                           <FaUpload className="upload-icon" />
// // //                           <span>برای آپلود تصویر کلیک کنید</span>
// // //                           <span className="upload-hint">فرمت‌های مجاز: JPG, PNG, WebP</span>
// // //                           <span className="upload-hint">حداکثر حجم: 10 مگابایت</span>
// // //                         </>
// // //                       )}
// // //                     </label>
// // //                   </>
// // //                 )}
// // //               </div>
// // //               {renderError('image')}
// // //               {isImageUploading && (
// // //                 <div className="image-upload-progress">
// // //                   <div className="progress-bar">
// // //                     <div 
// // //                       className="progress-fill" 
// // //                       style={{ width: `${imageUploadProgress}%` }}
// // //                     />
// // //                   </div>
// // //                   <span className="progress-text">{imageUploadProgress}%</span>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* وضعیت انتشار */}
// // //             <div className="form-group">
// // //               <label className="form-label">وضعیت انتشار</label>
// // //               <div className="publish-toggle">
// // //                 <button
// // //                   type="button"
// // //                   className={`toggle-btn ${formData.isPublished ? 'active' : ''}`}
// // //                   onClick={() => setFormData(prev => ({ ...prev, isPublished: true }))}
// // //                 >
// // //                   <FaEye /> منتشر شده
// // //                 </button>
// // //                 <button
// // //                   type="button"
// // //                   className={`toggle-btn ${!formData.isPublished ? 'active' : ''}`}
// // //                   onClick={() => setFormData(prev => ({ ...prev, isPublished: false }))}
// // //                 >
// // //                   <FaEyeSlash /> پیش‌نویس
// // //                 </button>
// // //               </div>
// // //             </div>

// // //             {/* دکمه‌ها */}
// // //             <div className="form-actions">
// // //               <button
// // //                 type="button"
// // //                 className="cancel-btn"
// // //                 onClick={() => navigate('/blog')}
// // //               >
// // //                 انصراف
// // //               </button>
// // //               <button
// // //                 type="submit"
// // //                 className="submit-btn"
// // //                 disabled={loading || isUploading || isImageUploading}
// // //               >
// // //                 {loading ? (
// // //                   <>
// // //                     <FaSpinner className="spinner" />
// // //                     <span>در حال ثبت مقاله...</span>
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <FaSave />
// // //                     <span>انتشار مقاله</span>
// // //                   </>
// // //                 )}
// // //               </button>
// // //             </div>

// // //             {/* پیشرفت کلی */}
// // //             {(loading || isUploading || isImageUploading) && (
// // //               <div className="upload-progress">
// // //                 <div className="progress-bar">
// // //                   <div 
// // //                     className="progress-fill" 
// // //                     style={{ width: `${uploadProgress}%` }}
// // //                   />
// // //                 </div>
// // //                 <span className="progress-text">
// // //                   {isImageUploading ? 'در حال آپلود تصویر شاخص...' : 
// // //                    isUploading ? 'در حال آپلود تصاویر...' : 
// // //                    uploadProgress < 20 ? 'آماده‌سازی...' :
// // //                    uploadProgress < 60 ? 'آپلود تصاویر محتوا...' :
// // //                    uploadProgress < 80 ? 'آماده‌سازی داده‌ها...' :
// // //                    'در حال ثبت مقاله...'}
// // //                 </span>
// // //               </div>
// // //             )}
// // //           </form>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default BlogCreate;

// // // components/page/blog/BlogCreate.js
// // import React, { useState, useEffect, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import ReactQuill from 'react-quill-new';
// // import 'react-quill-new/dist/quill.snow.css';
// // import { 
// //   FaSpinner, FaTag, FaTimes, FaUpload, FaEye, FaEyeSlash,
// //   FaCheckCircle, FaExclamationCircle, FaSave, FaImage,
// //   FaTrash
// // } from 'react-icons/fa';
// // import './BlogCreate.css';

// // const BlogCreate = () => {
// //   const navigate = useNavigate();
// //   const quillRef = useRef(null);
// //   const [loading, setLoading] = useState(false);
// //   const [categories, setCategories] = useState([]);
// //   const [tags, setTags] = useState([]);
// //   const [selectedTags, setSelectedTags] = useState([]);
// //   const [loadingTags, setLoadingTags] = useState(false);
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     summary: '',
// //     content: '',
// //     categoryId: '',
// //     isPublished: true,
// //     image: null,
// //     imageCacheId: null
// //   });
// //   const [imagePreview, setImagePreview] = useState(null);
// //   const [imageUploadProgress, setImageUploadProgress] = useState(0);
// //   const [isImageUploading, setIsImageUploading] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [success, setSuccess] = useState(false);
// //   const [uploadProgress, setUploadProgress] = useState(0);
// //   const [showPreview, setShowPreview] = useState(false);
  
// //   // State برای مدیریت آپلود تصاویر در ویرایشگر
// //   const [uploadedImages, setUploadedImages] = useState([]);
// //   const [isUploading, setIsUploading] = useState(false);

// //   // دریافت دسته‌بندی‌ها
// //   useEffect(() => {
// //     fetchCategories();
// //   }, []);

// //   const fetchCategories = async () => {
// //     try {
// //       const response = await fetch('https://localhost:7178/api/Post/GetCategoryPostsDTOs', {
// //         headers: {
// //           'Content-Type': 'application/json'
// //         }
// //       });

// //       if (response.ok) {
// //         const result = await response.json();
// //         if (result.status === 200 && result.data) {
// //           setCategories(result.data);
// //         }
// //       }
// //     } catch (error) {
// //       console.error('❌ خطا در دریافت دسته‌بندی‌ها:', error);
// //     }
// //   };

// //   // دریافت تگ‌ها بر اساس دسته‌بندی
// //   const fetchTags = async (categoryId) => {
// //     if (!categoryId) {
// //       setTags([]);
// //       setSelectedTags([]);
// //       return;
// //     }

// //     setLoadingTags(true);
// //     try {
// //       const token = localStorage.getItem('auth_token');
// //       const response = await fetch(`https://localhost:7178/api/Post/GetTagsDtosDTOs?catId=${categoryId}`, {
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });

// //       if (response.ok) {
// //         const result = await response.json();
// //         if (result.status === 200 && result.data) {
// //           setTags(result.data);
// //           setSelectedTags([]);
// //         } else {
// //           setTags([]);
// //         }
// //       } else {
// //         setTags([]);
// //       }
// //     } catch (error) {
// //       console.error('❌ خطا در دریافت تگ‌ها:', error);
// //       setTags([]);
// //     } finally {
// //       setLoadingTags(false);
// //     }
// //   };

// //   // ===== آپلود تصویر با پیشرفت =====
// //   const uploadImage = async (file, onProgress) => {
// //     return new Promise((resolve, reject) => {
// //       const formData = new FormData();
// //       formData.append('image', file);

// //       const xhr = new XMLHttpRequest();
// //       const token = localStorage.getItem('auth_token');

// //       // استفاده از API UploadTempImage برای همه تصاویر
// //      xhr.open('POST', 'https://localhost:7178/api/RealEstatePage/UploadTempImage', true);

// //   //     }
// //   //     else{
// //   // xhr.open('POST', 'https://localhost:7178/api/Post/UploadTempImagePost', true);
// //   //     }
    
// //       xhr.setRequestHeader('Authorization', `Bearer ${token}`);

// //       xhr.upload.onprogress = (event) => {
// //         if (event.lengthComputable && onProgress) {
// //           const progress = Math.round((event.loaded / event.total) * 100);
// //           onProgress(progress);
// //         }
// //       };

// //       xhr.onload = () => {
// //         if (xhr.status === 200) {
// //           try {
// //             const result = JSON.parse(xhr.responseText);
// //             if (result.success && result.cacheId) {
// //               resolve(result.cacheId);
// //             } else {
// //               reject(new Error('خطا در آپلود تصویر'));
// //             }
// //           } catch (error) {
// //             reject(error);
// //           }
// //         } else {
// //           reject(new Error(`خطا در آپلود: ${xhr.status}`));
// //         }
// //       };

// //       xhr.onerror = () => {
// //         reject(new Error('خطا در ارتباط با سرور'));
// //       };

// //       xhr.send(formData);
// //     });
// //   };
// //   // ===== آپلود تصویر با پیشرفت =====
// //   const uploadImagePost = async (file, onProgress) => {

// //     return new Promise((resolve, reject) => {
// //       const formData = new FormData();
// //       formData.append('image', file);

// //       const xhr = new XMLHttpRequest();
// //       const token = localStorage.getItem('auth_token');

// //       // استفاده از API UploadTempImage برای همه تصاویر
   
// //    xhr.open('POST', 'https://localhost:7178/api/Post/UploadTempImagePost', true);

    
// //       xhr.setRequestHeader('Authorization', `Bearer ${token}`);

// //       xhr.upload.onprogress = (event) => {
// //         if (event.lengthComputable && onProgress) {
// //           const progress = Math.round((event.loaded / event.total) * 100);
// //           onProgress(progress);
// //         }
// //       };

// //       xhr.onload = () => {
// //         if (xhr.status === 200) {
// //           try {
// //             const result = JSON.parse(xhr.responseText);
// //             if (result.success && result.cacheId) {
// //               resolve(result.cacheId);
// //             } else {
// //               reject(new Error('خطا در آپلود تصویر'));
// //             }
// //           } catch (error) {
// //             reject(error);
// //           }
// //         } else {
// //           reject(new Error(`خطا در آپلود: ${xhr.status}`));
// //         }
// //       };

// //       xhr.onerror = () => {
// //         reject(new Error('خطا در ارتباط با سرور'));
// //       };

// //       xhr.send(formData);
// //     });
// //   };

// //   // ===== حذف تصویر از کش =====
// //   const clearTempImage = async (cacheId) => {
// //     try {
// //       const token = localStorage.getItem('auth_token');
// //       const response = await fetch('https://localhost:7178/api/RealEstatePage/ClearTempImage', {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({ cacheId })
// //       });

// //       if (response.ok) {
// //         const result = await response.json();
// //         return result.success;
// //       }
// //       return false;
// //     } catch (error) {
// //       console.error('❌ خطا در حذف تصویر:', error);
// //       return false;
// //     }
// //   };

// //   // ===== تبدیل Base64 به File =====
// //   const base64ToFile = (base64, fileName) => {
// //     const arr = base64.split(',');
// //     const mime = arr[0].match(/:(.*?);/)[1];
// //     const bstr = atob(arr[1]);
// //     let n = bstr.length;
// //     const u8arr = new Uint8Array(n);
// //     while (n--) {
// //       u8arr[n] = bstr.charCodeAt(n);
// //     }
// //     return new File([u8arr], fileName, { type: mime });
// //   };

// //   // ===== آپلود تصاویر محتوای مقاله =====
// //   const uploadContentImages = async (htmlContent) => {
// //     const temp = document.createElement('div');
// //     temp.innerHTML = htmlContent;
// //     const images = temp.querySelectorAll('img');
// //     const uploadPromises = [];
// //     const imageMap = {};
// //     const cacheIds = [];
// //     alert('post')
// //     images.forEach((img, index) => {
// //       const src = img.getAttribute('src');
// //       if (src && src.startsWith('data:image')) {
// //         const fileName = `content_image_${Date.now()}_${index}.jpg`;
// //         const file = base64ToFile(src, fileName);
        
// //         const promise = uploadImagePost(file, (progress) => {
// //           console.log(`آپلود تصویر محتوا ${index + 1}: ${progress}%`);
// //         },1)
// //         .then((cacheId) => {
// //           const imageUrl = `https://localhost:7178/api/Post/GetImage/${cacheId}`;
// //           imageMap[src] = imageUrl;
// //           cacheIds.push(cacheId);
// //           return { cacheId, src, imageUrl };
// //         }).catch((error) => {
// //           console.error(`خطا در آپلود تصویر ${index + 1}:`, error);
// //           return null;
// //         });
        
// //         uploadPromises.push(promise);
// //       }
// //     });

// //     const results = await Promise.all(uploadPromises);
    
// //     let updatedContent = htmlContent;
// //     results.forEach((result) => {
// //       if (result && result.src && result.imageUrl) {
// //         updatedContent = updatedContent.replace(result.src, result.imageUrl);
// //       }
// //     });

// //     return { updatedContent, cacheIds };
// //   };

// //   // ===== هندلر آپلود تصویر در ویرایشگر =====
// //   const imageHandler = () => {
// //     const input = document.createElement('input');
// //     input.setAttribute('type', 'file');
// //     input.setAttribute('accept', 'image/*');
// //     input.click();

// //     input.onchange = async () => {
// //       const file = input.files[0];
// //       if (!file) return;

// //       if (file.size > 10 * 1024 * 1024) {
// //         alert('حجم تصویر نباید بیشتر از 10 مگابایت باشد');
// //         return;
// //       }

// //       const quill = quillRef.current.getEditor();
// //       const range = quill.getSelection();
      
// //       // نمایش لودینگ در ویرایشگر
// //       const loadingGif = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
// //       quill.insertEmbed(range.index, 'image', loadingGif);

// //       const newImage = {
// //         file,
// //         progress: 0,
// //         status: 'uploading',
// //         cacheId: null,
// //         url: null
// //       };
// //       setUploadedImages(prev => [...prev, newImage]);
// //       setIsUploading(true);

// //       try {
// //         const cacheId = await uploadImage(file, (progress) => {
// //           setUploadedImages(prev => 
// //             prev.map(img => 
// //               img.file === file ? { ...img, progress } : img
// //             )
// //           );
// //         });
        
// //         const imageUrl = `https://localhost:7178/api/Post/GetImage/${cacheId}`;
// //         quill.deleteText(range.index, 1);
// //         quill.insertEmbed(range.index, 'image', imageUrl);
// //         quill.setSelection(range.index + 1);

// //         setUploadedImages(prev => 
// //           prev.map(img => 
// //             img.file === file ? { ...img, cacheId, url: imageUrl, status: 'success', progress: 100 } : img
// //           )
// //         );
// //       } catch (error) {
// //         console.error('❌ خطا:', error);
// //         alert('خطا در آپلود تصویر. لطفاً دوباره تلاش کنید.');
// //         quill.deleteText(range.index, 1);
// //         setUploadedImages(prev => prev.filter(img => img.file !== file));
// //       } finally {
// //         setIsUploading(false);
// //       }
// //     };
// //   };

// //   // ===== حذف تصویر آپلود شده =====
// //   const removeUploadedImage = async (imageToRemove) => {
// //     if (imageToRemove.cacheId) {
// //       await clearTempImage(imageToRemove.cacheId);
// //     }
// //     setUploadedImages(prev => prev.filter(img => img.file !== imageToRemove.file));
// //   };

// //   // ===== آپلود تصویر شاخص =====
// //   const handleImageChange = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     if (!file.type.startsWith('image/')) {
// //       setErrors(prev => ({ ...prev, image: 'لطفاً یک تصویر معتبر انتخاب کنید' }));
// //       return;
// //     }
// //     if (file.size > 10 * 1024 * 1024) {
// //       setErrors(prev => ({ ...prev, image: 'حجم تصویر نباید بیشتر از 10 مگابایت باشد' }));
// //       return;
// //     }

// //     // نمایش پیش‌نمایش
// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setImagePreview(reader.result);
// //     };
// //     reader.readAsDataURL(file);

// //     // آپلود تصویر شاخص با API UploadTempImage
// //     setIsImageUploading(true);
// //     setImageUploadProgress(0);

// //     try {
// //       const cacheId = await uploadImage(file, (progress) => {
// //         setImageUploadProgress(progress);
// //       });

// //       setFormData(prev => ({ ...prev, image: file, imageCacheId: cacheId }));
      
// //       if (errors.image) {
// //         setErrors(prev => ({ ...prev, image: '' }));
// //       }
// //     } catch (error) {
// //       console.error('❌ خطا در آپلود تصویر شاخص:', error);
// //       setErrors(prev => ({ ...prev, image: 'خطا در آپلود تصویر' }));
// //       setImagePreview(null);
// //     } finally {
// //       setIsImageUploading(false);
// //     }
// //   };

// //   // ===== حذف تصویر شاخص =====
// //   const handleRemoveImage = async () => {
// //     if (formData.imageCacheId) {
// //       await clearTempImage(formData.imageCacheId);
// //     }
// //     setFormData(prev => ({ ...prev, image: null, imageCacheId: null }));
// //     setImagePreview(null);
// //     setImageUploadProgress(0);
// //     const fileInput = document.getElementById('imageInput');
// //     if (fileInput) {
// //       fileInput.value = '';
// //     }
// //   };

// //   // ===== ماژول‌های Quill =====
// //   const modules = {
// //     toolbar: {
// //       container: [
// //         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
// //         [{ 'font': [] }],
// //         [{ 'size': ['small', false, 'large', 'huge'] }],
// //         ['bold', 'italic', 'underline', 'strike'],
// //         [{ 'color': [] }, { 'background': [] }],
// //         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
// //         [{ 'indent': '-1' }, { 'indent': '+1' }],
// //         [{ 'align': [] }],
// //         ['blockquote', 'code-block'],
// //         ['link', 'image', 'video', 'formula'],
// //         ['clean']
// //       ],
// //       handlers: {
// //         image: imageHandler
// //       }
// //     },
// //     clipboard: {
// //       matchVisual: false
// //     }
// //   };

// //   const formats = [
// //     'header', 'font', 'size',
// //     'bold', 'italic', 'underline', 'strike',
// //     'color', 'background',
// //     'list', 'bullet', 'check',
// //     'indent',
// //     'align',
// //     'blockquote', 'code-block',
// //     'link', 'image', 'video', 'formula',
// //     'width', 'height'
// //   ];

// //   // مدیریت تغییرات فیلدها
// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: type === 'checkbox' ? checked : value
// //     }));
// //     if (errors[name]) {
// //       setErrors(prev => ({ ...prev, [name]: '' }));
// //     }

// //     if (name === 'categoryId') {
// //       fetchTags(value);
// //     }
// //   };

// //   // مدیریت تغییرات محتوای ویرایشگر
// //   const handleContentChange = (value) => {
// //     setFormData(prev => ({ ...prev, content: value }));
// //     if (errors.content) {
// //       setErrors(prev => ({ ...prev, content: '' }));
// //     }
// //   };

// //   // مدیریت انتخاب تگ
// //   const handleTagSelect = (tag) => {
// //     if (selectedTags.some(t => t.id === tag.id)) {
// //       setSelectedTags(prev => prev.filter(t => t.id !== tag.id));
// //     } else {
// //       setSelectedTags(prev => [...prev, tag]);
// //     }
// //   };

// //   const handleRemoveTag = (tagId) => {
// //     setSelectedTags(prev => prev.filter(t => t.id !== tagId));
// //   };

// //   // اعتبارسنجی فرم
// //   const validateForm = () => {
// //     const newErrors = {};
    
// //     if (!formData.title.trim()) {
// //       newErrors.title = 'عنوان مقاله الزامی است';
// //     } else if (formData.title.length < 5) {
// //       newErrors.title = 'عنوان باید حداقل 5 کاراکتر باشد';
// //     }

// //     if (!formData.summary.trim()) {
// //       newErrors.summary = 'خلاصه مقاله الزامی است';
// //     } else if (formData.summary.length < 10) {
// //       newErrors.summary = 'خلاصه باید حداقل 10 کاراکتر باشد';
// //     }

// //     const plainText = formData.content.replace(/<[^>]*>/g, '').trim();
// //     if (!plainText) {
// //       newErrors.content = 'متن مقاله الزامی است';
// //     } else if (plainText.length < 50) {
// //       newErrors.content = 'متن مقاله باید حداقل 50 کاراکتر باشد';
// //     }

// //     if (!formData.categoryId) {
// //       newErrors.categoryId = 'لطفاً یک دسته‌بندی انتخاب کنید';
// //     }

// //     if (selectedTags.length === 0) {
// //       newErrors.tags = 'لطفاً حداقل یک برچسب انتخاب کنید';
// //     }

// //     if (!formData.imageCacheId && !formData.image) {
// //       newErrors.image = 'تصویر شاخص الزامی است';
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   // ارسال فرم
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!validateForm()) {
// //       const firstError = document.querySelector('.input-error');
// //       if (firstError) {
// //         firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
// //       }
// //       return;
// //     }

// //     setLoading(true);
// //     setUploadProgress(0);

// //     try {
// //       const token = localStorage.getItem('auth_token');
      
// //       // آپلود تصاویر موجود در محتوا
// //       setUploadProgress(20);
// //       const { updatedContent, cacheIds: contentCacheIds } = await uploadContentImages(formData.content);
// //       setUploadProgress(60);

// //       // آماده‌سازی داده‌ها
// //       const tagIds = selectedTags.map(tag => tag.id);
      
// //       // جمع‌آوری همه cacheId ها
// //       const allCacheIds = [...contentCacheIds];
      
// //       // اضافه کردن cacheId تصویر شاخص
// //       if (formData.imageCacheId) {
// //         allCacheIds.push(formData.imageCacheId);
// //       }

// //       // اضافه کردن cacheId تصاویر آپلود شده در ویرایشگر
// //       const editorImageCacheIds = uploadedImages
// //         .filter(img => img.status === 'success' && img.cacheId)
// //         .map(img => img.cacheId);
// //       allCacheIds.push(...editorImageCacheIds);

// //       const submitData = {
// //         title: formData.title,
// //         summary: formData.summary,
// //         content: updatedContent,
// //         categoryId: parseInt(formData.categoryId),
// //         tagsId: tagIds,
// //         isPublished: formData.isPublished,
// //         tempImageCacheIds: allCacheIds.join(',')
// //       };

// //       console.log('📤 ارسال داده:', submitData);

// //       setUploadProgress(80);

// //       const response = await fetch('https://localhost:7178/api/Post/CreatePost', {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify(submitData)
// //       });

// //       setUploadProgress(100);

// //       if (!response.ok) {
// //         let errorMessage = 'خطا در ثبت مقاله';
// //         try {
// //           const errorData = await response.json();
// //           errorMessage = errorData.message || errorMessage;
// //         } catch (e) {}
// //         throw new Error(errorMessage);
// //       }

// //       const result = await response.json();
      
// //       if (result.status === 200 || result.isSuccess) {
// //         setSuccess(true);
// //         setTimeout(() => {
// //           navigate('/blog');
// //         }, 2000);
// //       } else {
// //         throw new Error(result.message || 'خطا در ثبت مقاله');
// //       }
// //     } catch (error) {
// //       console.error('❌ خطا:', error);
// //       setErrors({ submit: error.message || 'مشکل در ارتباط با سرور' });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const renderError = (field) => {
// //     if (errors[field]) {
// //       return <span className="input-error">{errors[field]}</span>;
// //     }
// //     return null;
// //   };

// //   return (
// //     <div className="blog-create-wrapper">
// //       {/* هدر */}
// //       <div className="blog-create-header">
// //         <div className="header-content">
// //           <div className="header-text">
// //             <h1 className="blog-create-title">✍️ ثبت مقاله جدید</h1>
// //             <p className="blog-create-subtitle">مقالات خود را با ویرایشگر حرفه‌ای بنویسید و منتشر کنید</p>
// //           </div>
// //           <button 
// //             className="preview-toggle-btn"
// //             onClick={() => setShowPreview(!showPreview)}
// //           >
// //             {showPreview ? '✏️ ویرایش' : '👁️ پیش‌نمایش'}
// //           </button>
// //         </div>
// //       </div>

// //       {/* فرم */}
// //       <div className="blog-create-form-container">
// //         {success ? (
// //           <div className="success-message">
// //             <FaCheckCircle className="success-icon" />
// //             <h3>🎉 مقاله با موفقیت ثبت شد!</h3>
// //             <p>در حال انتقال به صفحه وبلاگ...</p>
// //           </div>
// //         ) : (
// //           <form onSubmit={handleSubmit} className="blog-create-form">
// //             {/* خطای سرور */}
// //             {errors.submit && (
// //               <div className="submit-error">
// //                 <FaExclamationCircle />
// //                 <span>{errors.submit}</span>
// //               </div>
// //             )}

// //             {/* عنوان */}
// //             <div className="form-group">
// //               <label htmlFor="title" className="form-label">
// //                 عنوان مقاله <span className="required">*</span>
// //               </label>
// //               <input
// //                 type="text"
// //                 id="title"
// //                 name="title"
// //                 value={formData.title}
// //                 onChange={handleChange}
// //                 placeholder="عنوان جذاب برای مقاله خود بنویسید..."
// //                 className={`form-input ${errors.title ? 'error' : ''}`}
// //               />
// //               {renderError('title')}
// //             </div>

// //             {/* خلاصه */}
// //             <div className="form-group">
// //               <label htmlFor="summary" className="form-label">
// //                 خلاصه مقاله <span className="required">*</span>
// //               </label>
// //               <textarea
// //                 id="summary"
// //                 name="summary"
// //                 value={formData.summary}
// //                 onChange={handleChange}
// //                 placeholder="خلاصه‌ای از مقاله را وارد کنید..."
// //                 rows="3"
// //                 className={`form-textarea ${errors.summary ? 'error' : ''}`}
// //               />
// //               {renderError('summary')}
// //             </div>

// //             {/* ویرایشگر متن پیشرفته */}
// //             <div className="form-group">
// //               <label className="form-label">
// //                 متن مقاله <span className="required">*</span>
// //               </label>
// //               <div className={`editor-wrapper ${showPreview ? 'preview-mode' : ''}`}>
// //                 {showPreview ? (
// //                   <div 
// //                     className="preview-content"
// //                     dangerouslySetInnerHTML={{ __html: formData.content }}
// //                   />
// //                 ) : (
// //                   <ReactQuill
// //                     ref={quillRef}
// //                     theme="snow"
// //                     value={formData.content}
// //                     onChange={handleContentChange}
// //                     modules={modules}
// //                     formats={formats}
// //                     placeholder="متن مقاله را بنویسید... برای درج تصویر روی آیکون 🖼️ کلیک کنید"
// //                     className={`blog-editor ${errors.content ? 'error' : ''}`}
// //                   />
// //                 )}
// //               </div>
// //               {renderError('content')}
              
// //               {/* نمایش وضعیت آپلود تصاویر */}
// //               {uploadedImages.length > 0 && (
// //                 <div className="upload-status-container">
// //                   <div className="upload-status-header">
// //                     <FaImage className="upload-status-icon" />
// //                     <span>تصاویر در حال آپلود ({uploadedImages.length})</span>
// //                   </div>
// //                   <div className="upload-status-list">
// //                     {uploadedImages.map((img, index) => (
// //                       <div key={index} className="upload-status-item">
// //                         <div className="upload-file-info">
// //                           <span className="upload-file-name">{img.file.name}</span>
// //                           <span className="upload-file-size">
// //                             {(img.file.size / 1024).toFixed(1)} KB
// //                           </span>
// //                         </div>
// //                         <div className="upload-progress-bar">
// //                           <div 
// //                             className={`upload-progress-fill ${img.status}`}
// //                             style={{ width: `${img.progress}%` }}
// //                           />
// //                         </div>
// //                         <div className="upload-status-actions">
// //                           {img.status === 'uploading' && (
// //                             <span className="upload-status-text uploading">
// //                               {img.progress}%
// //                             </span>
// //                           )}
// //                           {img.status === 'success' && (
// //                             <span className="upload-status-text success">
// //                               <FaCheckCircle /> آپلود شد
// //                             </span>
// //                           )}
// //                           {img.status === 'error' && (
// //                             <span className="upload-status-text error">
// //                               خطا
// //                             </span>
// //                           )}
// //                           {img.status === 'success' && (
// //                             <button
// //                               type="button"
// //                               className="remove-upload-btn"
// //                               onClick={() => removeUploadedImage(img)}
// //                             >
// //                               <FaTrash />
// //                             </button>
// //                           )}
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* دسته‌بندی */}
// //             <div className="form-group">
// //               <label htmlFor="categoryId" className="form-label">
// //                 دسته‌بندی <span className="required">*</span>
// //               </label>
// //               <div className="select-wrapper">
// //                 <FaTag className="select-icon" />
// //                 <select
// //                   id="categoryId"
// //                   name="categoryId"
// //                   value={formData.categoryId}
// //                   onChange={handleChange}
// //                   className={`form-select ${errors.categoryId ? 'error' : ''}`}
// //                 >
// //                   <option value="">انتخاب دسته‌بندی...</option>
// //                   {categories.map(cat => (
// //                     <option key={cat.id} value={cat.id}>{cat.name}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //               {renderError('categoryId')}
// //             </div>

// //             {/* برچسب‌ها */}
// //             <div className="form-group">
// //               <label className="form-label">
// //                 برچسب‌ها <span className="required">*</span>
// //               </label>
              
// //               {loadingTags ? (
// //                 <div className="tags-loading">
// //                   <FaSpinner className="spinner-small" />
// //                   <span>در حال بارگذاری برچسب‌ها...</span>
// //                 </div>
// //               ) : (
// //                 <>
// //                   {tags.length > 0 ? (
// //                     <div className="tags-multiselect">
// //                       {selectedTags.length > 0 && (
// //                         <div className="selected-tags">
// //                           {selectedTags.map(tag => (
// //                             <span key={tag.id} className="selected-tag">
// //                               <span className="tag-name">{tag.name}</span>
// //                               <button 
// //                                 type="button" 
// //                                 className="remove-tag-btn"
// //                                 onClick={() => handleRemoveTag(tag.id)}
// //                               >
// //                                 <FaTimes />
// //                               </button>
// //                             </span>
// //                           ))}
// //                         </div>
// //                       )}

// //                       <div className="tags-list">
// //                         {tags.map(tag => {
// //                           const isSelected = selectedTags.some(t => t.id === tag.id);
// //                           return (
// //                             <button
// //                               key={tag.id}
// //                               type="button"
// //                               className={`tag-item ${isSelected ? 'selected' : ''}`}
// //                               onClick={() => handleTagSelect(tag)}
// //                             >
// //                               <span className="tag-check">{isSelected ? '✓' : '+'}</span>
// //                               <span className="tag-name">{tag.name}</span>
// //                             </button>
// //                           );
// //                         })}
// //                       </div>
// //                     </div>
// //                   ) : (
// //                     <div className="no-tags-message">
// //                       <FaExclamationCircle />
// //                       <span>برای این دسته‌بندی برچسبی تعریف نشده است</span>
// //                     </div>
// //                   )}
// //                 </>
// //               )}
// //               {renderError('tags')}
// //             </div>

// //             {/* آپلود تصویر شاخص - وصل شده به UploadTempImage */}
// //             <div className="form-group">
// //               <label className="form-label">
// //                 تصویر شاخص <span className="required">*</span>
// //               </label>
              
// //               <div className={`image-upload-area ${errors.image ? 'error' : ''}`}>
// //                 {imagePreview ? (
// //                   <div className="image-preview-container">
// //                     <img src={imagePreview} alt="پیش‌نمایش" className="image-preview" />
// //                     {isImageUploading && (
// //                       <div className="image-upload-overlay">
// //                         <div className="upload-spinner"></div>
// //                         <span>{imageUploadProgress}%</span>
// //                       </div>
// //                     )}
// //                     <button 
// //                       type="button" 
// //                       className="remove-image-btn"
// //                       onClick={handleRemoveImage}
// //                       disabled={isImageUploading}
// //                     >
// //                       <FaTimes />
// //                     </button>
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <input
// //                       type="file"
// //                       id="imageInput"
// //                       accept="image/*"
// //                       onChange={handleImageChange}
// //                       className="image-input"
// //                       disabled={isImageUploading}
// //                     />
// //                     <label htmlFor="imageInput" className="image-upload-label">
// //                       {isImageUploading ? (
// //                         <>
// //                           <FaSpinner className="upload-spinner-icon" />
// //                           <span>در حال آپلود... {imageUploadProgress}%</span>
// //                         </>
// //                       ) : (
// //                         <>
// //                           <FaUpload className="upload-icon" />
// //                           <span>برای آپلود تصویر کلیک کنید</span>
// //                           <span className="upload-hint">فرمت‌های مجاز: JPG, PNG, WebP</span>
// //                           <span className="upload-hint">حداکثر حجم: 10 مگابایت</span>
// //                         </>
// //                       )}
// //                     </label>
// //                   </>
// //                 )}
// //               </div>
// //               {renderError('image')}
// //               {isImageUploading && (
// //                 <div className="image-upload-progress">
// //                   <div className="progress-bar">
// //                     <div 
// //                       className="progress-fill" 
// //                       style={{ width: `${imageUploadProgress}%` }}
// //                     />
// //                   </div>
// //                   <span className="progress-text">{imageUploadProgress}%</span>
// //                 </div>
// //               )}
// //             </div>

// //             {/* وضعیت انتشار */}
// //             <div className="form-group">
// //               <label className="form-label">وضعیت انتشار</label>
// //               <div className="publish-toggle">
// //                 <button
// //                   type="button"
// //                   className={`toggle-btn ${formData.isPublished ? 'active' : ''}`}
// //                   onClick={() => setFormData(prev => ({ ...prev, isPublished: true }))}
// //                 >
// //                   <FaEye /> منتشر شده
// //                 </button>
// //                 <button
// //                   type="button"
// //                   className={`toggle-btn ${!formData.isPublished ? 'active' : ''}`}
// //                   onClick={() => setFormData(prev => ({ ...prev, isPublished: false }))}
// //                 >
// //                   <FaEyeSlash /> پیش‌نویس
// //                 </button>
// //               </div>
// //             </div>

// //             {/* دکمه‌ها */}
// //             <div className="form-actions">
// //               <button
// //                 type="button"
// //                 className="cancel-btn"
// //                 onClick={() => navigate('/blog')}
// //               >
// //                 انصراف
// //               </button>
// //               <button
// //                 type="submit"
// //                 className="submit-btn"
// //                 disabled={loading || isUploading || isImageUploading}
// //               >
// //                 {loading ? (
// //                   <>
// //                     <FaSpinner className="spinner" />
// //                     <span>در حال ثبت مقاله...</span>
// //                   </>
// //                 ) : (
// //                   <>
// //                     <FaSave />
// //                     <span>انتشار مقاله</span>
// //                   </>
// //                 )}
// //               </button>
// //             </div>

// //             {/* پیشرفت کلی */}
// //             {(loading || isUploading || isImageUploading) && (
// //               <div className="upload-progress">
// //                 <div className="progress-bar">
// //                   <div 
// //                     className="progress-fill" 
// //                     style={{ width: `${uploadProgress}%` }}
// //                   />
// //                 </div>
// //                 <span className="progress-text">
// //                   {isImageUploading ? 'در حال آپلود تصویر شاخص...' : 
// //                    isUploading ? 'در حال آپلود تصاویر...' : 
// //                    uploadProgress < 20 ? 'آماده‌سازی...' :
// //                    uploadProgress < 60 ? 'آپلود تصاویر محتوا...' :
// //                    uploadProgress < 80 ? 'آماده‌سازی داده‌ها...' :
// //                    'در حال ثبت مقاله...'}
// //                 </span>
// //               </div>
// //             )}
// //           </form>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default BlogCreate;

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

//   // ===== آپلود تصویر با پیشرفت (برای تصویر شاخص و ویرایشگر) =====
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

//   // ===== آپلود تصویر محتوای مقاله (با API مخصوص پست) =====
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

//   // ===== آپلود تصاویر محتوای مقاله (با API مخصوص پست) =====
//   const uploadContentImages = async (htmlContent) => {
//     const temp = document.createElement('div');
//     temp.innerHTML = htmlContent;
//     const images = temp.querySelectorAll('img');
//     const uploadPromises = [];
//     const imageMap = {};
//     const cacheIds = [];

//     images.forEach((img, index) => {
//       const src = img.getAttribute('src');
//       if (src && src.startsWith('data:image')) {
//         const fileName = `content_image_${Date.now()}_${index}.jpg`;
//         const file = base64ToFile(src, fileName);
        
//         // استفاده از uploadImagePost برای تصاویر محتوا
//         const promise = uploadImagePost(file, (progress) => {
//           console.log(`آپلود تصویر محتوا ${index + 1}: ${progress}%`);
//         })
//         .then((cacheId) => {
//           const imageUrl = `https://localhost:7178/api/Post/GetImage/${cacheId}`;
//           imageMap[src] = imageUrl;
//           cacheIds.push(cacheId);
//           return { cacheId, src, imageUrl };
//         }).catch((error) => {
//           console.error(`خطا در آپلود تصویر ${index + 1}:`, error);
//           return null;
//         });
        
//         uploadPromises.push(promise);
//       }
//     });

//     const results = await Promise.all(uploadPromises);
    
//     let updatedContent = htmlContent;
//     results.forEach((result) => {
//       if (result && result.src && result.imageUrl) {
//         updatedContent = updatedContent.replace(result.src, result.imageUrl);
//       }
//     });

//     return { updatedContent, cacheIds };
//   };

//   // ===== هندلر آپلود تصویر در ویرایشگر (با API معمولی) =====
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
//         cacheId: null,
//         url: null
//       };
//       setUploadedImages(prev => [...prev, newImage]);
//       setIsUploading(true);

//       try {
//         // استفاده از uploadImage (API معمولی) برای تصاویر ویرایشگر
//         const cacheId = await uploadImage(file, (progress) => {
//           setUploadedImages(prev => 
//             prev.map(img => 
//               img.file === file ? { ...img, progress } : img
//             )
//           );
//         });
        
//         const imageUrl = `https://localhost:7178/api/Post/GetImage/${cacheId}`;
//         quill.deleteText(range.index, 1);
//         quill.insertEmbed(range.index, 'image', imageUrl);
//         quill.setSelection(range.index + 1);

//         setUploadedImages(prev => 
//           prev.map(img => 
//             img.file === file ? { ...img, cacheId, url: imageUrl, status: 'success', progress: 100 } : img
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
//     if (imageToRemove.cacheId) {
//       await clearTempImage(imageToRemove.cacheId);
//     }
//     setUploadedImages(prev => prev.filter(img => img.file !== imageToRemove.file));
//   };

//   // ===== آپلود تصویر شاخص (با API معمولی) =====
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

//     // آپلود تصویر شاخص با API معمولی
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

//   // ارسال فرم
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
      
//       // آپلود تصاویر موجود در محتوا (با API مخصوص پست)
//       setUploadProgress(20);
//       const { updatedContent, cacheIds: contentCacheIds } = await uploadContentImages(formData.content);
//       setUploadProgress(60);

//       // آماده‌سازی داده‌ها
//       const tagIds = selectedTags.map(tag => tag.id);
      
//       // جمع‌آوری همه cacheId ها
//       const allCacheIds = [...contentCacheIds];
      
//       // اضافه کردن cacheId تصویر شاخص
//       if (formData.imageCacheId) {
//         allCacheIds.push(formData.imageCacheId);
//       }

//       // اضافه کردن cacheId تصاویر آپلود شده در ویرایشگر
//       const editorImageCacheIds = uploadedImages
//         .filter(img => img.status === 'success' && img.cacheId)
//         .map(img => img.cacheId);
//       allCacheIds.push(...editorImageCacheIds);

//       const submitData = {
//         title: formData.title,
//         summary: formData.summary,
//         content: updatedContent,
//         categoryId: parseInt(formData.categoryId),
//         tagsId: tagIds,
//         isPublished: formData.isPublished,
//         tempImageCacheIds: allCacheIds.join(',')
//       };

//       console.log('📤 ارسال داده:', submitData);

//       setUploadProgress(80);

//       const response = await fetch('https://localhost:7178/api/Post/CreatePost', {
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

//             {/* آپلود تصویر شاخص - وصل شده به UploadTempImage */}
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

  // ===== آپلود تصویر با پیشرفت (برای تصویر شاخص و ویرایشگر) =====
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

  // ===== آپلود تصویر محتوای مقاله (با API مخصوص پست) =====
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
            if (result.success && result.cacheId) {
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

  // ===== تبدیل Base64 به File =====
  const base64ToFile = (base64, fileName) => {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  // ===== آپلود تصاویر محتوای مقاله (با API مخصوص پست) =====
  const uploadContentImages = async (htmlContent) => {
    const temp = document.createElement('div');
    temp.innerHTML = htmlContent;
    const images = temp.querySelectorAll('img');
    const uploadPromises = [];
    const imageMap = {};
    const cacheIds = [];

    // حذف alert('post')

    // images.forEach((img, index) => {
    //   const src = img.getAttribute('src');
    //   if (src && src.startsWith('data:image')) {
    //     const fileName = `content_image_${Date.now()}_${index}.jpg`;
    //     const file = base64ToFile(src, fileName);
        
    //     // استفاده از uploadImagePost برای تصاویر محتوا
    //     const promise = uploadImagePost(file, (progress) => {
    //       console.log(`آپلود تصویر محتوا ${index + 1}: ${progress}%`);
    //     })
    //     .then((cacheId) => {
    //       const imageUrl = `https://localhost:7178//Post/${cacheId}`;
    //       imageMap[src] = imageUrl;
    //       cacheIds.push(cacheId);
    //       return { cacheId, src, imageUrl };
    //     }).catch((error) => {
    //       console.error(`خطا در آپلود تصویر ${index + 1}:`, error);
    //       return null;
    //     });
        
    //     uploadPromises.push(promise);
    //   }
    // });

    // اگر تصویری برای آپلود وجود نداشت
    if (uploadPromises.length === 0) {
      return { updatedContent: htmlContent, cacheIds: [] };
    }

    const results = await Promise.all(uploadPromises);
    
    let updatedContent = htmlContent;
    results.forEach((result) => {
      if (result && result.src && result.imageUrl) {
        updatedContent = updatedContent.replace(result.src, result.imageUrl);
      }
    });

    return { updatedContent, cacheIds };
  };

  // ===== هندلر آپلود تصویر در ویرایشگر (با API معمولی) =====
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
        cacheId: null,
        url: null
      };
      setUploadedImages(prev => [...prev, newImage]);
      setIsUploading(true);

      try {
        // استفاده از uploadImage (API معمولی) برای تصاویر ویرایشگر
        const cacheId = await uploadImagePost(file, (progress) => {
          setUploadedImages(prev => 
            prev.map(img => 
              img.file === file ? { ...img, progress } : img
            )
          );
        });
        
        const imageUrl = `https://localhost:7178/Post/${cacheId}`;
        quill.deleteText(range.index, 1);
        quill.insertEmbed(range.index, 'image', imageUrl);
        quill.setSelection(range.index + 1);

        setUploadedImages(prev => 
          prev.map(img => 
            img.file === file ? { ...img, cacheId, url: imageUrl, status: 'success', progress: 100 } : img
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
    if (imageToRemove.cacheId) {
      await clearTempImage(imageToRemove.cacheId);
    }
    setUploadedImages(prev => prev.filter(img => img.file !== imageToRemove.file));
  };

  // ===== آپلود تصویر شاخص (با API معمولی) =====
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

    // آپلود تصویر شاخص با API معمولی
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
      ],
      handlers: {
        image: imageHandler
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
    'width', 'height'
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

  // ارسال فرم
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
      
      // // آپلود تصاویر موجود در محتوا (با API مخصوص پست)
      // // setUploadProgress(20);
      // const { updatedContent, cacheIds: contentCacheIds } = await uploadContentImages(formData.content);
      // // setUploadProgress(60);

          setUploadProgress(20);
    const { updatedContent, cacheIds: contentCacheIds } = await uploadContentImages(formData.content);
    setUploadProgress(60);
      // آماده‌سازی داده‌ها
      const tagIds = selectedTags.map(tag => tag.id);
      
      // جمع‌آوری همه cacheId ها
      const allCacheIds = [...contentCacheIds];
      
      // اضافه کردن cacheId تصویر شاخص
      if (formData.imageCacheId) {
        allCacheIds.push(formData.imageCacheId);
      }

      // اضافه کردن cacheId تصاویر آپلود شده در ویرایشگر
      const editorImageCacheIds = uploadedImages
        .filter(img => img.status === 'success' && img.cacheId)
        .map(img => img.cacheId);
      allCacheIds.push(...editorImageCacheIds);
const generateSlug = (title) => {
    return title
        .trim()
        .toLowerCase()
        // حذف کاراکترهای خاص
        .replace(/[^\w\s\-آ-ی]/g, '')  // اجازه دادن به حروف فارسی
        .replace(/\s+/g, '-')           // فاصله به -
        .replace(/-+/g, '-')            // حذف خط تیره‌های تکراری
        .replace(/^-|-$/g, '');         // حذف خط تیره از اول و آخر
};
      const submitData = {
        id:0,
        slug:generateSlug(formData.title),
        title: formData.title,
        summary: formData.summary,
        content: updatedContent,
        categoryId: parseInt(formData.categoryId),
        tagsId: tagIds,
        isPublished: formData.isPublished,
        tempImageCacheIds: formData.imageCacheId
      };

      // console.log('📤 ارسال داده:', submitData);

      // setUploadProgress(80);
      console.log(submitData)
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
          console.log(errorData.message)
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

            {/* آپلود تصویر شاخص - وصل شده به UploadTempImage */}
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