import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../../store/todo-slice";
import { CiSquarePlus } from "react-icons/ci";

// Functional component for the AddTodoForm
const AddTodoForm = () => {
  // Local state to manage the input value
  const [value, setValue] = useState("");
  // Redux dispatch function
  const dispatch = useDispatch();
  // Function to handle form submission
  const onSubmit = (event) => {
    event.preventDefault();

    if (value) {
      dispatch(
        addTodoAsync({
          title: value,
        })
      );
      // Clear the input field after adding the todo
      setValue("");
    } else {
      // Show an alert if the input value is empty
      alert("Write some task");
    }
  };

  return (
    <form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
      <label className="sr-only">Let`s add todos</label>
      <input
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Add todo..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      ></input>

      <button type="submit" className="btn btn-primary mb-2">
        <CiSquarePlus />
      </button>
    </form>
  );
};

export default AddTodoForm;
