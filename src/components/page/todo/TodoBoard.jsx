

import React, { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiMoreVertical, 
  FiEdit2, 
  FiTrash2,
  FiClock,
  FiUser,
  FiColumns,
  FiX,
  FiSave,
  FiRefreshCw  ,FiEye ,FiMessageSquare,FiUserCheck   // اضافه کردن آیکون چشم
} from 'react-icons/fi';
import ColumnManager from './ColumnManager';
import UserSearchSelect from './UserSearchSelect'
import { todoStatusService } from '../../../services/todoStatusService';
import { todoService } from '../../../services/todo';
import {commentService} from '../../../services/comment'
import './TodoBoard.css';
//import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import moment from 'moment-jalaali';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_en from "react-date-object/locales/persian_fa"



const TodoBoard = () => {
  const [columns, setColumns] = useState({});
  const [accessCloumn, setAccessCloumn] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  //const [projectId, setProjectId] = useState(1); // یا از props بگیر
  
  const [showColumnManager, setShowColumnManager] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);


  const [editingTask, setEditingTask] = useState(null);
const [showEditModal, setShowEditModal] = useState(false);

const [columnOrder, setColumnOrder] = useState([]); // اضافه کردن state برای ترتیب
  const location = useLocation();


const [selectedTask, setSelectedTask] = useState(null);
const [showTaskDetail, setShowTaskDetail] = useState(false);
const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState('');
const [commentLoading, setCommentLoading] = useState(false);

  
  // دریافت projectId از state
  const projectId = location.state?.projectId;
  const projectName=location.state?.name


    // state‌های جدید برای تگ‌ها
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: '',
      assignee: '', // اینجا ID کاربر ذخیره می‌شود
    tags: []
  });

// تابع تبدیل تاریخ به شمسی
const convertToJalaali = (dateString) => {
  if (!dateString) return 'تعیین نشده';
  
  try {
    // اگر تاریخ انگلیسی هست
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // اگر تاریخ شمسی هست (مثل 1402/10/25)
      if (typeof dateString === 'string' && dateString.includes('/')) {
        return dateString;
      }
      return 'تاریخ نامعتبر';
    }
    
    // تبدیل به شمسی
    return moment(date).format('jYYYY/jMM/jDD');
  } catch (error) {
    console.error('Error converting date:', error);
    return 'تاریخ نامعتبر';
  }
};

  const fetchTags = async () => {
    try {
      setTagsLoading(true);
      // فرض می‌کنیم این تابع در todoStatusService موجود است
      const response = await todoStatusService.getTags(projectId);
      console.log('Tags response:', response);
      setTags(response.data || response || []);
    } catch (error) {
      console.error('Error fetching tags:', error);
      // داده‌های نمونه برای مواقع خطا
      setTags([
        { id: 1, name: 'فوری', color: '#FF6B6B' },
        { id: 2, name: 'مهم', color: '#4ECDC4' },
        { id: 3, name: 'توسعه', color: '#45B7D1' },
        { id: 4, name: 'باگ', color: '#FFA500' },
        { id: 5, name: 'تست', color: '#96CEB4' }
      ]);
    } finally {
      setTagsLoading(false);
    }
  };

  // دریافت ستون‌ها از API
  const fetchColumns = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoStatusService.getTodoStatuses(projectId);

    const order = [];
      // تبدیل response API به فرمت داخلی
      const columnsData = {};
      const accessColumn={};
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",  response.data.columns)
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",  response.data.access)
      response.data.columns.forEach(status => {
        columnsData[status.id] = {
          id: status.id.toString(),
          title: status.title,
          color: status.color,
          orderNum:status.orderNum,
          countComment:status.countComment,
          isOverdute:status.isOverdute,
          tasks: status.tasks,
          deleteButton:status.deleteButton,
          editButton:status.editButton,
          deletetodoStatus:status.deleteTodoStatus,
          editTodoStatus:status.editTodoStatus,
          insertTodoStatus:status.insertTodoStatus,
          viewTodoStatus:status.viewTodoStatus
        };
        console.log("ستون")
       
          console.log(columnsData)
          order.push(status.id.toString());
        console.log( columnsData[status.id]);
      });
      
    //   setColumns(columnsData);
        order.sort((a, b) => columnsData[a].orderNum - columnsData[b].orderNum);
    
    setColumns(columnsData);
    setAccessCloumn(response.data.access)
    console.log("areeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",columns)
     console.log("areeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",accessCloumn)
    setColumnOrder(order);
    } catch (err) {
    //   console.error('Error fetching columns:', err);
    //   setError('خطا در دریافت اطلاعات ستون‌ها');
    //   // داده‌های نمونه برای حالت آفلاین
    //   setColumns(getSampleColumns());
        console.error('Error fetching columns:', err);
    setError('خطا در دریافت اطلاعات ستون‌ها');
    const sampleColumns = getSampleColumns();
    setColumns(sampleColumns);
    setColumnOrder(Object.keys(sampleColumns));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColumns();
    
    fetchTags();
 
  }, [projectId], [showTaskModal]);

  // مدیریت ستون‌ها با API
  const handleAddColumn = async (newColumnData) => {
    try {
      setError(null);
      const todoStatusData = {
        projectId: projectId,
        name: newColumnData.title,
        color: newColumnData.color
      };

      await todoStatusService.createTodoStatus(todoStatusData);

      // رفرش لیست ستون‌ها
      await fetchColumns();
      
    } catch (err) {
      console.error('Error adding column:', err);
      setError('خطا در ایجاد ستون جدید');
      throw err; // برای نمایش خطا در ColumnManager
    }
  };

  const handleEditColumn = async (columnId, updatedColumnData) => {
    try {
      setError(null);
      const todoStatusData = {
        projectId: projectId,
        name: updatedColumnData.title,
        color: updatedColumnData.color,
        orderNum:updatedColumnData.orderNum
      };
      console.log("update")
      console.log(todoStatusData)
      await todoStatusService.updateTodoStatus(columnId, todoStatusData);
      
      // آپدیت local state
      setColumns(prev => ({
        ...prev,
        [columnId]: {
          ...prev[columnId],
          title: updatedColumnData.title,
          color: updatedColumnData.color
        }
      }));
      
    } catch (err) {
      console.error('Error updating column:', err);
      setError('خطا در ویرایش ستون');
      throw err;
    }
  };
  //******************************************** */
