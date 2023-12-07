/* eslint-disable react/prop-types */
import classes from "./Notification.module.css";

// Notification component that displays a status, title, and message
const Notification = ({ status, title, message }) => {
  let specialClasses = "";
  // Apply "error" class for error status
  if (status === "error") {
    specialClasses = classes.error;
  }
  // Apply "success" class for success status
  if (status === "success") {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};

export default Notification;
