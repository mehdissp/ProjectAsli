

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
  FiRefreshCw
} from 'react-icons/fi';
import ColumnManager from './ColumnManager';
import UserSearchSelect from './UserSearchSelect'
import { todoStatusService } from '../../../services/todoStatusService';
import { todoService } from '../../../services/todo';
import './TodoBoard.css';
//import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import moment from 'moment-jalaali';




const TodoBoard = () => {
  const [columns, setColumns] = useState({});
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
      const response = await todoStatusService.getTags();
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
    
      response.data.columns.forEach(status => {
        columnsData[status.id] = {
          id: status.id.toString(),
          title: status.title,
          color: status.color,
          orderNum:status.orderNum,
          tasks: status.tasks
        };
        console.log("ستون")
          console.log(columnsData)
          order.push(status.id.toString());
        console.log( columnsData[status.id]);
      });
      
    //   setColumns(columnsData);
        order.sort((a, b) => columnsData[a].orderNum - columnsData[b].orderNum);
    
    setColumns(columnsData);
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
      title: editingTask.title,
      description: editingTask.description,
      statusId: parseInt(editingTask.statusId),
      priority: priorityMap[editingTask.priority] || 1,
      dueDate: editingTask.dueDate,
      todoTagsDtos: todoTagsDtos,
      assigneeId: editingTask.assignee || null
    };

    console.log('📤 Updating todo:', updateData);

    // فراخوانی API
    //await todoStatusService.updateTodo(editingTask.id, updateData);

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
    setError(error.response?.data?.message || 'خطا در ویرایش تسک');
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
      tags: task.tags || []
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
      dueDate: newTask.dueDate || new Date().toLocaleDateString('fa-IR'),
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
    setSuccess('تسک با موفقیت ایجاد شد');
    setTimeout(() => setSuccess(''), 3000);

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
      console.error('Error deleting column:', err);
      setError(err.message || 'خطا در حذف ستون');
      throw err;
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
          <button 
            className="btn btn-secondary"
            onClick={() => setShowColumnManager(true)}
          >
            <FiColumns />
            مدیریت ستون‌ها ({Object.keys(columns).length})
          </button>
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
                  className="task-card"
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
                    </div>
                    <div className="task-actions">
                        <button 
    className="btn-icon btn-edit"
    onClick={() => handleEditTaskClick(task.id, column.id)}
    title="ویرایش تسک"
  >
    <FiEdit2 />
  </button>
                      <button 
                        className="btn-icon btn-delete"
                        onClick={() => handleDeleteTask(column.id, task.id)}
                        title="حذف تسک"
                      >
                        <FiTrash2 />
                      </button>
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
              value={editingTask?.dueDate || ''}
              onChange={(e) => setEditingTask(prev => ({ ...prev, dueDate: e.target.value }))}
              placeholder="مثال: 1402/10/25"
            />
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
          <input
            type="text"
            value={newTask.dueDate}
            onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
            placeholder="مثال: 1402/10/25"
          />
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