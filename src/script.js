const addMessage = document.querySelector('#newTask'),
      addButton = document.querySelector('#btn_task'),
      todos = document.querySelector('.todo_list');


addButton.addEventListener('click', () => {
  addTodo();
  addMessage.value = '';
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
  const btnDelete = document.createElement('span');
  btnDelete.className = 'todo_del';
  btnDelete.addEventListener('click', () => {
    todos.removeChild(todo);
  });
  todo.appendChild(input);
  todo.appendChild(label);
  todo.appendChild(btnDelete);
  return todo;
};