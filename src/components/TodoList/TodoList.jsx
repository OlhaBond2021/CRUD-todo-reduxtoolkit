import { useEffect, useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import { useSelector, useDispatch } from "react-redux";
import {
  getTodosAsync,
  setEditedTitle,
  editTodoAsync,
} from "../../../store/todo-slice";
import MainNavigation from "../MainNavigation/MainNavigation";
import TotalCompleteItems from "../TotalCompleteItems/TotalCompleteItems";
import styles from "./TodoList.module.css";

// TodoList component to display a list of todos
const TodoList = () => {
  const dispatch = useDispatch();

  // Selectors to access todos and editedTitle from the Redux state
  const todos = useSelector((state) => state.todos.list);
  const editedTitle = useSelector((state) => state.todos.editedTitle);

  // Local state to manage editing functionality
  const [editingId, setEditingId] = useState(null);

  // Local state to manage pagination
  const [todosPerPage, setTodosPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle the click event for editing a todo
  const handleEditClick = (id, title) => {
    setEditingId(id);
    dispatch(setEditedTitle(title));
  };

  // Function to handle the click event for saving an edited todo
  const handleSaveClick = (id) => {
    dispatch(editTodoAsync({ id: id, title: editedTitle }));
    setEditingId(null);
    dispatch(getTodosAsync());
  };

  // Fetch todos from the server on component mount
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  // Calculate total number of pages for pagination
  const totalPages = Math.ceil(todos.length / todosPerPage);
  const pages = [...Array(totalPages + 1).keys()].slice(1);

  // Calculate the range of todos to display on the current page
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const visibleTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Function to handle clicking the previous page button
  const prevPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  // Function to handle clicking the next page button
  const nextPageHandler = () => {
    if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div>
        <select
          className={styles.selectBox}
          onClick={(event) => setTodosPerPage(event.target.value)}
        >
          <option className={styles.option} value="5">
            5
          </option>
          <option className={styles.option} value="10">
            10
          </option>
          <option className={styles.option} value="20">
            20
          </option>
          <option className={styles.option} value="50">
            50
          </option>
        </select>
      </div>
      <TotalCompleteItems />
      <ul className={styles.list}>
        {visibleTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            editing={todo.id === editingId}
            onEditClick={handleEditClick}
            onSaveClick={handleSaveClick}
          />
        ))}
      </ul>
      <MainNavigation
        pages={pages}
        totalPages={totalPages}
        currentPage={currentPage}
        prevPageHandler={prevPageHandler}
        setCurrentPage={setCurrentPage}
        nextPageHandler={nextPageHandler}
      />
    </>
  );
};

export default TodoList;
