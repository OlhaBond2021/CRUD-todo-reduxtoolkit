import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

// Async thunk to fetch todos from a server
export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:7000/todos");

      if (response.ok) {
        const todos = await response.json();
        dispatch(
          uiActions.showNotification({
            message: "Fetched todos successfully",
            status: "success",
          })
        );
        return { todos };
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({ message: error.message, status: "error" })
      );
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to add a new todo to the server
export const addTodoAsync = createAsyncThunk(
  "todos/addTodosAsync",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:7000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: payload.title,
        }),
      });

      if (response.ok) {
        const todo = await response.json();
        dispatch(
          uiActions.showNotification({
            message: "Added todos successfully",
            status: "success",
          })
        );
        return { todo };
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({ message: error.message, status: "error" })
      );
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to toggle completed todo on the server
export const toddleCompleteTodoAsync = createAsyncThunk(
  "todos/completeTodoAsync",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:7000/todos/${payload.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: payload.completed,
          }),
        }
      );

      if (response.ok) {
        const todo = await response.json();
        dispatch(
          uiActions.showNotification({
            message: "Completed/uncompleted todo successfully",
            status: "success",
          })
        );
        return { id: todo.id, completed: todo.completed };
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({ message: error.message, status: "error" })
      );
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete todo from the server
export const deleteCompleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:7000/todos/${payload.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: payload.id,
          }),
        }
      );

      if (response.ok) {
        const todo = await response.json();
        dispatch(
          uiActions.showNotification({
            message: "Deleted todo successfully",
            status: "success",
          })
        );
        return { id: todo.id };
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({ message: error.message, status: "error" })
      );
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to adit todo on the server
export const editTodoAsync = createAsyncThunk(
  "todos/editTodoAsync",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:7000/todos/${payload.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: payload.title,
          }),
        }
      );

      if (response.ok) {
        const todo = await response.json();
        dispatch(
          uiActions.showNotification({
            message: "Edited todo successfully",
            status: "success",
          })
        );
        return { id: todo.id, title: todo.title };
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({ message: error.message, status: "error" })
      );
      return rejectWithValue(error.message);
    }
  }
);

// Define the slice for managing todos
const todoSlice = createSlice({
  name: "todos",
  initialState: { list: [], editedTitle: "" },
  reducers: {
    addTodo(state, action) {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.list.push(newTodo);
    },

    setEditedTitle(state, action) {
      state.editedTitle = action.payload;
    },

    aditTodo(state, action) {
      const index = state.list.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.list[index].title = action.payload.title;
    },

    replaceTodo(state, action) {
      state.editedTitle = action.payload.title;
    },

    toggleComplete(state, action) {
      const index = state.list.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.list[index].completed = action.payload.completed;
    },

    deleteTodo(state, action) {
      state.list = state.list.filter((todo) => todo.id !== action.payload.id);
    },
  },

  extraReducers: (builder) => {
    // Handle fulfilled actions from async thunks
    builder.addCase(getTodosAsync.fulfilled, (state, action) => {
      console.log("fetched data successfully");
      state.list = action.payload.todos;
    });

    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      console.log("added data successfully");
      state.list.push(action.payload.todo);
    });

    builder.addCase(toddleCompleteTodoAsync.fulfilled, (state, action) => {
      console.log("toddle 'Complete' successfully");
      const index = state.list.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.list[index].completed = action.payload.completed;
    });

    builder.addCase(deleteCompleteTodoAsync.fulfilled, (state, action) => {
      console.log("delete data successfully");
      state.list = state.list.filter((todo) => todo.id !== action.payload.id);
    });

    builder.addCase(editTodoAsync.fulfilled, (state, action) => {
      const { id, title } = action.payload;
      const existingTodo = state.list.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.title = title;
      }
    });
  },
});

// Export action creators and reducer from the todoSlice
export const { addTodo, setEditedTitle, toggleComplete, deleteTodo } =
  todoSlice.actions;

export default todoSlice;
