'use strict';

let todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

for (let key in localStorage) {
  if (key === 'todoData') {
    // if (JSON.parse(localStorage.todoData)) {
    todoData = JSON.parse(localStorage[key]);
    // }
  }
}

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  todoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector('.todo-complete');

    btnTodoComplete.addEventListener('click', function () {
      item.completed = !item.completed;
      render();
      addLocalStorageItem();
    })

    const btnTodoDelete = li.querySelector('.todo-remove');

    btnTodoDelete.addEventListener('click', function () {
      todoData.splice(todoData.indexOf(item), 1);
      render();
      addLocalStorageItem();
    });

  });
};

render();

todoControl.addEventListener('submit', function (event) {//для кнопки - submit, не click
  event.preventDefault();

  if (headerInput.value !== '') {
    const newTodo = {
      value: headerInput.value,
      completed: false
    };

    headerInput.value = '';

    todoData.push(newTodo);
    addLocalStorageItem();
    render();
  }

});

// JSON.stringify для преобразования объектов в JSON.
// JSON.parse для преобразования JSON обратно в объект.
function addLocalStorageItem() {
  localStorage.todoData = JSON.stringify(todoData);
}