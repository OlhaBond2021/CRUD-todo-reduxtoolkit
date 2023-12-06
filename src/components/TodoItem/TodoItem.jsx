/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import {
  toddleCompleteTodoAsync,
  deleteCompleteTodoAsync,
  getTodosAsync,
  editTodoAsync,
  setEditedTitle,
} from "../../../store/todo-slice";
import styles from "./TodoItem.module.css";

const TodoItem = ({
  id,
  title,
  completed,
  editing,
  onEditClick,
  onSaveClick,
}) => {
  const dispatch = useDispatch();
  const editedTitle = useSelector((state) => state.todos.editedTitle);

  const handleCompleteClick = () => {
    dispatch(toddleCompleteTodoAsync({ id: id, completed: !completed }));
  };

  const handleDeleteClick = () => {
    dispatch(deleteCompleteTodoAsync({ id: id }));
    dispatch(getTodosAsync());
  };

  const handleSaveClick = () => {
    dispatch(editTodoAsync({ id: id, title: editedTitle })).then(() => {
      dispatch(getTodosAsync());
    });
    onSaveClick(id);
  };

  const handleEditChange = (e) => {
    dispatch(setEditedTitle(e.target.value));
  };

  return (
    <li className={completed ? styles.success : ""}>
      <div className={styles.itemWrapper}>
        {editing ? (
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="form-control mr-3"
              value={editedTitle}
              onChange={handleEditChange}
            />
            <button className="btn btn-success" onClick={handleSaveClick}>
              Save
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              className="mr-3"
              checked={completed}
              onChange={handleCompleteClick}
            />
            {title}
            <button
              className="btn btn-primary ml-2"
              onClick={() => onEditClick(id, title)}
            >
              Edit
            </button>
          </div>
        )}
        <button className="btn btn-danger" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
