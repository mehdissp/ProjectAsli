// // components/todo/ColumnManager.jsx
// import React, { useState } from 'react';
// import { 
//   FiPlus, 
//   FiEdit2, 
//   FiTrash2, 
//   FiX,
//   FiMove,
//   FiSave
// } from 'react-icons/fi';
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from '@dnd-kit/core';
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   useSortable,
//   verticalListSortingStrategy,
// } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import './ColumnManager.css';

// // کامپوننت Sortable Column Item
// const SortableColumnItem = ({ column, onEdit, onDelete, canDelete }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: column.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className={`column-item ${isDragging ? 'dragging' : ''}`}
//     >
//       <div className="column-drag-handle" {...attributes} {...listeners}>
//         <FiMove />
//       </div>

//       <div className="column-info">
//         <div className="column-color" style={{ backgroundColor: column.color }}></div>
//         <div className="column-details">
//           <span className="column-title">{column.title}</span>
//           <span className="column-stats">
//             {column.tasks.length} تسک
//           </span>
//         </div>
//       </div>

//       <div className="column-actions">
//         <button
//           className="btn-icon"
//           onClick={() => onEdit(column.id)}
//           title="ویرایش"
//         >
//           <FiEdit2 />
//         </button>
//         <button
//           className="btn-icon btn-danger"
//           onClick={() => onDelete(column.id)}
//           disabled={!canDelete}
//           title="حذف"
//         >
//           <FiTrash2 />
//         </button>
//       </div>
//     </div>
//   );
// };

// // کامپوننت اصلی ColumnManager
// const ColumnManager = ({ 
//   isOpen, 
//   onClose, 
//   columns, 
//   onAddColumn, 
//   onEditColumn, 
//   onDeleteColumn,
//   onReorderColumns 
// }) => {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editingColumn, setEditingColumn] = useState(null);
//   const [newColumn, setNewColumn] = useState({
//     title: '',
//     color: '#3b82f6'
//   });

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const predefinedColors = [
//     '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
//     '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
//   ];

//   const handleAddColumn = (e) => {
//     e.preventDefault();
//     if (!newColumn.title.trim()) {
//       alert('لطفا عنوان ستون را وارد کنید');
//       return;
//     }

//     onAddColumn({
//       title: newColumn.title,
//       color: newColumn.color
//     });
//     setNewColumn({ title: '', color: '#3b82f6' });
//     setShowAddForm(false);
//   };

//   const handleEditColumn = (columnId) => {
//     const column = columns[columnId];
//     if (column) {
//       setEditingColumn({
//         id: columnId,
//         title: column.title,
//         color: column.color
//       });
//     }
//   };

//   const handleSaveEdit = (e) => {
//     e.preventDefault();
//     if (!editingColumn?.title.trim()) {
//       alert('لطفا عنوان ستون را وارد کنید');
//       return;
//     }

//     onEditColumn(editingColumn.id, {
//       title: editingColumn.title,
//       color: editingColumn.color
//     });
//     setEditingColumn(null);
//   };

//   const handleDeleteColumn = (columnId) => {
//     if (window.confirm(`آیا از حذف ستون "${columns[columnId]?.title}" اطمینان دارید؟`)) {
//       onDeleteColumn(columnId);
//     }
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     if (active.id !== over?.id) {
//       const columnIds = Object.keys(columns);
//       const oldIndex = columnIds.indexOf(active.id);
//       const newIndex = columnIds.indexOf(over.id);

//       if (oldIndex !== -1 && newIndex !== -1) {
//         const newColumnOrder = arrayMove(columnIds, oldIndex, newIndex);
//         onReorderColumns(newColumnOrder);
//       }
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay column-manager-overlay" onClick={onClose}>
//       <div className="modal-content column-manager" onClick={(e) => e.stopPropagation()}>
//         {/* هدر */}
//         <div className="modal-header">
//           <h2>مدیریت ستون‌ها</h2>
//           <button className="close-btn" onClick={onClose}>
//             <FiX />
//           </button>
//         </div>

//         {/* فرم افزودن ستون جدید */}
//         {showAddForm && (
//           <div className="add-column-form">
//             <h3>افزودن ستون جدید</h3>
//             <form onSubmit={handleAddColumn}>
//               <div className="form-group">
//                 <label>عنوان ستون</label>
//                 <input
//                   type="text"
//                   value={newColumn.title}
//                   onChange={(e) => setNewColumn(prev => ({ 
//                     ...prev, 
//                     title: e.target.value 
//                   }))}
//                   placeholder="عنوان ستون را وارد کنید"
//                   autoFocus
//                 />
//               </div>

//               <div className="form-group">
//                 <label>رنگ ستون</label>
//                 <div className="color-picker">
//                   {predefinedColors.map(color => (
//                     <button
//                       key={color}
//                       type="button"
//                       className={`color-option ${newColumn.color === color ? 'selected' : ''}`}
//                       style={{ backgroundColor: color }}
//                       onClick={() => setNewColumn(prev => ({ ...prev, color }))}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="form-actions">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setShowAddForm(false)}
//                 >
//                   انصراف
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={!newColumn.title.trim()}
//                 >
//                   <FiPlus />
//                   افزودن ستون
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* فرم ویرایش ستون */}
//         {editingColumn && (
//           <div className="edit-column-form">
//             <h3>ویرایش ستون</h3>
//             <form onSubmit={handleSaveEdit}>
//               <div className="form-group">
//                 <label>عنوان ستون</label>
//                 <input
//                   type="text"
//                   value={editingColumn.title}
//                   onChange={(e) => setEditingColumn(prev => ({ 
//                     ...prev, 
//                     title: e.target.value 
//                   }))}
//                   placeholder="عنوان ستون را وارد کنید"
//                   autoFocus
//                 />
//               </div>

//               <div className="form-group">
//                 <label>رنگ ستون</label>
//                 <div className="color-picker">
//                   {predefinedColors.map(color => (
//                     <button
//                       key={color}
//                       type="button"
//                       className={`color-option ${editingColumn.color === color ? 'selected' : ''}`}
//                       style={{ backgroundColor: color }}
//                       onClick={() => setEditingColumn(prev => ({ ...prev, color }))}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="form-actions">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setEditingColumn(null)}
//                 >
//                   انصراف
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={!editingColumn.title.trim()}
//                 >
//                   <FiSave />
//                   ذخیره تغییرات
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* لیست ستون‌ها */}
//         <div className="columns-list">
//           <div className="list-header">
//             <h3>ستون‌های موجود ({Object.keys(columns).length})</h3>
//             <button
//               className="btn btn-primary btn-sm"
//               onClick={() => setShowAddForm(true)}
//               disabled={showAddForm || editingColumn}
//             >
//               <FiPlus />
//               افزودن ستون
//             </button>
//           </div>

