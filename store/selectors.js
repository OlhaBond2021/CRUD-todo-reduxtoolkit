import { createSelector } from "reselect";

const selectTodos = (state) => state.todos.list;

export const selectCompletedTodos = createSelector([selectTodos], (todos) =>
  todos.filter((todo) => todo.completed === true)
);
