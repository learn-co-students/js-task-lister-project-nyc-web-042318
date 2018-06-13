document.addEventListener('DOMContentLoaded', () => {
  const listForm = document.getElementById("create-list-form")
  const listInput = document.getElementById("new-list-title")
  const appDiv = document.getElementById("app-content")
  const taskForm = document.getElementById('create-task-form')
  listForm.addEventListener('submit', addOptionToParentList)

  function createAndAppendListDiv() {
    const div = document.createElement('div')
    div.id = `div-${listInput.value}`
    div.innerHTML =
    `<h2>${listInput.value}
          <button id="btn-${listInput.value}" class="delete-list">
            X
          </button>
        </h2>
        <ul id="${listInput.value}">
        </ul>`
    const listsDiv = document.getElementById("lists")
    const taskForm = document.getElementById('create-task-form')
    taskForm.addEventListener('submit', addDescriptionAndPriorityLevel)
    listsDiv.appendChild(div)
    const opt = document.getElementById(`opt-${listInput.value}`)
    const deleteListBtn = document.getElementById(`btn-${listInput.value}`)
    deleteListBtn.addEventListener('click', function (event) {
      event.preventDefault()
      div.remove()
      opt.remove()
      const pl = document.getElementById('parent-list')
      const str = `${pl.innerHTML}`
      if (str.trim() !== '') {
      } else {
        taskForm.remove()
      }
    })
  }

  function addDescriptionAndPriorityLevel(event) {
    event.preventDefault()
    const parentList = document.getElementById("parent-list")
    const taskDesc = document.getElementById("new-task-description")
    const taskPrio = document.getElementById("new-task-priority")
    const ul = document.getElementById(parentList.value)
    if (document.getElementById(`${parentList.value}-${taskDesc.value}`)) {
      alert('Task description must be unique')
    } else {
      if (taskPrio.value.length === 0) {
        taskPrio.value = 'low'
      }
      const li = document.createElement('li')
      li.innerHTML =
      `Task: ${taskDesc.value}
          <button id="${parentList.value}-${taskDesc.value}" data-list-title="${parentList.value}" data-task-name="${taskDesc.value}" class="delete-task">
            X
          </button>
          <br>
          Priority: ${taskPrio.value}`
      ul.appendChild(li)
    }
    taskPrio.value = ''
    taskDesc.value = ''
  }

  function addOptionToParentList(event) {
    event.preventDefault()
    if (document.getElementById('create-task-form')) {
      if (document.getElementById(listInput.value)) {
        alert('List titles must be unique')
      } else {
        const parentList = document.getElementById("parent-list")
        const option = document.createElement('option')
        option.id = `opt-${listInput.value}`
        option.value = listInput.value
        option.innerText = listInput.value
        option.selected = true
        parentList.appendChild(option)
        createAndAppendListDiv()
      }
    } else {
      appDiv.innerHTML =
      `<form id="create-task-form">
            <label for="parent-list">Select List:</label>
            <select id="parent-list">
            </select>
            <label for="new-task-description">Task description:</label>
            <input required="" type="text" id="new-task-description" placeholder="description">
            <label for="new-task-priority">Priority level:</label>
            <input type="text" id="new-task-priority" placeholder="priority">
            <input type="submit" value="Create New Task">
          </form>`
      const parentList = document.getElementById("parent-list")
      const option = document.createElement('option')
      option.id = `opt-${listInput.value}`
      option.value = listInput.value
      option.innerText = listInput.value
      parentList.appendChild(option)
      const div = document.createElement('div')
      div.id = 'lists'
      appDiv.appendChild(div)
      createAndAppendListDiv()
    }
    listInput.value = ''
  }
})
