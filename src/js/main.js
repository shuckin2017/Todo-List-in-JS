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
      lengthActive = document.querySelector('.todo-info__item--active'),
      lengthСompleted = document.querySelector('.todo-info__item--copmleted'),
      lengthAll = document.querySelector('.todo-info__item--all'),
      closePopup = document.querySelector('.close');

let todosData,
    todoItemElem = [];

 if(!localStorage.todosData ) {
    todosData = [];
    checkTodo();
 } else {
  todosData = JSON.parse(localStorage.getItem('todosData'));
 }

function Task(description, dateCreation) {
  this.id = todosData.length+1;
  this.title = description;
  this.datecreation = dateCreation;
  this.completed = false;
}

// Set todo list in LocalStorage
const updateStorage = () => localStorage.setItem('todosData', JSON.stringify(todosData));

const filterTasks = () => {
  const activeTask = todosData.length && todosData.filter(item => item.completed == false) ;
  const completedTask = todosData.length && todosData.filter(item => item.completed == true);
  lengthActive.innerHTML = activeTask.length;
  lengthСompleted.innerHTML = completedTask.length;
  todosData = [...activeTask, ...completedTask];
  lengthAll.innerHTML = todosData.length;
};

const fillList = () => {
  todos.innerHTML = '';
  if(todosData.length > 0) {
    filterTasks();
    todosData.forEach((item, index) => {
      createTodo(item, index);
    });
    todoItemElem = document.querySelectorAll('.todo_item');
    
  }
};

const createTodo = (item, index) => {
  todos.appendChild(createTemplate(item, index));
  addMessage.value = '';
  checkTodo();
};

const createTemplate = (item, index) => {
  const todo = document.createElement('li'),
        input = document.createElement('input'),
        label = document.createElement('label'),
        btnDelete = document.createElement('button');

  todo.className = 'todo_item';
  input.addEventListener('click', () => {
    completedTask(index);
    if(input.checked) {
      todo.className = 'todo_item completed';
    }
  });
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
    todoItemElem[index].classList.add('deletedItem');
    setTimeout(() => {
      removeTask(index);
    }, 900);
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
  checkTodo();
  updateStorage();
  fillList();
};

const completedTask = (index) => {
  todosData[index].completed = !todosData[index].completed;
  todosData[index].completed ? todoItemElem[index].classList.add('completed') : todoItemElem[index].classList.remove('completed');
  updateStorage();
  fillList();
};

const removeTask = (index) => {
  todosData.splice(index, 1);
  updateStorage();
  fillList();
  checkTodo();
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
      setTimeout(() => {
        service.elemHide(spinner, 0);
        createTodo(index);
      }, 3000);
    });
  });
};

function checkTodo() {
  if(todos.childElementCount) {
    service.elemHide(listEmpty, 0);
    return;
  } 
  service.elemShow(listEmpty, 0);
}

function showInfoTask(item) {
  const panelTask = document.createElement('div'),
        panelTask__info = document.createElement('div'),
        panelTask__title = document.createElement('div'),
        panelTask__date = document.createElement('div');
        
  panelTask.classList.add('panelTask');
  panelTask__info.classList.add('panelTask__info');
  panelTask__title.classList.add('panelTask__title');
  panelTask__title.innerHTML = item.title;
  panelTask__date.classList.add('panelTask__date');

  panelTask__info.appendChild(panelTask__title);
  panelTask__info.appendChild(panelTask__date);
  panelTask.appendChild(panelTask__info);

  return panelTask;
}

// const filterList = () => {
//   const svg1 = document.querySelector('.svg-1'),
//         svg2 = document.querySelector('.svg-2');

//     svg1.addEventListener('click', () => {
//       service.elemHide(svg1, 100);
//       service.elemShow(svg2, 100);
//     });
//     svg2.addEventListener('click', () => {
//       service.elemHide(svg2, 100);
//       service.elemShow(svg1, 100);
//     });
// };

// filterList();