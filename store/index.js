// Import the configureStore function from the Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Import the todoSlice and uiSlice reducers
import todoSlice from "./todo-slice";
import uiSlice from "./ui-slice";

// Create a Redux store using configureStore
const store = configureStore({
  // Combine the todoSlice and uiSlice reducers into the root reducer
  reducer: {
    todos: todoSlice.reducer, // Reducer for managing todo items
    ui: uiSlice.reducer, // Reducer for managing UI state
  },
});

// Export the created Redux store
export default store;
