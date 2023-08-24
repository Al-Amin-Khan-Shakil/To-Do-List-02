import Task from './taskObject.js';
import { taskList } from './variables.js';

export default class ToDo {
  constructor() {
    this.taskData = [];
  }

  addData = (taskValue) => {
    if (taskValue) {
      const newTask = new Task((this.taskData.length + 1), taskValue);
      this.taskData.push(newTask);
    }

    document.getElementById('input-task').value = '';
  }

  setToLocal = () => {
    localStorage.setItem('taskCollection', JSON.stringify(this.taskData));
  };

  getFromLocal = () => {
    const getData = localStorage.getItem('taskCollection');

    if (getData) {
      this.taskData = JSON.parse(getData);
    }
  };

  createTaskList = () => {
    this.getFromLocal();
    taskList.innerHTML = '';
    this.taskData.forEach((task) => {
      const li = document.createElement('li');
      li.classList.add('list-item');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.dataset.index = task.index;
      checkbox.classList.add('checkbox');
      li.appendChild(checkbox);

      const taskText = document.createElement('span');
      taskText.classList.add('task-text');
      taskText.textContent = task.description;
      taskText.dataset.index = task.index;
      li.appendChild(taskText);

      const delBtn = document.createElement('button');
      delBtn.dataset.index = task.index;
      delBtn.classList.add('del-btn');
      li.appendChild(delBtn);

      taskList.appendChild(li);
    });
  };

  addTask = (task) => {
    this.addData(task);
    this.setToLocal();
  }

  updateIndex = () => {
    this.taskData.forEach((task, i) => {
      task.index = i + 1;
    });
  }

  deleteTask = (index) => {
    this.taskData.splice(index, 1);
    this.updateIndex();
    this.setToLocal();
  }
}