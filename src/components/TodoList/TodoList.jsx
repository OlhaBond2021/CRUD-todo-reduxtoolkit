import { useEffect, useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import { useSelector, useDispatch } from "react-redux";
import {
  getTodosAsync,
  setEditedTitle,
  editTodoAsync,
} from "../../../store/todo-slice";
import MainNavigation from "../MainNavigation/MainNavigation";
import styles from "./TodoList.module.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.list);
  const editedTitle = useSelector((state) => state.todos.editedTitle);
  const [editingId, setEditingId] = useState(null);
  const [todosPerPage, setTodosPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleEditClick = (id, title) => {
    setEditingId(id);
    dispatch(setEditedTitle(title));
  };

  const handleSaveClick = (id) => {
    dispatch(editTodoAsync({ id: id, title: editedTitle }));
    setEditingId(null);
    dispatch(getTodosAsync());
  };

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const totalPages = Math.ceil(todos.length / todosPerPage);
  const pages = [...Array(totalPages + 1).keys()].slice(1);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

  const visibleTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const prevPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

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
