import ToDo from '../todoList.js';
import { toggleCheckbox, clearCompletedTask } from '../updateList.js';

const todo = new ToDo();

describe('todo list: test all functiona', () => {
  document.body.innerHTML = ` <div class="form-wrapper">
  <form action="#" class="main-form">
    <div class="title-container">
      <h1>Today's To Do</h1>
    </div>
    <div class="input-container">
      <input type="text" name="input-task" id="input-task" placeholder="Add to your list" required>
      <button type="submit" id="add-btn">&#x23CE</button>
    </div>
    <div class="task-wrapper">
      <ul id="task-list">

      </ul>
    </div>
    <div class="button-container">
      <button id="clear-button">
        Clear all completed
      </button>
    </div>
  </form>
  </div>`;

  describe('Add new task', () => {
    test('todo list should add a task per input', () => {
      todo.addTask('Task 1');
      todo.addTask('Task 2');
      todo.addTask('Task 3');
      expect(todo.taskData.length).toBe(3);
    });

    test('localStorage should contain all task data', () => {
      todo.addTask('task 4');
      todo.addTask('task 5');
      const listdata = JSON.parse(localStorage.getItem('taskCollection'));
      expect(listdata.length).toBe(5);
    });

    test('UI should display all task data', () => {
      todo.addTask('Task 6');
      const listdata = JSON.parse(localStorage.getItem('taskCollection'));
      let listItem = document.querySelectorAll('.list-item');
      listItem = listdata;
      expect(listItem).toHaveLength(6);
    });
  });

  describe('Delete one task', () => {
    test('Delete one task from taskData', () => {
      todo.deleteTask((index) => {
        todo.taskData.splice(index, 1);
      });
      expect(todo.taskData.length).toBe(5);
    });

    test('Delete one task from local storage', () => {
      todo.deleteTask((index) => {
        todo.taskData.splice(index, 1);
      });
      const listdata = JSON.parse(localStorage.getItem('taskCollection'));
      expect(listdata.length).toBe(4);
    });

    test('Delete one list item', () => {
      todo.deleteTask((index) => {
        todo.taskData.splice(index, 1);
      });
      const listdata = JSON.parse(localStorage.getItem('taskCollection'));
      let listItem = document.querySelectorAll('.list-item');
      listItem = listdata;
      expect(listItem).toHaveLength(3);
    });
  });

  describe('Checkbox test', () => {
    test('toggle checkbox', () => {
      todo.addTask('task 1');
      todo.addTask('task 2');
      todo.addTask('task 3');
      todo.addTask('task 4');
      toggleCheckbox(0, todo);
      expect(todo.taskData[0].completed).toBeTruthy();
      toggleCheckbox(0, todo);
      expect(todo.taskData[0].completed).toBeFalsy();
      toggleCheckbox(1, todo);
      toggleCheckbox(3, todo);
      expect(todo.taskData[1].completed).toBeTruthy();
      expect(todo.taskData[3].completed).toBeTruthy();
    });
  });
});
