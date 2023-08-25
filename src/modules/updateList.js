export const toggleCheckbox = (index, todoInstance) => { // Accept todoInstance as a parameter
  todoInstance.taskData[index].completed = !todoInstance.taskData[index].completed;
  todoInstance.setToLocal();
};

export const clearCompletedTask = (taskData) => taskData.filter((task) => !task.completed);

export const textDecoration = (taskData) => {
  const textElement = document.querySelectorAll('.task-text');
  textElement.forEach((text) => {
    const index = parseInt(text.dataset.index, 10) - 1;
    if (taskData[index].completed) {
      text.style.textDecoration = 'line-through';
    } else {
      text.style.textDecoration = 'none';
    }
  });
};

export const updateContent = (index, content, todoInstance) => {
  todoInstance.taskData[index].description = content;
  todoInstance.setToLocal();
};