// مدیریت انتخاب تگ‌ها
const handleTagSelect = (tagId) => {
  setSelectedTags(prev => {
    if (prev.includes(tagId)) {
      // حذف تگ اگر قبلاً انتخاب شده
      return prev.filter(id => id !== tagId);
    } else {
      // اضافه کردن تگ
      return [...prev, tagId];
    }
  });
};

// مدیریت حذف تگ انتخاب شده
const handleRemoveTag = (tagId, e) => {
  e.stopPropagation();
  setSelectedTags(prev => prev.filter(id => id !== tagId));
};

// بستن مودال و ریست تگ‌ها
const handleCloseTaskModal = () => {
  setShowTaskModal(false);
  setSelectedTags([]);
  setShowTagDropdown(false);
};
const handleCloseEditModal = () => {
  setShowEditModal(false);
  setEditingTask(null);
  setSelectedTags([]);
  setShowTagDropdown(false);
};
// مدیریت ایجاد تسک با تگ‌ها
// مدیریت آپدیت تسک
const handleUpdateTask = async (e) => {
  e.preventDefault();
  if (!editingTask.title.trim()) {
    alert('لطفا عنوان تسک را وارد کنید');
    return;
  }

  try {
    // تبدیل داده‌ها به فرمت API
    const priorityMap = {
      'low': 0,
      'medium': 1,
      'high': 2
    };

    const todoTagsDtos = selectedTags.map(tagId => {
      const tag = tags.find(t => t.id === tagId);
      return { id: tag.id, name: tag.name };
    });

    const updateData = {
      id:editingTask.id,
      title: editingTask.title,
      description: editingTask.description,
      statusId: parseInt(editingTask.statusId),
      priority: priorityMap[editingTask.priority] || 1,
         isArchive: editingTask.isArchive || false, // اضافه کردن isArchive
  dueDate: editingTask.dueDate ? moment(editingTask.dueDate).format('jYYYY/jMM/jDD') : null,
      todoTagsDtos: todoTagsDtos,
      userId: editingTask.assignee || null
    };

    console.log('📤 Updating todo:', updateData);

    // فراخوانی API
    await todoService.updateTodo( updateData);

    // رفرش داده‌ها
    await fetchColumns();

    // بستن مودال
    setShowEditModal(false);
    setEditingTask(null);
    setSelectedTags([]);

    // نمایش پیام موفقیت
    setSuccess('تسک با موفقیت ویرایش شد');
    setTimeout(() => setSuccess(''), 3000);

  } catch (error) {
    console.error('❌ Error updating task:', error);
    setError(error.response?.data?.data.message || 'خطا در ویرایش تسک');
  }
};
// مدیریت کلیک روی ویرایش تسک
// const handleEditTaskClick = async (taskId, columnId) => {
//   try {
//     // دریافت اطلاعات تسک از API
//     const response = await todoStatusService.getTodoById(taskId);
//     const task = response.data || response;
    
//     // تبدیل priority به فرمت داخلی
//     const priorityMap = {
//       0: 'low',
//       1: 'medium', 
//       2: 'high'
//     };
    
//     // پر کردن فرم ویرایش
//     setEditingTask({
//       id: task.id,
//       title: task.title,
//       description: task.description,
//       priority: priorityMap[task.priority] || 'medium',
//       assignee: task.assigneeId || '',
//       dueDate: task.dueDate ? new Date(task.dueDate).toLocaleDateString('fa-IR') : '',
//       statusId: task.statusId.toString(),
//       tags: task.tags || []
//     });
    
//     setSelectedTags(task.tags.map(tag => tag.id));
//     setShowEditModal(true);
    
//   } catch (error) {
//     console.error('❌ Error fetching task for edit:', error);
//     setError('خطا در دریافت اطلاعات تسک');
//   }
// };

