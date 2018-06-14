// document.addEventListener('DOMContentLoaded', () => {
//   // your solution here
//   // grab DOM elements
//   const userInput = document.getElementById('new-list-title')
//   const appContent = document.getElementById("app-content");
//   const listDiv = document.getElementById('lists')
//   const listForm = document.getElementById('create-list-form')
//   const userInputArray = []
//
//
//   // const app = new TaskLister();
//   listForm.addEventListener('submit', submitForm);
//
//
//
//
//
//   function getUserInput (event) {
//
//   }
//   function submitForm() {
//       event.preventDefault();
//       userInputArray.push(userInput.value)
//       generateList(event);
//       listSubmit(event);
//       const taskForm = document.getElementById('create-task-form');
//       taskForm.addEventListener('submit', submitTask);
//   }
//
//
//
//   function generateList(event) {
//     const newArray = Array.from(userInputArray)
//     const lastEle = newArray.pop();
//     var eachInput = ''
//     eachInput = newArray.map(e => `<option value="${e}" selected="">
//       ${e}
//     </option>`)
//      let formList = `<form id="create-task-form">
//           <label for="parent-list">Select List:</label>
//           <select id="parent-list">
//
//
//           ${eachInput}
//
//         <option value="${lastEle}" selected>
//           ${lastEle}
//         </option>
//
//           </select>
//
//           <label for="new-task-description">Task description:</label>
//           <input required="" type="text" id="new-task-description" placeholder="description">
//
//           <label for="new-task-priority">Priority level:</label>
//           <input type="text" id="new-task-priority" placeholder="priority">
//           <input type="submit" value="Create New Task">
//         </form>`
//
//
//
//         // if (appContent.children.length > 1 && appContent.children[0].id == "create-task-form") {
//         //   appContent.removeChild(appContent.firstElementChild);
//         // }
//         //
//         appContent.innerHTML = formList;
//
//
//   }
//
//
//   function listSubmit (event) {
//     listDiv.innerHTML +=
//     `<div>
//       <h2>${userInput.value}
//         <button data-title="${userInput.value}" class="delete-list">
//             X
//         </button>
//       </h2>
//       <ul id=${userInput.value} >
//
//       </ul>
//     </div>`
//
//   }
//
//
//
// function submitTask (event) {
//
//   const descriptionInput = document.getElementById('new-task-description')
//   const priorityInput = document.getElementById('new-task-priority')
//   const parentList = document.getElementById('parent-list')
//   parentList.selectionIndex
//   const appendedUl = document.getElementById(`${userInput.value}`)
//
//   var li = document.createElement('li')
//   li.innerText = 'Task: ' + descriptionInput.value
//   const findDesc = document.getElementById(`desc-${descriptionInput.value}`)
//
//   // uniqueness(li.innerText.slice(6, li.innerText.length), descriptionInput.value)
//   appendedUl.appendChild(li)
//   var count = 0;
//   var pli = document.createElement('li')
//   pli.innerText = 'Priority: ' + priorityInput.value;
//   appendedUl.appendChild(pli);
//   const deleteTask = document.createElement('Button');
//   deleteTask.innerText = 'X'
//   deleteTask.setAttribute('class', 'delete-task')
//   appendedUl.appendChild(deleteTask);
//   li.setAttribute('id', `desc-${descriptionInput.value}`)
//   pli.setAttribute('id', `priority-${priorityInput.value}`)
//
//   // make a delete function
//   // descriptionInput.value = ''
//   // priorityInput.value = ''
//
// }
//
// // function uniqueness(anotherthing, value) {
// //   if (anotherthing == value) {
// //     alert("can't be the same")
// //   }
// // }
//
// });


document.addEventListener('DOMContentLoaded', () => {
  const createListForm = document.getElementById('create-list-form')

  const newListTitle = document.getElementById('new-list-title')

  const appContent = document.getElementById('app-content')

  const list = document.getElementById('lists')

  var arrayInputs = []


  list.addEventListener('click', function(event) {

    if (event.target.innerText == 'X') {
      // event.target.parentElement.parentElement.remove()
      var select = document.getElementById('parent-list')
      var eachInput = ''
      var anotherinput = []
      anotherinput = arrayInputs.filter(function(i) {
	         return i != event.target.parentElement.children[0].dataset.title
          });
      arrayInputs = anotherinput
      eachInput = anotherinput.map(element => `<option value="${element}" selected="">
                            ${element}
                          </option>`)
      select.innerHTML = eachInput
      event.target.parentElement.parentElement.remove()
      if (select.childElementCount == 0) {
        var form = document.getElementById('create-task-form')
        form.remove()
      }

    }
  })


  createListForm.addEventListener('submit', function(event) {

    event.preventDefault();
    const listInput = newListTitle.value
    if (arrayInputs && arrayInputs.includes(listInput) == true) {
      // arrayInputs.push(listInput)
      // createForm(listInput);
      // newListTitle.value = ''
      alert("Already exists")
    } else {
      arrayInputs.push(listInput)
      createForm(listInput);
      newListTitle.value = ''
    }

  })

  function createForm(listInput) {

    const anotherArray = arrayInputs.slice()
    const lastElement = anotherArray.pop()
    var eachInput = ''
    eachInput = anotherArray.map(element => `<option value="${element}" selected="">
                          ${element}
                        </option>`)

  appContent.innerHTML = `<form id="create-task-form">
                    <label for="parent-list">Select List:</label>
                    <select id="parent-list">
                      ${eachInput}

                    <option value="${lastElement}" selected="">
                      ${lastElement}
                    </option>

                    </select>

                    <label for="new-task-description">Task description:</label>
                    <input required="" type="text" id="new-task-description" placeholder="description">

                    <label for="new-task-priority">Priority level:</label>
                    <input type="text" id="new-task-priority" placeholder="priority">
                    <input type="submit" value="Create New Task">
              </form>`
        const div = document.createElement('DIV')

        div.setAttribute('id', `${listInput}`)
        const htwoTag = document.createElement('H2')
        htwoTag.innerText = listInput
        const buttonDelete = document.createElement('BUTTON')
        buttonDelete.setAttribute('data-title', `${listInput}`)
        buttonDelete.setAttribute('class', 'delete-list')
        buttonDelete.innerText = "X"
        htwoTag.appendChild(buttonDelete)
        div.appendChild(htwoTag)
        list.appendChild(div)



        const createTaskForm = document.getElementById('create-task-form')

        createTaskForm.addEventListener('submit', function(event) {
          event.preventDefault();
          updateDivList(event, listInput)
        })
  }


  function updateDivList(event, listInput) {
    const div = document.getElementById(`${listInput}`)
    const taskDescription = document.getElementById('new-task-description');
    const taskPriority = document.getElementById('new-task-priority');
    if (taskPriority.value == '') {
      taskPriority.value = 'low'
    }
    const ul = document.createElement('UL');
    const li = document.createElement('LI');
    li.setAttribute('id', 'task')
    const smallButtonDelete = document.createElement('BUTTON')
    smallButtonDelete.setAttribute('data-list-title', `${listInput}`)
    smallButtonDelete.setAttribute('data-task-name', `${taskDescription.value}`)
    smallButtonDelete.setAttribute('class', 'delete-task')
    smallButtonDelete.innerText = "X"
    li.innerText = `Task: ${taskDescription.value}`
    li.appendChild(smallButtonDelete)
    var pli = document.createElement('LI');
    // pli.setAttribute('id', 'priority');
    pli.innerText = `Priority: ${taskPriority.value}`
    ul.appendChild(li)
    ul.appendChild(pli)
    div.appendChild(ul)
  }




  });
