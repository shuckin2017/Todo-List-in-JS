'use strict' 

import service from './service.js';
import templates from './templates.js';

const addMessage = document.querySelector('#newTask'),
      addButton = document.querySelector('#btn_task'),
      todos = document.querySelector('.todo_list'),
      deleteAllButton = document.querySelector('#deleteButton'),
      deleteItemButton = document.querySelector('.del'),
      loadButton = document.querySelector('#loadButton'),
      listEmpty = document.querySelector('.listEmpty'),
      checkbox = document.querySelector('input[type=checkbox]'),
      popup = document.querySelector('.popup'),
      spinner = document.querySelector('.spinner__wrapper'),
      closePopup = document.querySelector('.close');

let todosData;

 if(!localStorage.todosData ) {
    todosData = [];
    checkTodo();
 } else {
  todosData = JSON.parse(localStorage.getItem('todosData'));
 }

function Task(description, dateCreation) {
  this.title = description;
  this.datecreation = dateCreation;
  this.completed = false;
}

// Set todo list in LocalStorage
const updateStorage = () => localStorage.setItem('todosData', JSON.stringify(todosData));

const fillList = () => {
  todos.innerHTML = '';
  if(todosData.length > 0) {
    todosData.forEach((item, index) => {
      createTodo(item);
    });
  }
};

const createTodo = (item) => {
  todos.appendChild(createTemplate(item));
  addMessage.value = '';
  checkTodo();
};

const createTemplate = (item) => {
  const todo = document.createElement('li'),
        input = document.createElement('input'),
        label = document.createElement('label'),
        btnDelete = document.createElement('button');

  todo.className = 'todo_item';
  input.type = 'checkbox';
  input.value = 'Новая задача';
  item.completed ? input.setAttribute('checked', '') : '';
  item.completed ? todo.className = 'todo_item completed' : '';
  label.className = 'todo_mess';
  label.innerHTML = item.title;
  btnDelete.className = 'close del';
  btnDelete.type = 'button';
  btnDelete.innerHTML = '&times';
  btnDelete.addEventListener('click', () => {
    todos.removeChild(todo);
  });
  todo.appendChild(input);
  todo.appendChild(label);
  todo.appendChild(btnDelete);
  return todo;
};

const getList = () => {
  if(addMessage.value) {
    todosData.push(new Task(addMessage.value, service.getDateCreation()));
  }
  updateStorage();
  fillList();
};

getList();

addButton.addEventListener('click', () => getList());
addMessage.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
    getList();
  }
});
loadButton.addEventListener('click', () => loadTodo());

closePopup.addEventListener("click", (e) => {
  e.preventDefault();
  service.elemHide(popup, 0);
});

//delete in localStorage
deleteAllButton.addEventListener('click', () => {
  setTimeout(() => {
    localStorage.clear();
    todos.innerHTML = '';
    checkTodo();
  }, 1000);
});


const loadTodo = () => {
  service.elemShow(spinner, 0);
  const loadTodo = service.sendTest();
  loadTodo.then((data) => {
    JSON.parse(data).forEach((index) => {
      // console.log(index.title);
      setTimeout(() => {
        service.elemHide(spinner, 0);
        createTodo(index);
      }, 3000);
    });
  });
};

/* date creation todos*/

function checkComplated() {
  if(checkbox.checked) {
    console.log('ffff');
  }
}

// checkbox.onclick = function(){
//   if (checkbox.checked) { alert("Чекбокс нажат -вариант №1"); } else { alert("Чекбокс не нажат-вариант №1"); }
//   }

function checkTodo() {
  if(todos.childElementCount) {
    service.elemHide(listEmpty, 0);
    return;
  } 
  service.elemShow(listEmpty, 0);
};
