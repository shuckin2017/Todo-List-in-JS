const addMessage = document.querySelector('#newTask'),
      addButton = document.querySelector('#btn_task'),
      todos = document.querySelector('.todo_list'),
      popup = document.querySelector('.popup'),
      closePopup = document.querySelector('.close');


addButton.addEventListener('click', () => {
  if( addMessage.value == "" ){
    popup.classList.remove("d-none");
  } else {
    addTodo();
    addMessage.value = '';
  }
});

addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    if( addMessage.value == "" ){
      popup.classList.remove("d-none");
    } else {
      addTodo();
      addMessage.value = '';
    }
  }
});


function addTodo() {
  const todo = getTodo();
  todos.appendChild(todo);
};

const getTodo = () => {
  const todo = document.createElement('li');
  todo.className = 'todo_item';
  // todo.className = 'list-group-item';
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


