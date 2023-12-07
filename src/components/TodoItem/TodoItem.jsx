/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import {
  toddleCompleteTodoAsync,
  deleteCompleteTodoAsync,
  getTodosAsync,
  editTodoAsync,
  setEditedTitle,
} from "../../../store/todo-slice";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { CiFloppyDisk } from "react-icons/ci";
import styles from "./TodoItem.module.css";

// TodoItem component to represent a single todo item
const TodoItem = ({
  id,
  title,
  completed,
  editing,
  onEditClick,
  onSaveClick,
}) => {
  const dispatch = useDispatch();

  // Selector to access the editedTitle from the Redux state
  const editedTitle = useSelector((state) => state.todos.editedTitle);

  // Function to handle the click event for completing a todo
  const handleCompleteClick = () => {
    dispatch(toddleCompleteTodoAsync({ id: id, completed: !completed }));
  };

  // Function to handle the click event for deleting a todo
  const handleDeleteClick = () => {
    dispatch(deleteCompleteTodoAsync({ id: id }));
    dispatch(getTodosAsync());
  };

  // Function to handle the click event for saving an edited todo
  const handleSaveClick = () => {
    dispatch(editTodoAsync({ id: id, title: editedTitle })).then(() => {
      dispatch(getTodosAsync());
    });

    // Invoke the onSaveClick callback passed as a prop
    onSaveClick(id);
  };

  // Function to handle change in the edited title input
  const handleEditChange = (e) => {
    dispatch(setEditedTitle(e.target.value));
  };

  return (
    <li className={completed ? styles.success : ""}>
      <div className={styles.itemWrapper}>
        {editing ? (
          <div className="d-flex align-items-center w-100">
            <input
              type="text"
              className="form-control mr-3"
              value={editedTitle}
              onChange={handleEditChange}
            />
            <button className="btn btn-success ms-2" onClick={handleSaveClick}>
              <CiFloppyDisk />
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center w-100">
            <input
              id="checkbox"
              type="checkbox"
              className="mr-3 me-2"
              checked={completed}
              onChange={handleCompleteClick}
            />
            <p className="me-2">{title}</p>
            <button
              className="btn btn-primary ml-2 ms-auto"
              onClick={() => onEditClick(id, title)}
            >
              <CiEdit />
            </button>
          </div>
        )}
        <button
          className="btn btn-danger ms-2 align-self-center"
          onClick={handleDeleteClick}
        >
          <CiTrash />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
