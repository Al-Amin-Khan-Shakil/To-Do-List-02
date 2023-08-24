import './style.css';
import ToDo from './modules/todoList.js';
import { taskList, inputTask } from './modules/variables.js';

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

window.addEventListener('load', todo.createTaskList);