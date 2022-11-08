const switcher = document.querySelector(".toggle-theme");
const lightIcon = document.querySelector(".moon-icon");
const darkIcon = document.querySelector(".sun-icon");
const clear = document.querySelector(".clear-completed");
const selector = document.querySelector(".selector");
let count = 0;

// Theme switcher. Dark theme by default
switcher.addEventListener("click", switchTheme);

function switchTheme() {
  let darkTheme = document.querySelectorAll(".dark-mode");

  lightIcon.classList.toggle("show-light-icon");
  darkIcon.classList.toggle("hide-dark-icon");

  darkTheme.forEach((el) => {
    el.classList.toggle("light-theme");
  });

  // Toggle bg image

  const bgDark = document.querySelectorAll(".dark-theme-bg");
  const bgLight = document.querySelectorAll(".light-theme-bg");
  bgDark.forEach((items) => {
    items.classList.toggle("bg-light");
  });
}

// TODOS
//If the user have type something and pressed enter, create a new Todo

const input = document.querySelector(".input");
const todoContainer = document.querySelector(".todos-container");
let todos = [];

input.addEventListener("keyup", (e) => {
  if ((e.key == "Enter" || e.keyCode == 13) && input.value.length > 0) {
    newTodo(e.target.value);
    input.value = "";
    activeCount((count += 1));
  }
});

const filterInput = document.getElementById("completed");

function newTodo(value) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("todos");
  newDiv.classList.add("dark-mode");
  newDiv.classList.add("todo-active");

  // If the user is creating a new todo after clicking on completed filter, the newly created todo won't be display (the newly created todo is not completed by default)
  if (filterInput.checked) {
    newDiv.classList.add("todo-hidden");
  }

  // Check if the user is currently using light theme or dark theme. Add the new todo with the correct theme.
  if (selector.classList.contains("light-theme")) {
    newDiv.classList.add("light-theme");
  }

  const newCheckbox = document.createElement("input");
  newCheckbox.setAttribute("type", "checkbox");
  newCheckbox.classList.add("completed");
  newCheckbox.id = "todo-label" + count;
  newDiv.appendChild(newCheckbox);

  const label = document.createElement("label");
  label.htmlFor = "todo-label" + count;
  label.classList.add("label");
  newDiv.appendChild(label);

  const divContent = document.createElement("div");
  divContent.textContent = value;
  divContent.classList.add("content");
  newDiv.appendChild(divContent);

  const crossIcon = new Image(20, 20);
  crossIcon.src = "images/icon-cross.svg";
  crossIcon.classList.add("delete");
  newDiv.appendChild(crossIcon);

  todoContainer.appendChild(newDiv);
}

// Filters.
const checkbox = document.querySelectorAll(".completed");

todoContainer.addEventListener("click", isCompleted);

function isCompleted(event) {
  const target = event.target;

  if (target && target.checked) {
    target.parentElement.classList.add("todo-completed");
    target.parentElement.classList.remove("todo-active");
    activeCount((count -= 1));
  } else if (target && target.checked == false) {
    target.parentElement.classList.remove("todo-completed");
    target.parentElement.classList.add("todo-active");
    activeCount((count += 1));
  }
}

selector.addEventListener("change", filters);

function filters(event) {
  const todos = document.querySelectorAll(".todos");

  if (event.target.id == "active") {
    todos.forEach((todo) => {
      todo.classList.remove("todo-hidden");
      if (todo.classList.contains("todo-completed")) {
        todo.classList.add("todo-hidden");
      }
    });
  } else if (event.target.id == "completed") {
    todos.forEach((todo) => {
      todo.classList.remove("todo-hidden");
      if (todo.classList.contains("todo-active")) {
        todo.classList.add("todo-hidden");
      }
    });
  } else {
    todos.forEach((todo) => {
      todo.classList.remove("todo-hidden");
    });
  }
}

// Deletting todo

todoContainer.addEventListener("click", deleteTodo);

function deleteTodo(event) {
  const target = event.target;

  if (target && target.nodeName == "IMG") {
    target.parentElement.remove();
    activeCount((count -= 1));
  }
}

// Count the number of todos not completed yet
function activeCount(count) {
  const itemsLeft = document.querySelector(".items-left");
  itemsLeft.textContent = `${count} items left`;
}

// Clear all completed todos
clear.addEventListener("click", clearCompleted);

function clearCompleted() {
  const completed = document.querySelectorAll(".todo-completed");

  completed.forEach((items) => {
    items.remove();
  });
}
