import { useSelector } from "react-redux";
import TodoList from "../components/TodoList/TodoList";
import Notification from "../components/UI/Notification";
import styles from "./MainPage.module.css";

const NextPage = () => {
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
        <TodoList />
      </main>
    </>
  );
};

export default NextPage;
