const addMessage = document.querySelector('.newTask'),
      addButton = document.querySelector('.btn'),
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
  const input = document.createElement('input');
  // input.id = 'item_' todo id
  input.type = 'checkbox';
  input.value = 'Новая задача';
  const label = document.createElement('label');
  label.innerHTML = addMessage.value;
  const btnDelete = document.createElement('span');
  btnDelete.innerHTML = '&#10008';
  btnDelete.addEventListener('click', () => {
    todos.removeChild(todo);
  });
  todo.appendChild(input);
  todo.appendChild(label);
  todo.appendChild(btnDelete);
  return todo;
};