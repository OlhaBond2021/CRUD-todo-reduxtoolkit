const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const { json } = require("body-parser");
const { nanoid } = require("nanoid");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(json());

let todos = [
  {
    id: nanoid(),
    title: "todo 1",
    completed: true,
  },
  {
    id: nanoid(),
    title: "todo 2",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 3",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 4",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 5",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 6",
    completed: true,
  },
  {
    id: nanoid(),
    title: "todo 7",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 8",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 9",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 10",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 11",
    completed: true,
  },
  {
    id: nanoid(),
    title: "todo 12",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 13",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 14",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 15",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 16",
    completed: true,
  },
  {
    id: nanoid(),
    title: "todo 17",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 18",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 19",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 20",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 21",
    completed: true,
  },
  {
    id: nanoid(),
    title: "todo 22",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 23",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 24",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 25",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 26",
    completed: true,
  },
  {
    id: nanoid(),
    title: "todo 27",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 28",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 29",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 30",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 1",
    completed: true,
  },
  {
    id: nanoid(),
    title: "todo 2",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 3",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 4",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 5",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 6",
    completed: true,
  },
  {
    id: nanoid(),
    title: "todo 7",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 8",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 9",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 10",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 11",
    completed: true,
  },
  {
    id: nanoid(),
    title: "todo 12",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 13",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 14",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 15",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 16",
    completed: true,
  },
  {
    id: nanoid(),
    title: "todo 17",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 18",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 19",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 20",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 21",
    completed: true,
  },
  {
    id: nanoid(),
    title: "todo 22",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 23",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 24",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 25",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 26",
    completed: true,
  },
  {
    id: nanoid(),
    title: "todo 27",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 28",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 29",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 30",
    completed: false,
  },
];

app.get("/todos", (req, res) => res.send(todos));

app.post("/todos", (req, res) => {
  const todo = { title: req.body.title, id: nanoid(), completed: false };
  todos.push(todo);
  return res.send(todo);
});

app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  const completed = Boolean(req.body.completed);
  if (index > -1) {
    todos[index].completed = completed;
  }
  return res.send(todos[index]);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos.splice(index, 1);
  }

  res.send(todos);
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const newTitle = req.body.title;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos[index].title = newTitle;
  }
  return res.send(todos[index]);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