//           <DndContext
//             sensors={sensors}
//             collisionDetection={closestCenter}
//             onDragEnd={handleDragEnd}
//           >
//             <SortableContext 
//               items={Object.keys(columns)}
//               strategy={verticalListSortingStrategy}
//             >
//               <div className="droppable-area">
//                 {Object.values(columns).map((column) => (
//                   <SortableColumnItem
//                     key={column.id}
//                     column={column}
//                     onEdit={handleEditColumn}
//                     onDelete={handleDeleteColumn}
//                     canDelete={Object.keys(columns).length > 1}
//                   />
//                 ))}
//               </div>
//             </SortableContext>
//           </DndContext>

//           {Object.keys(columns).length === 0 && (
//             <div className="empty-state">
//               <p>هیچ ستونی وجود ندارد</p>
//               <span>ستون اول را ایجاد کنید</span>
//             </div>
//           )}
//         </div>

//         {/* فوتر */}
//         <div className="modal-footer">
//           <button className="btn btn-secondary" onClick={onClose}>
//             بستن
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ColumnManager;

// components/todo/ColumnManager.jsx

import React, { useState } from 'react';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiX,
  FiMove,
  FiSave,
  FiLoader
} from 'react-icons/fi';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './ColumnManager.css';

const SortableColumnItem = ({ column, onEdit, onDelete, canDelete, loading }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
console.log(column)
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`column-item ${isDragging ? 'dragging' : ''}`}
    >
      <div className="column-drag-handle" {...attributes} {...listeners}>
        <FiMove />
      </div>

      <div className="column-info">
        <div className="column-color" style={{ backgroundColor: column.color }}></div>
        <div className="column-details">
          <span className="column-title">{column.title}</span>
          <span className="column-stats">
            {column.tasks.length} تسک
          </span>
        </div>
      </div>

      <div className="column-actions">
        {column.editTodoStatus ?
        <button
          className="btn-icon"
          onClick={() => onEdit(column.id)}
          title="ویرایش"
          disabled={loading}
        >
          <FiEdit2 />
        </button> : ""  
      }
           {column.deletetodoStatus ? 
        <button
          className="btn-icon btn-danger"
          onClick={() => onDelete(column.id)}
          disabled={!canDelete || loading}
          title="حذف"
        >
          <FiTrash2 />
        </button> : ""
            }

      </div>
    </div>
  );
};

