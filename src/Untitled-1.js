
// Define some global variable for use with this app
const parentElement = document.getElementById('app-content')
const createListForm = document.getElementById('create-list-form')
let storage = []

document.addEventListener('DOMContentLoaded', () => {

  /**
   * This class is the template class for various subclasses. It is not intended that an instance of this class be directly createdf. 
   * It automatically renders HTML and appends it to the <tt>parentElement</tt> as defined globally. Additionally, it proivides a static utility function 
   * to aid in the creation of DOM elements.
   * 
   * @class App
   */
  class App {
    /**
     *The template properties of subclasses. Automatically starts the rendering process.
     * @param {string} idName - The parent element 'id' value
     * @param {HTMLElementTagName} elementType - The parent element type
     */
    constructor (idName, elementType) {
      this.element = App.createElement(elementType, {id: `${idName}`})
      this.render()
    }

    /**
     * Consolidate the document element creation and attributes definition into one function.
     *
     * @static
     * @param {HTMLElementTagName} element - The element type
     * @param {Object|Array} attribute - key|value or array of key|value pairs representing desireed element attributes
     * @param {string} inner - Optional text to insert between tag opening and closing. 
     * @returns {DOMElement} - The DOM element created
     * @memberof App
     */
    static createElement (element, attribute, inner) {
      if (typeof (element) === 'undefined') {
        return false
      }
      if (typeof (inner) === 'undefined') {
        inner = ''
      }
      let e = document.createElement(element)
      if (typeof (attribute) === 'object') {
        for (let key in attribute) {
          e.setAttribute(key, attribute[key])
        }
      }
      if (!Array.isArray(inner)) {
        inner = [inner]
      }
      for (var i = 0; i < inner.length; i++) {
        if (inner[k].tagName) {
          e.appendChild(inner[k])
        } else {
          e.appendChild(document.createTextNode(inner[k]))
        }
      }
      return e
    }

    /**
     *Placeholder functino for subclasses. It should contain the logic to redner approprirate html. It will then call .toiHTML to append it ot the page via the parentElement
     *
     * @memberof App
     */
    render () {
    }

    /**
     *pPpend this instance generated DOM to the page via the <tt>parentElement</tt>
     *
     * @memberof App
     */
    toHTML () {
      parentElement.appendChild(this.element)
    }
  }

  /**
   *Instances of this class represents discrete lists each with its associated tasks. Will generate a list editor to change lists, add tasks. 
   *
   * @class List
   * @extends {App}
   */
  class List extends App {
    constructor (idName, elementType) {
      super(idName, elementType)
      storage.push(this)
    }

    render () {
      document.getElementById('create-list-form').addEventListener('submit', function (e) {
        e.preventDefault()
        const createTaskForm = new Task('create-task-form')
        createTaskForm.toHTML()
      })
    }
  }
  class Task extends App {
    start () {

      this.element.innerHTML = `
      <label for="parent-list">Select List:</label>
      <select id='parent-list'>` + this.generateListOptions().join('') + `</select>
      <label for="new-task-description">Task description:</label>
      <input required="" type="text" id="new-task-description" placeholder="description">
      <label for="new-task-priority">Priority level:</label>
      <input type="text" id="new-task-priority" placeholder="priority">
      <input type="submit" value="Create New Task">`

    }

    generateListOptions () {
      let options = []
      let index = 0

      for (let list of storage) {
        let option = `<option id=`
        // const option = document.createElement('option')
        // option.setAttribute('value', `${list.title}`)
        // option.setAttribute('id', `list-${list.title}`)
        // option.dataset.arrayIndex = `${index}`
        // index++
        // option.innerText = `${list.title}`
        // if (list.title === selectedList.title) {
        //   option.setAttribute('selected', 'selected')
        // }
        options.push(option)
      }
      return [...options]
    }
  }

  // Start the app
  document.getElementById('create-list-form').addEventListener('submit', )
})

// your solution here
// grab DOM elements

//   const listDiv = document.getElementById('app-content')
//   const titleList = document.getElementById('new-list-title')
//   const listForm = document.getElementById('create-list-form')
//   const appContentDiv = document.getElementById('app-content')

//   let masterList = [{title: 'test2'},{title: 'test3'}]

//   listForm.addEventListener("submit", createList)

//   function createList(e) {
//     e.preventDefault()
//     // Create list
//     const newList = new List(titleList.value)
//     // activate the list editor div
//     generateListEditor(newList)
//   }

