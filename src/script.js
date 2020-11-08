const addMessage = document.querySelector('#newTask'),
      addButton = document.querySelector('#btn_task'),
      todos = document.querySelector('.todo_list'),
      todoItem = document.querySelector('.todo_item'),
      popup = document.querySelector('.popup'),
      closePopup = document.querySelector('.close');

const todosData = [];

// const url = 'https://jsonplaceholder.typicode.com/todos';
// const myRequest = new XMLHttpRequest();  

// function sendTest(){
//   return new Promise((resolve, regect) => {
//     myRequest.open('GET', url);
//     myRequest.send();
//     myRequest.onload = ()=> {
//       const status = myRequest.status;
//       if(status < 400) {
//         resolve(myRequest.response);
//       } else {
//         console.log('Ошибка запроса');
//       }
//     };
//   });
// };

// const testPromise = sendTest();

// testPromise.then((data) => {
//   JSON.parse(data).forEach((key) => {
//     dataTodos = key.title;
    
//   });   
// });
checkTodo();
loadTodos();

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
  addTodoJson();
  addMessage.value = '';
};

function addTodoJson() {
  if(todosData != null ) {
    localStorage.setItem('todosData', JSON.stringify(todosData));
  }
};

function loadTodos() {
  if(localStorage.getItem('todosData')){
    data = JSON.parse(localStorage.getItem('todosData'));
    data.forEach((item) => {
      console.log(item);
    });
  }
};

const getTodo = () => {
  const todo = document.createElement('li');
  todo.className = 'todo_item';
  const input = document.createElement('input');
  // input.id = 'item_' todo id
  input.type = 'checkbox';
  input.value = 'Новая задача';
  const label = document.createElement('label');
  label.className = 'todo_mess';
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

closePopup.addEventListener("click", (e) => {
  e.preventDefault();
  popup.classList.add("d-none");
});


function checkTodo() {
  if(!todos.innerHTML == null) {
    console.log("список пуст");
  } else {
    console.log("список");
  }
};
