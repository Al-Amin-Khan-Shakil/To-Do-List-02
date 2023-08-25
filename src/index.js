import './style.css';
import ToDo from './modules/todoList.js';
import { taskList, inputTask, clearButton } from './modules/variables.js';
import { toggleCheckbox, clearCompletedTask, textDecoration } from './modules/updateList.js';

const addButton = document.getElementById('add-btn');
const todo = new ToDo();

addButton.addEventListener('click', () => {
  const inputValue = inputTask.value.trim();
  todo.addTask(inputValue);
  todo.createTaskList();
});

taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('del-btn')) {
    const index = parseInt(event.target.dataset.index, 10) - 1;
    todo.deleteTask(index);
    todo.createTaskList();
  }
});

taskList.addEventListener('change', (e) => {
  if (e.target.classList.contains('checkbox')) {
    const index = parseInt(e.target.dataset.index, 10) - 1;
    toggleCheckbox(index, todo);
    todo.createTaskList();
    textDecoration(todo.taskData);
  }
});

clearButton.addEventListener('click', () => {
  todo.taskData = clearCompletedTask(todo.taskData);
  todo.updateIndex();
  todo.setToLocal();
  todo.createTaskList();
});

taskList.addEventListener('dblclick', (e) => {
  if (e.target.classList.contains('task-text')) {
    if (!e.target.isContentEditable) {
      e.target.contentEditable = true;
      e.target.focus();
    }
  }
});

taskList.addEventListener('focusout', (e) => {
  if (e.target.classList.contains('task-text')) {
    const index = parseInt(e.target.dataset.index, 10) - 1;
    todo.taskData[index].description = e.target.textContent.trim();
    todo.setToLocal();
    e.target.blur();
    e.target.contentEditable = false;
  }
});

window.addEventListener('load', () => {
  todo.createTaskList();
  textDecoration(todo.taskData);
});