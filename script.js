const form = document.querySelector("#input__todo");
const inputTask = document.querySelector("#input__todo input[type='text']");
const taskList = document.querySelector(".tasks__list");
const footerBtn = document.querySelector(".btn__container");
const taskLeftContainer = document.querySelector(".tasks--left");
const clearCompletedBtn = document.querySelector('#clear-completed');
const themeSelector = document.querySelector('.theme--btns');

// TODO: add cross button functionality at every task. store in the local storage . add drag and drop functionality. look how to add the theme for various modes

//  State Variables
const state = {
  allTasks: [],
};
// functions which

const generateID = function () {
  let id = Math.floor(Math.random() * 100000 + 100000);
  return String(id);
};

const generateTask = function (id,taskValue,isCompleted) {

  let markup = `<li class="task">
            <input min='20' required  ${isCompleted ? 'checked' : ''}  class='task--check' type="checkbox" name="" id="${id}" />
            <label for="${id}">${taskValue}</label>
          </li>`;
  return markup;
};

const updateTaskLeft = function () {
  const completedTasks = state.allTasks.filter(
    (task) => task.isCompleted == true
  );
  taskLeftContainer.textContent = state.allTasks.length - completedTasks.length;
};

const handleChangeEvent = function (e) {
  let ele = e.target;
  const id = ele.id;
  console.log(id);
  const task = state.allTasks.find((task) => task.taskId == id);
  task.isCompleted = e.target.checked;
  updateTaskLeft();
};

const showAllTasks = function () {
  taskList.querySelectorAll('.task').forEach(task =>
  {
    task.style.display = 'flex';
  })
};

const showCompletedTasks = function ()
{
  taskList.querySelectorAll(".task").forEach(task =>
  { 

  
    const ele = task.querySelector('.task--check');

    if (ele.checked)
    {
      task.style.display = 'flex';
    }
    else
    {
      task.style.display = 'none';
    }
    
  })

};

const clearCompletedTasks = function ()
{
  taskList.querySelectorAll('.task').forEach(task =>
  {
    const ele = task.querySelector('.task--check');


    if (ele.checked)
    {
      taskList.removeChild(task);

    }
    
    
    
  })
  
};

const showActiveTasks = function ()
{
  taskList.querySelectorAll('.task').forEach(task =>
  {
    const ele = task.querySelector('.task--check');
    if (ele.checked)
    {
      task.style.display = 'none';
    }
    else
    {
      task.style.display = 'flex';
    }
  });
};

const handleFooterBtnsClick = function (e)
{
  
  
  if (e.target == this) return;
  const allBtn = this.querySelectorAll('.btn');
  allBtn.forEach(btn =>
  {
    if (btn.classList.contains('active'))
    {
      btn.classList.remove('active');
    }
  })

  e.target.classList.add('active');
  

  const id = e.target.id;

  switch (id) {
    case "all":
      showAllTasks();
      break;
    case "active":
      showActiveTasks();
      break;
    case "completed":
      showCompletedTasks();
      break;
  }
};

const getInputValue = function ()
{
  return inputTask.value.trim();
  
}

const onSubmitForm = function (e) {
  e.preventDefault();
  const taskValue = getInputValue();
  if (!taskValue) return;
  const id = generateID();
  const isCompleted = false;
  const markup = generateTask(id,taskValue,isCompleted);
  state.allTasks.push({
    taskName: taskValue,
    taskId: id,
    isCompleted : isCompleted
  });
  inputTask.value = "";
  taskList.insertAdjacentHTML('afterbegin', markup);
  updateTaskLeft();
  taskList
    .querySelector(".task--check")
    ?.addEventListener("change", handleChangeEvent);
};
form.addEventListener("submit", onSubmitForm);
footerBtn.addEventListener('click', handleFooterBtnsClick);
clearCompletedBtn.addEventListener('click', clearCompletedTasks);
const init = function () {
  inputTask.focus();
  updateTaskLeft();
};

init();
