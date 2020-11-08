const addMessage = document.querySelector('#newTask'),
      addButton = document.querySelector('#btn_task'),
      todos = document.querySelector('.todo_list'),
      todoItem = document.querySelector('.todo_item'),
      deleteButton = document.querySelector('#deleteButton'),
      listEmpty = document.querySelector('.listEmpty'),
      popup = document.querySelector('.popup'),
      closePopup = document.querySelector('.close');

let todosData = [];

addButton.addEventListener('click', () => addTodo());

addMessage.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
    addTodo();
  }
});

const addTodo = () => {
  if( addMessage.value == "" ) {
    popup.classList.remove("d-none");
    return;
  }
  createTodo();
};

function createTodo() {
  const todo = getTodo();
  todos.appendChild(todo);
  todosData.push(addMessage.value);
  setLocalStorage();
  addMessage.value = '';
  checkTodo();
};

const getTodo = (item) => {
  const todo = document.createElement('li'),
        input = document.createElement('input'),
        label = document.createElement('label'),
        btnDelete = document.createElement('button');

  todo.className = 'todo_item';
  input.type = 'checkbox';
  input.value = 'Новая задача';
  label.className = 'todo_mess';
  label.innerHTML = addMessage.value;
  btnDelete.className = 'close';
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

const getList = (todosData) =>{
      todosData.forEach(value => {
        const todo = getTodo(value);
        todos.appendChild(todo);
      });
};

// Set todo list in LocalStorage
const setLocalStorage = () => localStorage.setItem('todosData', JSON.stringify(todosData));

// Get todo list in LocalStorage
const getLocalStorage = function(){
  const todosStorage = localStorage.getItem('todosData');
  if (todosStorage == null){
      todosData = [];
      return;
  } 
  todosData = JSON.parse(todosStorage);
  getList(todosData);
  checkTodo();
};

getLocalStorage();

closePopup.addEventListener("click", (e) => {
  e.preventDefault();
  //look toggle method 
  popup.classList.add("d-none");
});

//delete in localStorage
deleteButton.addEventListener('click', () => {
  localStorage.clear();
  todos.innerHTML = '';
  checkTodo();
});

//check todo list in task
function checkTodo() {
  if(todos.childElementCount) {
    listEmpty.setAttribute('hidden', '');
    return;
  } 
  listEmpty.removeAttribute('hidden');
};