import { TbFaceIdError } from "react-icons/tb";
import styles from "./MainPage.module.css";

const ErrorPage = () => {
  return (
    <>
      <main className={styles.mainWrapper}>
        <div className={styles.errorPage}>
          <h1>An error occurred!</h1>
          <TbFaceIdError size={500} />
          <p>Could not find this page!</p>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