const ColumnManager = ({ 
  isOpen, 
  onClose, 
  columns, 
    columnOrder, // این رو اضافه کن
  onAddColumn, 
  onEditColumn, 
  onDeleteColumn,
  onReorderColumns,
  loading = false
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingColumn, setEditingColumn] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [newColumn, setNewColumn] = useState({
    title: '',
    color: '#3b82f6'
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const predefinedColors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
    '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16','yellow'
  ];

  const handleAddColumn = async (e) => {
    e.preventDefault();
    if (!newColumn.title.trim()) {
      alert('لطفا عنوان ستون را وارد کنید');
      return;
    }

    try {
      setFormLoading(true);
      await onAddColumn(newColumn);
      setNewColumn({ title: '', color: '#3b82f6' });
      setShowAddForm(false);
    } catch (error) {
      // خطا در parent handle میشه
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditColumn = (columnId) => {
    const column = columns[columnId];
    if (column) {
      setEditingColumn({
        id: columnId,
        title: column.title,
        color: column.color,
        orderNum:column.orderNum,
       
      });
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingColumn?.title.trim()) {
      alert('لطفا عنوان ستون را وارد کنید');
      return;
    }

    try {
      setFormLoading(true);
      
      await onEditColumn(editingColumn.id, editingColumn);
      setEditingColumn(null);
    } catch (error) {
      // خطا در parent handle میشه
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteColumn = async (columnId) => {
    console.log(columnId)
    console.log(columns[columnId])
    if (window.confirm(`آیا از حذف ستون "${columns[columnId]?.title}" اطمینان دارید؟`)) {
      try {
        setFormLoading(true);
        await onDeleteColumn(columnId);
      } catch (error) {
        // خطا در parent handle میشه
      } finally {
        setFormLoading(false);
      }
    }
  };

const handleDragEnd = (event) => {
  const { active, over } = event;

  if (active.id !== over?.id) {
    const newColumnOrder = arrayMove(columnOrder, columnOrder.indexOf(active.id), columnOrder.indexOf(over.id));
    onReorderColumns(newColumnOrder);
  }
};

  if (!isOpen) return null;

  return (
    <div className="modal-overlay column-manager-overlay" onClick={onClose}>
      <div className="modal-content column-manager" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>مدیریت ستون‌ها</h2>
          <button className="close-btn" onClick={onClose} disabled={formLoading}>
            <FiX />
          </button>
        </div>

        {showAddForm && (
          <div className="add-column-form">
            <h3>افزودن ستون جدید</h3>
            <form onSubmit={handleAddColumn}>
              <div className="form-group">
                <label>عنوان ستون</label>
                <input
                  type="text"
                  value={newColumn.title}
                  onChange={(e) => setNewColumn(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="عنوان ستون را وارد کنید"
                  autoFocus
                  disabled={formLoading}
                />
              </div>

              <div className="form-group">
                <label>رنگ ستون</label>
                <div className="color-picker">
                  {predefinedColors.map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`color-option ${newColumn.color === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewColumn(prev => ({ ...prev, color }))}
                      disabled={formLoading}
                    />
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddForm(false)}
                  disabled={formLoading}
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!newColumn.title.trim() || formLoading}
                >
                  {formLoading ? <FiLoader className="spinning" /> : <FiPlus />}
                  {formLoading ? 'در حال ایجاد...' : 'افزودن ستون'}
                </button>
              </div>
            </form>
          </div>
        )}

        {editingColumn && (
          <div className="edit-column-form">
            <h3>ویرایش ستون</h3>
            <form onSubmit={handleSaveEdit}>
              <div className="form-group">
                <label>عنوان ستون</label>
                <input
                  type="text"
                  value={editingColumn.title}
                  onChange={(e) => setEditingColumn(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="عنوان ستون را وارد کنید"
                  autoFocus
                  disabled={formLoading}
                />
              </div>

              <div className="form-group">
                <label>رنگ ستون</label>
                <div className="color-picker">
                  {predefinedColors.map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`color-option ${editingColumn.color === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setEditingColumn(prev => ({ ...prev, color }))}
                      disabled={formLoading}
                    />
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingColumn(null)}
                  disabled={formLoading}
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!editingColumn.title.trim() || formLoading}
                >
                  {formLoading ? <FiLoader className="spinning" /> : <FiSave />}
                  {formLoading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="columns-list">
          <div className="list-header">
            <h3>ستون‌های موجود ({Object.keys(columns).length})</h3>

{/*    
    <button
              className="btn btn-primary btn-sm"
              onClick={() => setShowAddForm(true)}
              disabled={showAddForm || editingColumn || formLoading}
            >
              <FiPlus />
              افزودن ستون
            </button>   */}

            {Object.values(columns).some(column => column.insertTodoStatus) && (
  <button
    className="btn btn-primary btn-sm"
    onClick={() => setShowAddForm(true)}
    disabled={showAddForm || editingColumn || formLoading}
  >
    <FiPlus />
    افزودن ستون
  </button>
)}
           
         
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              //items={Object.keys(columns)      .sort((a, b) => a.orderNum - b.orderNum)}
            //    items={columnOrder} // استفاده از columnOrder به جای Object.keys(columns)
            //   items={columnOrder || Object.keys(columns)} // fallback اگر columnOrder undefined بود
              items={columnOrder} // استفاده از columnOrder به جای Object.keys(columns)
              
              strategy={verticalListSortingStrategy}
            >
        <div className="droppable-area">
    {columnOrder.map(columnId => {
      const column = columns[columnId];
      if (!column) return null;
      
      return (
        <SortableColumnItem
          key={column.id}
          column={column}
          onEdit={handleEditColumn}
          onDelete={handleDeleteColumn}
         canDelete={(columnOrder || Object.keys(columns)).length > 1} // اینجا هم درست کن
          loading={formLoading}
        />
      );
    })}
  </div>
            </SortableContext>
          </DndContext>

          {Object.keys(columns).length === 0 && (
            <div className="empty-state">
              <p>هیچ ستونی وجود ندارد</p>
              <span>ستون اول را ایجاد کنید</span>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose} disabled={formLoading}>
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnManager;