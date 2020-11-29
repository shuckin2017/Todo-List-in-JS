'use strict' 

export default { 
  getTodo(item){
    const todo = document.createElement('li'),
          input = document.createElement('input'),
          label = document.createElement('label'),
          small = document.createElement('span'),
          btnDelete = document.createElement('button');
  
    todo.className = 'todo_item';
    input.type = 'checkbox';
    input.value = 'Новая задача';
    label.className = 'todo_mess';
    small.className = 'small-text';
    // small.innerHTML = new Date();
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
    label.appendChild(small);
    todo.appendChild(input);
    todo.appendChild(label);
    todo.appendChild(btnDelete);
    return todo;
  }

};