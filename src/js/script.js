const addMessage = document.querySelector('#newTask'),
      addButton = document.querySelector('#btn_task'),
      todos = document.querySelector('.todo_list'),
      todoItem = document.querySelector('.todo_item'),
      deleteButton = document.querySelector('#deleteButton'),
      listEmpty = document.querySelector('#listEmpty')
      popup = document.querySelector('.popup'),
      closePopup = document.querySelector('.close');

let todosData = [];

checkTodo();

addButton.addEventListener('click', () => {
  noneTodo();
  
});

addMessage.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    noneTodo();
  }
});

function noneTodo() {
  if( addMessage.value == "" ) {
    popup.classList.remove("d-none");
  } else {
    addTodo();
  }
};

function addTodo() {
  const todo = getTodo();
  todos.appendChild(todo);
  todosData.push(addMessage.value);
  setLocalStorage();
  addMessage.value = '';
  checkTodo();
};

const getTodo = (item) => {
  const todo = document.createElement('li');
  todo.className = 'todo_item';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.value = 'Новая задача';
  const label = document.createElement('label');
  label.className = 'todo_mess';
  // label.innerHTML = item;
  label.innerHTML = addMessage.value;
  const btnDelete = document.createElement('button');
  btnDelete.className = 'close';
  btnDelete.type = 'button';
  btnDelete.innerHTML = '&times';
  btnDelete.addEventListener('click', () => {
    todos.removeChild(todo);
    // localStorage.removeItem('todos', addMessage.innerHTML);
  });
  todo.appendChild(input);
  todo.appendChild(label);
  todo.appendChild(btnDelete);
  return todo;
};

const getList = function(todosData){
      todosData.forEach(function(item){
        console.log(item);
        getTodo(item);
      });
};

// Загрузка в LocalStorage
const setLocalStorage = () => localStorage.setItem('todosData', JSON.stringify(todosData));

// Получаем из LocalStorage
const getLocalStorage = function(){
  const todosStorage = localStorage.getItem('todosData');
  if (todosStorage === null){
      todosData = [];
  } else {
      todosData = JSON.parse(todosStorage);
      console.log(todosData);
      getList(todosData);
  }
};

getLocalStorage();

closePopup.addEventListener("click", (e) => {
  e.preventDefault();
  popup.classList.add("d-none");
});

//Удаление из localStorage
deleteButton.addEventListener('click', () => {
  localStorage.clear();
  todos.innerHTML = '';
});

// function checkTodo() {
//   if(!todos.classList.contains('todo_item') ) {
//     listEmpty.className = 'alert alert-warning';
//     const title = document.createElement('span');
//     title.className = 'alert-heading';
//     title.innerHTML = 'Список пуст';
//     listEmpty.appendChild(title);
//   } else {
//     console.log("не пуст");
//   }
// };

//Проверка списка
function checkTodo() {
  if(todos.classList.contains('todo_item') ) {
    listEmpty.setAttribute('hidden');
  } else {
    listEmpty.removeAttribute('hidden');
  }
};