const toDoList = [
  {
  name: 'make dishes',
  date: '21/05/2026'
  },
  {
    name: 'play lives',
    date: '21/05/2026'
  }
];
renderHTML();
function renderHTML(){
  let toDoListHTML = '';
  for(let i = 0;i < toDoList.length;i++){
    const todoObject = toDoList[i];
    const name = todoObject.name;
    const date = todoObject.date;
    const html = `<p>${name}     ${date} 
    <button onclick = " toDoList.splice(${i}, 1); renderHTML();">Delete</button></p>`;
    toDoListHTML += html;
  }
  document.querySelector('.js-todo-list').innerHTML = toDoListHTML;
}

function addToList(){
  const inputValue = document.querySelector('.todo-input-1');
  const dueDate = document.querySelector('.js-date');
  const name = inputValue.value;
  const date = dueDate.value;
  toDoList.push({name,date});
  console.log(toDoList);
  inputValue.value = '';
  renderHTML();
}