import { useSelector } from "react-redux";
import { selectCompletedTodos } from "../../store/selectors";

const TotalCompleteItems = () => {
  const todos = useSelector((state) => state.todos.list);
  const comletedTodos = useSelector(selectCompletedTodos);

  return (
    <div>
      <p>Total todos: {todos.length}</p>
      <p className="mt-3">
        Total complete todos: {comletedTodos.length}/{todos.length}
      </p>
    </div>
  );
};

export default TotalCompleteItems;
