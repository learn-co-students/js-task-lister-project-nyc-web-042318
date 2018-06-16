document.addEventListener('DOMContentLoaded', () => {

  const inputForm = document.getElementById("create-list-form")
  const inputField = document.getElementById("new-list-title")
  const appContent = document.getElementById("app-content")
  const lists = document.getElementById("lists")

  let uniqueArray = []

  inputForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const input = inputField.value
    inputField.value = ''

    if (uniqueArray.includes(input)) {
      alert('You already have that list!')
    }
    else {
    uniqueArray.push(input)

    if (lists.innerHTML === ""){
      createTaskForm()
    }

    createList (input)
    populateOptions(input)
    }
  })



  function populateOptions (input) {
    const optionsList = document.getElementById("parent-list")
    optionsList.innerHTML += `<option id="${input}" value="${input}" selected="">${input}</option>`
  }

  function createList (input) {
    lists.innerHTML +=
    `<div id="${input}">  <h2>${input} <button data-title="${input}" class="delete-list">
            X   </button>   </h2>   <ul data-ul-id="${input}">   </ul>  </div>`

      destroyList()
  }

  function createTaskForm() {

      appContent.innerHTML = `<form id="create-task-form">
            <label for="parent-list">Select List:</label>
            <select id="parent-list">
            </select>

            <label for="new-task-description">Task description:</label>
            <input required="" type="text" id="new-task-description" placeholder="description">

            <label for="new-task-priority">Priority level:</label>
            <input type="text" id="new-task-priority" placeholder="priority">
            <input type="submit" value="Create New Task">
          </form>`

          taskFormListener()

  }

  function taskFormListener () {
    const taskForm = document.getElementById("create-task-form")
    taskForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const listSelectValue = document.getElementById("parent-list").value
      const description = document.getElementById("new-task-description").value
      const priority = document.getElementById("new-task-priority").value
      document.getElementById("new-task-description").value = ''
      document.getElementById("new-task-priority").value = ''
      appendListDetails(listSelectValue, description, priority)
    })

  }

  function appendListDetails(listSelectValue, description, priority) {
    const list = document.getElementById(listSelectValue)
    const findUl = document.querySelector(`[data-ul-id="${listSelectValue}"]`)

    findUl.innerHTML +=
        `<li id="${description}">
            Task: ${description}
            <button data-description="${description}" data-priority="${priority}" class="delete-task">
              X
            </button>
            <br>
            Priority: ${priority}
          </li>`

          destroyTasks()
  }

  function destroyList() {
    const deleteBtns = document.getElementsByClassName("delete-list")
    const deleteBtnsArr = [...deleteBtns]
    deleteBtnsArr.forEach( btn => {
      btn.addEventListener("click", (e) => {
        e.target.parentElement.parentElement.remove()
        document.getElementById(e.target.parentElement.parentElement.id).remove()
        uniqueArray.filter( element => {
          event.target.parentElement.parentElement.id !== element
        });
      });
    });
  };

  function destroyTasks() {
    const deleteTskBtns = document.getElementsByClassName("delete-task")
    const deleteTskBtnsArr = [...deleteTskBtns]
    deleteTskBtnsArr.forEach( btn => {
      btn.addEventListener("click", (e) => {
        e.target.parentElement.remove()
      })

    })
  }

    // const listDiv = document.getElementById("app-content");
    // const app = new TaskLister();
  });