const handleEditTaskClick = (taskId, columnId) => {
  try {
    // پیدا کردن تسک در تمام ستون‌ها (اگر ممکنه ستون عوض شده باشه)
    let task = null;
    let foundColumnId = columnId;

    // اول در ستون فعلی جستجو کن
    task = columns[columnId]?.tasks.find(t => t.id.toString() === taskId.toString());
    
    // اگر پیدا نشد، در تمام ستون‌ها جستجو کن
    if (!task) {
      for (const [colId, column] of Object.entries(columns)) {
        task = column.tasks.find(t => t.id.toString() === taskId.toString());
        if (task) {
          foundColumnId = colId;
          break;
        }
      }
    }

    if (!task) {
      throw new Error('تسک مورد نظر یافت نشد');
    }

    console.log('📝 Editing task:', task.userIdTodo );

    // پر کردن فرم
    setEditingTask({
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      assignee: task.userIdTodo || task.userIdTodo || '',
      dueDate: task.dueDate,
      statusId: foundColumnId, // ستونی که تسک توش پیدا شد
      tags: task.tags || [],
         isArchive: task.isArchive || false // اضافه کردن isArchive
    });

    setSelectedTags(task.tags.map(tag => tag.id));
    setShowEditModal(true);

  } catch (error) {
    console.error('❌ Error in edit task:', error);
    setError(error.message || 'خطا در ویرایش تسک');
  }
};

// مدیریت ایجاد تسک با تگ‌ها

const handleCreateTask = async (e) => {
  e.preventDefault();
  if (!newTask.title.trim()) {

    alert('لطفا عنوان تسک را وارد کنید');
    return;
  }

  try {
    // تبدیل selectedTags به فرمت مورد نیاز API
    const todoTagsDtos = selectedTags.map(tagId => {
      const tag = tags.find(t => t.id === tagId);
      return tag ? {
        id: tag.id,
        name: tag.name
      } : null;
    }).filter(Boolean);

    // تبدیل priority به عدد
    const getPriorityNumber = (priority) => {
      switch (priority) {
        case 'low': return 0;
        case 'medium': return 1;
        case 'high': return 2;
        default: return 1;
      }
    };

    // آماده‌سازی داده برای API
    const todoData = {
      title: newTask.title,
      description: newTask.description || '',
      statusId: parseInt(selectedColumn),
      priority: getPriorityNumber(newTask.priority),
      // dueDate: newTask.dueDate || new Date().toLocaleDateString('fa-IR'),
          dueDate: newTask.dueDate ? newTask.dueDate.format('YYYY/MM/DD') : null,
      todoTagsDtos: todoTagsDtos,
      userId: newTask.assignee || null // اضافه کردن assigneeId
    };

    // اگر assignee خالی است، فیلد رو حذف کن (بستگی به API داره)
    if (!newTask.assignee) {
      delete todoData.assigneeId;
    }

    console.log('📤 Sending to API:', todoData);

    // فراخوانی API
    await todoService.createTodo(todoData);
        toast.success('عملیات با موفقیت انجام شد', {
      position: "top-left",
      autoClose: 5000,
    });
    setTimeout(() => setSuccess(''), 3000);


    // رفرش داده‌ها
    await fetchColumns();

    // بستن مودال و ریست فرم
    handleCloseTaskModal();
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      tags: []
    });
    setSelectedTags([]);

    // نمایش پیام موفقیت
   


  } catch (error) {
    console.error('❌ Error creating todo:', error);
    setError(error.response?.data?.message || 'خطا در ایجاد تسک');
  }
};
  //********************************************* */

  const handleDeleteColumn = async (columnId) => {
    try {
      setError(null);
      
      if (Object.keys(columns).length <= 1) {
        throw new Error('حداقل یک ستون باید وجود داشته باشد');
      }

      await todoStatusService.deleteTodoStatus(columnId);
      
      // رفرش لیست ستون‌ها
      await fetchColumns();
      
    } catch (err) {
      console.log("aslan nemiyad")
      console.error('Error deleting column:', err);
    toast.error(err.response.data.data.message, {
      position: "top-left",
      autoClose: 5000,
     className: 'custom-error-toast',
  bodyClassName: 'custom-error-toast-body'
    });

    //  setError(err.response.data.data.message || 'خطا در حذف ستون');
      throw err;
    }
  };

    // تابع تغییر تاریخ
  const handleDateChange = (value) => {
    console.log("tarikh",value)
    setNewTask(prev => ({ 
      ...prev, 
      dueDate: value 
    }));
  };

