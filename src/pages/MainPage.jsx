import { useSelector } from "react-redux";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList/TodoList";
import Notification from "../components/UI/Notification";
import styles from "./MainPage.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

const MainPage = () => {
  const notification = useSelector((state) => state.ui.notification);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <main className={styles.mainWrapper}>
        <div className={styles.manePage}>
          <h1>My Todo List</h1>
          <AddTodoForm />
          <TodoList />
        </div>
      </main>
    </>
  );
};

export default MainPage;
