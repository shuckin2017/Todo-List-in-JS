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
  this.task = description;
  this.datecreation = dateCreation;
  this.completed = false;
}

// Set todo list in LocalStorage
const updateStorage = () => localStorage.setItem('todosData', JSON.stringify(todosData));

const addTodo = () => {
  if( addMessage.value == "" ) {
    service.elemShow(popup, 0);
    return;
  }
  createTodo();
};

function createTodo() {
  const todo = createTemplate();
  todos.appendChild(todo);
  addMessage.value = '';
  checkTodo();
}

const createTemplate = (item) => {
  const todo = document.createElement('li'),
        input = document.createElement('input'),
        label = document.createElement('label'),
        btnDelete = document.createElement('button');

  todo.className = 'todo_item';
  input.type = 'checkbox';
  input.value = 'Новая задача';
  label.className = 'todo_mess';
  label.innerHTML = addMessage.value;
  btnDelete.className = 'close del';
  btnDelete.type = 'button';
  btnDelete.innerHTML = '&times';
  btnDelete.addEventListener('click', () => {
    todos.removeChild(todo);
  });
  if (item) {
    label.innerHTML = item;
  }
  todo.appendChild(input);
  todo.appendChild(label);
  todo.appendChild(btnDelete);
  return todo;
};

const getList = () =>{
  todosData.forEach(value => {
    createElement(value.description);
  });
};

const createElement = (item) => {
  const todo = createTemplate(item);
        todos.appendChild(todo);
        checkTodo();
};

getList();

addButton.addEventListener('click', () => {
  todosData.push(new Task(addMessage.value, service.getDateCreation()));
  updateStorage();
  addTodo();
});

loadButton.addEventListener('click', () => loadTodo());
addMessage.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
    todosData.push(new Task(addMessage.value, service.getDateCreation()));
    updateStorage();
    addTodo();
  }
});

closePopup.addEventListener("click", (e) => {
  e.preventDefault();
  service.elemHide(popup, 0);
});

//delete in localStorage
deleteAllButton.addEventListener('click', () => {
  setTimeout(() => {
    localStorage.clear();
    todos.innerHTML = '';
    service.checkTodo(todos.childElementCount);
  }, 1000);
});

//check todo list in task


const loadTodo = () => {
  service.elemShow(spinner, 1000);
  const loadTodo = service.sendTest();
  loadTodo.then((data) => {
    JSON.parse(data).forEach((value) => {
      setTimeout(() => {
        service.elemHide(spinner, 0);
        createElement(Object.values(value)[2]);
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

const fillList = () => {
  todos.innerHTML = '';
  if(todosData.length > 0) {
    
  }
};