// مدیریت کلیک روی تسک
const handleTaskClick = async (taskId, columnId) => {
  try {
    // پیدا کردن تسک از state
    const task = columns[columnId]?.tasks.find(t => t.id.toString() === taskId.toString());
    
    if (!task) {
      throw new Error('تسک مورد نظر یافت نشد');
    }

    console.log('📋 Opening task details:', task);

    // تنظیم تسک انتخاب شده
    setSelectedTask({
      ...task,
      columnId: columnId
    });

    // دریافت کامنت‌های تسک
    setCommentLoading(true);
    const commentsResponse = await commentService.getTaskComments(taskId);
    const updateSeenCommenResponse = await commentService.updateSeenComment(taskId);
    console.log("annnnnnnnnnnn",commentsResponse.data)
    //seenAt
    setComments(commentsResponse.data || commentsResponse || []);
    
    setShowTaskDetail(true);

  } catch (error) {
    console.error('❌ Error opening task details:', error);
    setError('خطا در بارگذاری جزئیات تسک');
  } finally {
    setCommentLoading(false);
  }
};
const handleCloseTaskDetail = () => {
  setShowTaskDetail(false);
  setSelectedTask(null);
  setComments([]);
  setNewComment('');
};
// مدیریت افزودن کامنت جدید
const handleAddComment = async (e) => {
  e.preventDefault();
  if (!newComment.trim()) {
    alert('لطفا متن کامنت را وارد کنید');
    return;
  }

  try {
    setCommentLoading(true);
    
    const commentData = {
      message: newComment,
      todoId:selectedTask.id
      // اگر نیاز به authorId دارید از user context استفاده کنید
    };

    await commentService.createComment( commentData);
    
    // رفرش کامنت‌ها
    const commentsResponse = await commentService.getTaskComments(selectedTask.id);

    setComments(commentsResponse.data || commentsResponse || []);
    
    // پاک کردن فیلد کامنت
    setNewComment('');
    
    setSuccess('کامنت با موفقیت افزوده شد');
    
  } catch (error) {
    console.error('❌ Error adding comment:', error);
    setError('خطا در افزودن کامنت');
  } finally {
    setCommentLoading(false);
  }
};



  const handleReorderColumns = (newColumnOrder) => {
      setColumnOrder(newColumnOrder);
    // اگر API برای مرتب سازی داریم، اینجا call می‌کنیم
     console.log(" اگر API برای مرتب سازی داریم، اینجا call می‌کنیم")
    console.log(newColumnOrder)
    const reorderedColumns = {};
    newColumnOrder.forEach(columnId => {
      if (columns[columnId]) {
        reorderedColumns[columnId] = columns[columnId];
      }
    });
  const updatedColumns = { ...columns };
  newColumnOrder.forEach((columnId, index) => {
    if (updatedColumns[columnId]) {
      updatedColumns[columnId] = {
        ...updatedColumns[columnId],
        orderNum: index + 1
      };
    }
  });
  
  setColumns(updatedColumns);
    //   setColumnOrder(newColumnOrder);
  };

  // مدیریت تسک‌ها
  const handleAddTaskClick = (columnId) => {
    setSelectedColumn(columnId);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      tags: []
    });
    setShowTaskModal(true);
  };

 
  const handleDragStart = (e, taskId, columnId) => {
    console.log("draggggggggggggggggggg")
        console.log(taskId)
              console.log(columnId)
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('fromColumn', columnId);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  // const handleDrop =   (e, toColumnId) => {
  //   // console.log("miyad dargg",toColumnId)
  //   e.preventDefault();
  //   e.currentTarget.classList.remove('drag-over');
    
  //   const taskId = e.dataTransfer.getData('taskId');
  //   const fromColumnId = e.dataTransfer.getData('fromColumn');
  //   //  console.log("miyad dargg",fromColumnId)
  //   if (fromColumnId === toColumnId) return;

  //   setColumns(prev =>  {
  //     const fromColumn = prev[fromColumnId];
  //     const toColumn = prev[toColumnId];
      
  //     if (!fromColumn || !toColumn) return prev;
  //         console.log("miyad dargg",taskId,toColumnId)
  //     const task = fromColumn.tasks.find(t => t.id.toString() === taskId);

  //         await todoService.createTodo(todoData);
  //        console.log("miyad dargg",fromColumn.tasks)
         

  //     if (!task) return prev;

  //     return {
  //       ...prev,
  //       [fromColumnId]: {
  //         ...fromColumn,
  //         tasks: fromColumn.tasks.filter(t => t.id.toString()  !== taskId)
  //       },
  //       [toColumnId]: {
  //         ...toColumn,
  //         tasks: [...toColumn.tasks, task]
  //       }
  //     };
  //   });
  // };

// تابع برای تعیین کلاس بر اساس مقدار isOverdue
const getOverdueClass = (overdueValue) => {
  switch(overdueValue) {
    case 1:
      return 'overdue-red';    // قرمز
    case 2:
      return 'overdue-yellow'; // زرد
    case 3:
      return 'overdue-green';  // سبز
    default:
      return '';               // هیچ کلاسی برای 0 یا سایر مقادیر
  }
};

  const handleDrop = async (e, toColumnId) => {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  
  const taskId = e.dataTransfer.getData('taskId');
  const fromColumnId = e.dataTransfer.getData('fromColumn');
  
  if (fromColumnId === toColumnId) return;

  try {
    // اول API رو call کن
    const todoData = {
      id:parseInt(taskId),
      statusId: parseInt(toColumnId),
      // سایر فیلدهای لازم
    };
    await todoService.updateStatusTodo(todoData); // یا createTodo بسته به منطق شما
    
    // سپس state رو آپدیت کن
    setColumns(prev => {
      const fromColumn = prev[fromColumnId];
      const toColumn = prev[toColumnId];
      
      if (!fromColumn || !toColumn) return prev;
      
      const task = fromColumn.tasks.find(t => t.id.toString() === taskId);
      if (!task) return prev;

      return {
        ...prev,
        [fromColumnId]: {
          ...fromColumn,
          tasks: fromColumn.tasks.filter(t => t.id.toString() !== taskId)
        },
        [toColumnId]: {
          ...toColumn,
          tasks: [...toColumn.tasks, task]
        }
      };
    });
    
  } catch (error) {
    console.error('❌ Error updating task status:', error);
    setError('خطا در به‌روزرسانی وضعیت تسک');
  }
};
  const handleDeleteTask = async (columnId, taskId) => {
    if (window.confirm('آیا از حذف این تسک اطمینان دارید؟')) {
      try{
await  todoService.deleteTodo(taskId);
    toast.success('عملیات با موفقیت انجام شد', {
      position: "top-left",
      autoClose: 5000,
    });

        setColumns(prev => ({
        ...prev,
        [columnId]: {
          ...prev[columnId],
          tasks: prev[columnId].tasks.filter(t => t.id !== taskId)
        }
      }));
      }
         catch (error) {
              console.error('❌ nemiad:');
    console.error('❌ Error creating todo:', error.response.data.data.message);
     setError(error.response?.data?.data?.message || 'خطا در ایجاد تسک');
  }

    }
  };

  const handleClosePopuComment= () => {
    setShowTaskDetail(false)  
    fetchColumns();

  }


    const handleDeleteComment = async (id) => {
    if (window.confirm('آیا از حذف این کامنت اطمینان دارید؟')) {
      try{
await  commentService.deletecomment(id);
const commentsResponse = await commentService.getTaskComments(selectedTask.id);
    setComments(commentsResponse.data || commentsResponse || []);

      }
         catch (error) {
              console.error('❌ nemiad:');
    console.error('❌ Error creating todo:', error.response.data.data.message);
     setError(error.response?.data?.data?.message || 'خطا در ایجاد تسک');
  }

    }
  };
  const handleAssigneeChange = (userId) => {
  setNewTask(prev => ({ ...prev, assignee: userId }));
};

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>در حال دریافت اطلاعات...</p>
      </div>
    );
  }

  return (
    <div className="todo-board">

      {/* هدر */}
      <div className="board-header">
        <div className="header-content">
          <h1>   وظایف   {projectName}</h1>
          <p>مدیریت و پیگیری وظایف تیم</p>
        </div>
        <div className="header-actions">
          {error && (
            <div className="error-banner">
              {error}
              <button onClick={() => setError(null)} className="btn-close-error">×</button>
            </div>
          )}
                    <ToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={true}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
            {success && (
    <div className="success-banner">
      {success}
      <button onClick={() => setSuccess('')} className="btn-close-success">×</button>
    </div>
  )}
          <button 
            className="btn btn-secondary"
            onClick={fetchColumns}
            disabled={loading}
          >
            <FiRefreshCw className={loading ? 'spinning' : ''} />
            بروزرسانی
          </button>
            {/* {(columns[0].viewTodoStatus==true) ?  */}
      <button 
            className="btn btn-secondary"
            onClick={() => setShowColumnManager(true)}
          >
            <FiColumns />
            مدیریت ستون‌ها ({Object.keys(columns).length})
          </button>
            {/* } */}
    
        </div>
      </div>

      {/* برد Kanban */}
      <div className="kanban-board">
        {Object.values(columns)
          .sort((a, b) => a.orderNum - b.orderNum)
        .map(column => (
          <div
            key={column.id}
            className="kanban-column"
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* هدر ستون */}
            <div className="column-header" style={{ borderColor: column.color }}>
              <div className="column-title">
                <span 
                  className="column-color-dot" 
                  style={{ backgroundColor: column.color }}
                ></span>
                <h3>{column.title}</h3>
                <span className="task-count">{column.tasks.length}</span>
              </div>
              <div className="column-actions">
                <button 
                  className="btn-add-task"
                  onClick={() => handleAddTaskClick(column.id)}
                  title="افزودن تسک"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* لیست تسک‌ها */}
            <div className="task-list">
              {column.tasks.map(task => (
                <div
                  key={task.id}
                //  className={`task-card ${task.isOverdute ? 'flagged' : ''}`}
             className={`task-card ${task.isOverdute === 1 ? 'overdue-red' : ''} ${task.isOverdute === 2 ? 'overdue-yellow' : ''} ${task.isOverdute === 3 ? 'overdue-green' : ''}`}

                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, column.id)}

                >
                  <div className="task-header">
                    <div className="task-priority">
                      <div className={`priority-dot ${getPriorityClass(task.priority)}`}></div>
                      <span className="priority-text">
                        {task.priority === 'high' ? 'بالا' : 
                         task.priority === 'medium' ? 'متوسط' : 'پایین'}
                      </span>
                          {/* آیکون وضعیت overdue */}

                    </div>
                    <div className="task-actions">
                        {/* دکمه مشاهده جزئیات */}
  <button 
    className="btn-icon btn-view"
    onClick={(e) => {
      e.stopPropagation();
      handleTaskClick(task.id, column.id);
    }}
    title="مشاهده جزئیات"
  >
    <FiEye />

  
  </button>
    {(task.editButton==true) ?                         <button 
    className="btn-icon btn-edit"
    onClick={() => handleEditTaskClick(task.id, column.id)}
    title="ویرایش تسک"
  >
    <FiEdit2 />
  </button>  : ''}

  {(task.deleteButton==true) ?      <button 
                        className="btn-icon btn-delete"
                        onClick={() => handleDeleteTask(column.id, task.id)}
                        title="حذف تسک"
                      >
                        <FiTrash2 />
                      </button> :''}

                 
                    </div>
                  </div>

                  <div className="task-content">
                    <h4 className="task-title">{task.title}</h4>
                    <p className="task-description">{task.description}</p>
                  </div>

                  {/* <div className="task-tags">
                    {task.tags.map((tag, index) => (
                      <span key={index} className="task-tag">
                        {tag}
                    
                      </span>
                    ))}

                    
                  </div> */}
                  <div className="task-tags">
  {task.tags.map((tag, index) => (
    <span 
      key={tag.id || index} 
      className="task-tag"
      style={{ 
        backgroundColor: `${tag.color}`, 
        // borderColor: tag.color,
        // color: tag.color
      }}
    >
      <span 
        className="tag-color-dot"
        style={{ backgroundColor: tag.color }}
      ></span>
      {tag.name} {/* ✅ اینجا باید tag.name باشد نه tag */}
    </span>
  ))}
</div>

                  <div className="task-footer">
                    <div className="task-assignee">
                      <FiUser />
                      <span>{task.assignee}</span>
                    </div>
                    <div className="task-due-date">
                      <FiClock />
                       <span>{convertToJalaali(task.dueDate)}</span>
                    </div>

                    <div className="task-due-date">
                      <FiMessageSquare />
                       <span>{task.countComment}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {column.tasks.length === 0 && (
              <div className="empty-column">
                <p>تسکی وجود ندارد</p>
                <span>برای افزودن تسک جدید کلیک کنید</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* مودال مدیریت ستون‌ها */}
      <ColumnManager
        isOpen={showColumnManager}
        onClose={() => setShowColumnManager(false)}
        columns={columns}
        access={accessCloumn}
          columnOrder={columnOrder} // اضافه کردن
        onAddColumn={handleAddColumn}
        onEditColumn={handleEditColumn}
        onDeleteColumn={handleDeleteColumn}
        onReorderColumns={handleReorderColumns}
        loading={loading}
      />
{/* مودال ویرایش تسک */}
{showEditModal && (
  <div className="modal-overlay task-modal-overlay" onClick={() => setShowEditModal(false)}>
    <div className="modal-content task-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>ویرایش تسک</h2>
        <button className="close-btn" onClick={() => setShowEditModal(false)}>
          <FiX />
        </button>
      </div>

      <form onSubmit={handleUpdateTask}>
        <div className="form-group">
          <label>عنوان تسک *</label>
          <input
            type="text"
            value={editingTask?.title || ''}
            onChange={(e) => setEditingTask(prev => ({ ...prev, title: e.target.value }))}
            placeholder="عنوان تسک را وارد کنید"
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>توضیحات</label>
          <textarea
            value={editingTask?.description || ''}
            onChange={(e) => setEditingTask(prev => ({ ...prev, description: e.target.value }))}
            placeholder="توضیحات تسک"
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>اولویت</label>
            <select
              value={editingTask?.priority || 'medium'}
              onChange={(e) => setEditingTask(prev => ({ ...prev, priority: e.target.value }))}
            >
              <option value="low">پایین</option>
              <option value="medium">متوسط</option>
              <option value="high">بالا</option>
            </select>
          </div>

          <div className="form-group">
            <label>ستون</label>
            <select
              value={editingTask?.statusId || ''}
              onChange={(e) => setEditingTask(prev => ({ ...prev, statusId: e.target.value }))}
            >
              {Object.values(columns).sort((a, b) => a.orderNum - b.orderNum).map(column => (
                <option key={column.id} value={column.id}>
                  {column.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>مسئول</label>
            <UserSearchSelect
              value={editingTask?.assignee || ''}
              onChange={(userId) => setEditingTask(prev => ({ ...prev, assignee: userId }))}
              placeholder="انتخاب مسئول"
            />
          </div>
<div className="form-group">
  <label>تاریخ انجام</label>
  <input
    type="text"
    value={moment(editingTask.dueDate || '').format('jYYYY/jMM/jDD')}
    onChange={(e) => {
      const persianDate = e.target.value;
      // تبدیل مستقیم به میلادی
      const momentObj = moment(persianDate, 'jYYYY/jMM/jDD');
      if (momentObj.isValid()) {
        setEditingTask(prev => ({ 
          ...prev, 
          dueDate: momentObj.toDate()  // تاریخ میلادی
        }));
      }
    }}
    placeholder="مثال: 1402/10/25"
  />
</div>
        </div>
      {/* چک‌باکس isArchive */}
{/* چک‌باکس isArchive با ایکون */}
<div className="form-group checkbox-group">
  <label className="checkbox-label with-icon">
    <input
      type="checkbox"
      checked={editingTask?.isArchive || false}
      onChange={(e) => setEditingTask(prev => ({ 
        ...prev, 
        isArchive: e.target.checked 
      }))}
      className="checkbox-input"
    />
    <span className="checkmark"></span>
    <span className="checkbox-text">
      آرشیو کردن تسک
    </span>
  </label>
  <small className="checkbox-help">
    ✓ در صورت انتخاب، این تسک به بخش آرشیو منتقل شده و در لیست اصلی نمایش داده نمی‌شود
  </small>
</div>
        {/* مولتی سلکت تگ‌ها */}
        <div className="form-group">
          <label>تگ‌ها</label>
          <div className="tags-selector">
            <div 
              className="tags-input"
              onClick={() => setShowTagDropdown(!showTagDropdown)}
            >
              <div className="selected-tags">
                {selectedTags.map(tagId => {
                  const tag = tags.find(t => t.id === tagId);
                  return tag ? (
                    <span 
                      key={tag.id}
                      className="selected-tag"
                      style={{ backgroundColor: tag.color + '20', borderColor: tag.color }}
                      onClick={(e) => handleRemoveTag(tag.id, e)}
                    >
                      <span 
                        className="tag-color-dot"
                        style={{ backgroundColor: tag.color }}
                      ></span>
                      {tag.name}
                      <span className="remove-tag">×</span>
                    </span>
                  ) : null;
                })}
                {selectedTags.length === 0 && (
                  <span className="placeholder">تگ‌ها را انتخاب کنید...</span>
                )}
              </div>
              <span className="dropdown-arrow">▼</span>
            </div>

            {showTagDropdown && (
              <div className="tags-dropdown">
                {tagsLoading ? (
                  <div className="tags-loading">در حال دریافت تگ‌ها...</div>
                ) : (
                  tags.map(tag => (
                    <div
                      key={tag.id}
                      className={`tag-option ${selectedTags.includes(tag.id) ? 'selected' : ''}`}
                      onClick={() => handleTagSelect(tag.id)}
                    >
                      <span 
                        className="tag-color-dot"
                        style={{ backgroundColor: tag.color }}
                      ></span>
                      <span className="tag-name">{tag.name}</span>
                      {selectedTags.includes(tag.id) && (
                        <span className="check-mark">✓</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setShowEditModal(false);
              setEditingTask(null);
              setSelectedTags([]);
            }}
          >
            انصراف
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            <FiSave />
            ذخیره تغییرات
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{/* مودال جزئیات تسک */}
{showTaskDetail && selectedTask && (
  <div className="modal-overlay task-detail-overlay" onClick={() => handleClosePopuComment()}>
    <div className="modal-content task-detail-modal" onClick={(e) => e.stopPropagation()}>
      {/* هدر مودال */}
      <div className="task-detail-header">
        <div className="task-detail-title">
          <h2>{selectedTask.title}</h2>
          <div className="task-meta">
            <span className="task-id">#{selectedTask.id}</span>
            <span 
              className="task-status"
              style={{ color: columns[selectedTask.columnId]?.color }}
            >
              {columns[selectedTask.columnId]?.title}
            </span>
          </div>
        </div>
        <button 
          className="close-btn"
          onClick={() => handleClosePopuComment()}
        >
          <FiX />
        </button>
      </div>

      {/* بدنه مودال */}
      <div className="task-detail-body">
        {/* سایدبار اطلاعات تسک */}
        <div className="task-sidebar">
          <div className="sidebar-section">
            <h4>اطلاعات تسک</h4>
            <div className="info-item">
              <strong>اولویت:</strong>
              <span className={`priority-badge ${selectedTask.priority}`}>
                {selectedTask.priority === 'high' ? 'بالا' : 
                 selectedTask.priority === 'medium' ? 'متوسط' : 'پایین'}
              </span>
            </div>
            <div className="info-item">
              <strong>مسئول:</strong>
              <span>{selectedTask.assignee || 'تعیین نشده'}</span>
            </div>
            <div className="info-item">
              <strong>تاریخ انجام:</strong>
        
{convertToJalaali(selectedTask.dueDate)}
                                  
            </div>
            <div className="info-item">
              <strong>ایجاد شده توسط:</strong>
              <span>{selectedTask.userNameCreator || 'نامشخص'}</span>
            </div>
          </div>

          {/* تگ‌ها */}
          {selectedTask.tags && selectedTask.tags.length > 0 && (
            <div className="sidebar-section">
              <h4>تگ‌ها</h4>
              <div className="task-tags">
                {selectedTask.tags.map((tag, index) => (
                  <span 
                    key={tag.id || index}
                    className="task-tag"
                    style={{ 
                      backgroundColor: `${tag.color}`, 
                      // borderColor: tag.color,
                      // color: tag.color
                    }}
                  >
                    <span 
                      className="tag-color-dot"
                      style={{ backgroundColor: tag.color }}
                    ></span>
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* محتوای اصلی */}
        <div className="task-main-content">
          {/* توضیحات تسک */}
          <div className="description-section">
            <h4>توضیحات</h4>
            <div className="description-content">
              {selectedTask.description || 'توضیحاتی برای این تسک وارد نشده است.'}
            </div>
          </div>

          {/* بخش کامنت‌ها */}
          <div className="comments-section">
            <h4>کامنت‌ها ({comments.length})</h4>
            
            {/* لیست کامنت‌ها */}
            <div className="comments-list">
              {commentLoading ? (
                <div className="loading">در حال بارگذاری کامنت‌ها...</div>
              ) : comments.length > 0 ? (
                comments.map(comment => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-header">
                      <div className="comment-author">
                        <strong>{comment.userAuthor || 'کاربر'}</strong>
                      </div>
                      
                      {  (comment.showDeleted==true) ?
                         <button 
                        className="btn-icon btn-delete"
                        onClick={() => handleDeleteComment(comment.id)}
                        title="حذف تسک"
                      >
                        <FiTrash2 />
                      </button> : ''

  }
        
                      <div className="comment-date">
                      {comment.createdAt ? new Date(comment.createdAt).toLocaleString('fa-IR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
}) : ''}
 
                      </div>
             

        
                    </div>
                    <div className="comment-content">
                      {comment.message}
 
                    </div>
<div className="comment-date" style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}>
    {comment.seenAt ? (
        <>
            <FiUserCheck style={{ color: 'green' }} />
            <span>
                {new Date(comment.seenAt).toLocaleString('fa-IR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </span>
        </>
    ) : (
        comment.showDeleted  && (
            <>
                <FiUser style={{ color: '#999' }} />
                <span style={{ color: '#999' }}>
                    دیده نشده
                </span>
            </>
        )
    )}
</div>
                  </div>
                ))
              ) : (
                <div className="no-comments">هنوز کامنتی وجود ندارد.</div>
              )}
            </div>

            {/* فرم افزودن کامنت جدید */}
            <form onSubmit={handleAddComment} className="comment-form">
              <div className="form-group">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="کامنت خود را اینجا بنویسید..."
                  rows="4"
                  disabled={commentLoading}
                />
              </div>
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={commentLoading || !newComment.trim()}
                >
                  {commentLoading ? 'در حال ارسال...' : 'ارسال کامنت'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
      {/* مودال ایجاد تسک جدید */}
      {/* {showTaskModal && (
        <div className="modal-overlay task-modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div className="modal-content task-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>ایجاد تسک جدید</h2>
              <button className="close-btn" onClick={() => setShowTaskModal(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleCreateTask}>
              <div className="form-group">
                <label>عنوان تسک *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="عنوان تسک را وارد کنید"
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>توضیحات</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="توضیحات تسک"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>اولویت</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                  >
                    <option value="low">پایین</option>
                    <option value="medium">متوسط</option>
                    <option value="high">بالا</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>مسئول</label>
                  <input
                    type="text"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                    placeholder="نام مسئول"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>تاریخ انجام</label>
                <input
                  type="text"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                  placeholder="مثال: 1402/10/25"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowTaskModal(false)}
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <FiSave />
                  ایجاد تسک
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}

      {showTaskModal && (
  <div className="modal-overlay task-modal-overlay" onClick={handleCloseTaskModal}>
    <div className="modal-content task-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>ایجاد تسک جدید</h2>
        <button className="close-btn" onClick={handleCloseTaskModal}>
          <FiX />
        </button>
      </div>

      <form onSubmit={handleCreateTask}>
        <div className="form-group">
          <label>عنوان تسک *</label>
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
            placeholder="عنوان تسک را وارد کنید"
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>توضیحات</label>
          <textarea
            value={newTask.description}
            onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
            placeholder="توضیحات تسک"
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>اولویت</label>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
            >
              <option value="low">پایین</option>
              <option value="medium">متوسط</option>
              <option value="high">بالا</option>
            </select>
          </div>

 <div className="form-group">
  <label>مسئول</label>
  <UserSearchSelect
    value={newTask.assignee}
    onChange={handleAssigneeChange}
    placeholder="انتخاب مسئول"
  />
</div>
        </div>

        <div className="form-group">
          <label>تاریخ انجام</label>
          {/* <input
            type="text"
            value={newTask.dueDate}
            onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
            placeholder="مثال: 1402/10/25"
          /> */}
         <DatePicker
        value={newTask.dueDate}
        
            onChange={handleDateChange} // بدون e.target.value
        calendar={persian}
        locale={persian_en}
        calendarPosition="bottom-right"
        timePicker={false}
        isGregorian={false} // برای استفاده از تاریخ شمسی
      />
      
      {/* برای نمایش مقدار انتخاب شده (اختیاری) */}
      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        تاریخ انتخاب شده: {newTask.dueDate ? newTask.dueDate.format('YYYY/MM/DD') : 'انتخاب نشده'}
      </div>
        </div>

        {/* مولتی سلکت تگ‌ها */}
        <div className="form-group">
          <label>تگ‌ها</label>
          <div className="tags-selector">
            <div 
              className="tags-input"
              onClick={() => setShowTagDropdown(!showTagDropdown)}
            >
              <div className="selected-tags">
                {selectedTags.map(tagId => {
                  const tag = tags.find(t => t.id === tagId);
                  return tag ? (
                    <span 
                      key={tag.id}
                      className="selected-tag"
                      style={{ backgroundColor: tag.color + '20', borderColor: tag.color }}
                      onClick={(e) => handleRemoveTag(tag.id, e)}
                    >
                      <span 
                        className="tag-color-dot"
                        style={{ backgroundColor: tag.color }}
                      ></span>
                      {tag.name}
                      <span className="remove-tag">×</span>
                    </span>
                  ) : null;
                })}
                {selectedTags.length === 0 && (
                  <span className="placeholder">تگ‌ها را انتخاب کنید...</span>
                )}
              </div>
              <span className="dropdown-arrow">▼</span>
            </div>

            {showTagDropdown && (
              <div className="tags-dropdown">
                {tagsLoading ? (
                  <div className="tags-loading">در حال دریافت تگ‌ها...</div>
                ) : (
                  tags.map(tag => (
                    <div
                      key={tag.id}
                      className={`tag-option ${selectedTags.includes(tag.id) ? 'selected' : ''}`}
                      onClick={() => handleTagSelect(tag.id)}
                    >
                      <span 
                        className="tag-color-dot"
                        style={{ backgroundColor: tag.color }}
                      ></span>
                      <span className="tag-name">{tag.name}</span>
                      {selectedTags.includes(tag.id) && (
                        <span className="check-mark">✓</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCloseTaskModal}
          >
            انصراف
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            <FiSave />
            ایجاد تسک
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

// داده‌های نمونه برای زمانی که API در دسترس نیست
const getSampleColumns = () => ({
  '1': {
    id: '1',
    title: 'در انتظار',
    color: '#94a3b8',
    tasks: []
  },
  '2': {
    id: '2',
    title: 'در حال انجام',
    color: '#f59e0b',
    tasks: []
  },
  '3': {
    id: '3',
    title: 'انجام شده',
    color: '#10b981',
    tasks: []
  }
});

export default TodoBoard;