//   function generateListEditor(selectedList) {
//     formListEditor = document.createElement("form")
//     selectListLabel = document.createElement("label")
//     selectDropDownList = document.createElement("select")

//     taskDescriptionLabel = document.createElement("label")
//     taskDescriptionInput = document.createElement("input")

//     priorityLabel = document.createElement("label")
//     priorityInput = document.createElement("input")

//     taskEditorSubmitButton = document.createElement('input')

//     formListEditor.setAttribute('id', 'form-list-editor')

//     selectListLabel.setAttribute('for', 'parent-list')
//     selectListLabel.innerText = "Select List:"
//     selectDropDownList.setAttribute('id', 'parent-list')

//     taskDescriptionLabel.setAttribute('for', 'new-list-description')
//     taskDescriptionLabel.innerText = "Task Description:"
//     taskDescriptionInput.setAttribute('type', 'text')
//     taskDescriptionInput.setAttribute('id', 'new-list-description')
//     taskDescriptionInput.setAttribute('placeholder', 'description')
//     taskDescriptionInput.required = true

//     priorityLabel.innerText = 'Priority level:'
//     priorityInput.setAttribute('type', 'text')
//     priorityInput.setAttribute('id', 'new-tast-priority')
//     priorityInput.setAttribute('placeholder', 'priority')
//     priorityInput.required = true

//     taskEditorSubmitButton.setAttribute('type', 'submit')
//     taskEditorSubmitButton.setAttribute('value', 'Create New Task')
//     taskEditorSubmitButton.addEventListener('click', generateTask)

//     formListEditor.appendChild(selectListLabel)
//     formListEditor.appendChild(selectDropDownList)
//     generateDropDownList(selectDropDownList, selectedList)
//     formListEditor.appendChild(taskDescriptionLabel)
//     formListEditor.appendChild(taskDescriptionInput)
//     formListEditor.appendChild(priorityLabel)
//     formListEditor.appendChild(priorityInput)
//     formListEditor.appendChild(taskEditorSubmitButton)

//     appContentDiv.appendChild(formListEditor)
//   }

//   function generateDropDownList(selectDropDownList, selectedList) {
//     let index = 0
//     for (list of masterList) {
//       const option = document.createElement('option')
//       option.setAttribute('value', `${list.title}`)
//       option.setAttribute('id', `list-${list.title}`)
//       option.dataset.arrayIndex = `${index}`
//       index++
//       option.innerText = `${list.title}`
//       if (list.title === selectedList.title) {
//         option.setAttribute('selected', 'selected')
//       }
//       selectDropDownList.appendChild(option)
//     }
//   }

//   function generateTask () {
//     let selectedListIndex = selectDropDownList.options[selectDropDownList.selectedIndex].dataset.arrayIndex
//     const newTask = new Task(selectedListIndex, taskDescriptionInput.value, priorityInput.value)
//     generateTaskBox(masterList[selectedListIndex], newTast)
//   }

//   function generateTaskBox(taskArray) {
//     const listTitle =
//     listDiv = document.createElement('div')
//     listHeader = document.createElement('h2')
//     deleteListButton = document.createElement('button')
//     taskListTag = document.createElement('ul')
//     generateTaskList(taskArray, taskListTag)

//     listDiv.setAttribute('id', 'lists')
//     listHeader.innerText = `${masterList[index].title}`

//     deleteListButton.setAttribute('class', 'delete-list')
//     deleteListButton.innerText = 'X'
//     deleteListButton.addEventListener('click', removeList)

//     listHeader.appendChild(deleteListButton)
//     listDiv.appendChild(listHeader)

//   }

//   function generateTaskList(tasks, tag) {
//     for (task of tasks) {
//       const taskTagList = document.createElement('li')
//       taskTagList.innerText = `Task: ${task.description}`
//       const deleteTaskButton = document.createElement('button')
//       deleteTaskButton.addEventListener('click', deleteTask)
//       deleteTaskButton.dataset.listTitle = `${tasks.title}`
//       deleteTaskButton.dataset.taskName = `${task.description}`
//       deleteTaskButton.setAttribute('class', 'delete-task')

//       taskTagList.appendChild(deleteTaskButton)
//       tag.appendChild(taskTagList)
//     }
//   }
// }
// }

//   class Task {
//     constructor (index, description, priority) {
//       this.description = description
//       this.priority = priority
//       masterList[index].tasks.push(this)
//     }
//   }
//   class List {
//     constructor (title) {
//       this.title = title
//       this.tasks = []
//       masterList.push(this)
//     }
//   }

// })
