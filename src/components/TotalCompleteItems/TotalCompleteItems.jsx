import { useSelector } from "react-redux";
import { selectCompletedTodos } from "../../../store/selectors";
import styles from "./TotalCompleteItems.module.css";

// Component to display the total number of todos and completed todos
const TotalCompleteItems = () => {
  // Retrieve the entire list of todos from the Redux state
  const todos = useSelector((state) => state.todos.list);
  // Use the selectCompletedTodos selector to get the completed
  const comletedTodos = useSelector(selectCompletedTodos);

  return (
    <div className={styles.completeWrapper}>
      <p>Total todos: {todos.length}</p>
      <p>
        Total complete todos: {comletedTodos.length}/{todos.length}
      </p>
    </div>
  );
};

export default TotalCompleteItems;
