// Import createSelector from reselect library
import { createSelector } from "reselect";

// Selector function to get the list of todos from the state
const selectTodos = (state) => state.todos.list;

// Selector using reselect to filter completed todos
export const selectCompletedTodos = createSelector(
  // Input selector(s)
  [selectTodos],
  // Output selector function, receives the result of the input selectors
  (todos) => todos.filter((todo) => todo.completed === true)
);
