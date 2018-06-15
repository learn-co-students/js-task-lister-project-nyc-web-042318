var listDiv = document.getElementById('app-content')
var masterList = []
document.addEventListener('DOMContentLoaded', () => {
  // your solution here

  // grab DOM elements

  /**
   *A collection of helper functions.
   *
   * @class App
   */
  class App {
    /**
     *Consolidate the creation, definition, and appending to DOM function.
     *
     * @static
     * @param {DOMElementType} element - Specific the tag to create
     * @param {Array|Object} [attribute=''] - key, value pair (or array of them) ins the format {attributeName: 'value'}
     * @param {DOMElement} [parent=''] - (Optional) Specify the parent element to append this element to
     * @param {string} [inner=''] - (Optional) The string to inser beteeen tag open and tag close.
     * @returns {DOMEElement}
     * @memberof App
     */
    static createElement (element, attribute = '', parent = '', inner = '') {
      if (typeof (element) === 'undefined') {
        return false
      }

      let e = document.createElement(element)

      if (!Array.isArray(attribute)) {
        attribute = [attribute]
      }

      if ((typeof (attribute) === 'object') && (attribute !== '')) {
        for (let attr of attribute) {
          for (let key in attr) {
            e.setAttribute(key, attr[key])
          }
        }
      }

      if (!Array.isArray(inner)) {
        inner = [inner]
      }

      for (var i = 0; i < inner.length; i++) {
        if (inner[i].tagName) {
          e.appendChild(inner[i])
        } else {
          e.appendChild(document.createTextNode(inner[i]))
        }
      }

      if (parent) {
        parent.appendChild(e)
      }

      return e
    }

    /**
     *Remove DOM element by its id
     *
     * @static
     * @param {string} elementId - The element id of the element you want to remove.
     * @memberof App
     */
    static removeElement (elementId) {
      // Removes an element from the document
      var element = document.getElementById(elementId)
      element.parentNode.removeChild(element)
    }
  }

  class List {
    constructor (title) {
      this.title = title
      this.tasks = []
      masterList.push(this)
    }

    render (parentElement) {
      const div = App.createElement('div')

      App.createElement('h2', '', div, `${this.title}`)

      const button = App.createElement('button', {class: 'delete-list'}, div, 'X')
      button.dataset.title = `${this.title}`
      button.addEventListener('click', TaskLister.remove)

      const taskList = App.createElement('ul', '', div)

      for (let task of this.tasks) {
        task.render(taskList, this.title)
      }
      return div
    }

    static remove (title, node = '') {
      const index = masterList.map(function (object) { return object.title }).indexOf('delListTitle')
      masterList.splice(index, 1)
      node.remove()
      if (masterList.length === 0) {
        document.getElementById('create-task-form').remove()
      }
    }

    static generateListsDropDown () {
      if (document.getElementById('create-task-form')) {
        const formListSelect = document.getElementById('parent-list')
        formListSelect.options[formListSelect.selectedIndex].removeAttribute('selected')
        const newList = App.createElement('option', [{ value: `${masterList[masterList.length - 1].title}` }, { selected: 'selected' }], formListSelect, `${masterList[masterList.length - 1].title}`)
      } else {
        const createForm = App.createElement('form', { id: 'create-task-form' }, listDiv)
        const formListLabel = App.createElement('label', { for: 'parent-list' }, createForm, 'Select List:')
        const formListSelect = App.createElement('select', { id: 'parent-list' }, createForm)
        for (var i = 0; i < masterList.length; i++) {
          const listElement = App.createElement('option', { value: `${masterList[i].title}` }, formListSelect, `${masterList[i].title}`)
          if (masterList[i] === masterList[masterList.length - 1]) {
            listElement.setAttribute('selected', 'selected')
          }
        }
      }
    }

    static listEditorForm () {
      List.generateListsDropDown()
      Task.renderNewTaskForm()
    }

    static renderLists () {
      if (document.getElementById('lists')) {
        App.removeElement('lists')
      }
      const listsDiv = App.createElement('div', {id: 'lists'}, listDiv)

      for (let list of masterList) {
        listsDiv.appendChild(list.render())
      }
    }
  }

  class Task {
    constructor (description, priority, list) {
      this.description = description
      this.priority = priority
      list.tasks.push(this)
    }

    render (parentElement, listTitle) {
      const taskListing = App.createElement('li', '', parentElement, `Task: ${this.description}`)
      const button = App.createElement('button', {class: 'delete-task'}, taskListing, 'X')
      button.dataset.listTitle = `${listTitle}`
      button.dataset.taskName = `${this.description}`
      const priority = App.createElement('p', {}, taskListing, `Priority: ${this.priority}`)
      button.addEventListener('click', TaskLister.remove)
    }

    static remove (taskData) {
      // const taskElement = document.getElementById(`data-task-name-${taskData.taskName}`).parentElement
    }

    static renderNewTaskForm () {
      const createForm = document.getElementById('create-task-form')

      const newTaskDescLabel = App.createElement('label', {for: 'new-task-description'}, createForm, 'New Task Description:')
      const newTaskDescInput = App.createElement('input', [{required: 'required'}, {type: 'text'}, {id: 'new-task-description'}, {placeholder: 'description'}], createForm)

      const newTaskPriority = App.createElement('label', {for: 'new-task-priority'}, createForm, 'Priority level:')
      const newTaskPriorityInput = App.createElement('input', [{type: 'text'}, {id: 'new-task-priority'}, {placeholder: 'priority'}], createForm)

      const newTaskSubmit = App.createElement('input', [{type: 'submit'}, {value: 'Create New Task'}], createForm)
      createForm.addEventListener('submit', function (event) {
        event.preventDefault()

        const formListSelect = document.getElementById('parent-list')

        const description = newTaskDescInput.value
        const priority = newTaskPriorityInput.value

        const selectedListTitle = formListSelect.options[formListSelect.selectedIndex].value
        const selectedListIndex = masterList.map(obj => obj.title).indexOf(`${selectedListTitle}`)

        const newTask = new Task(description, priority, masterList[selectedListIndex])

        List.renderLists()
      })
    }
  }

  class TaskLister {
    static render () {
      if (document.getElementById('create-task-form')) {
        App.removeElement('create-task-form')
      }
      List.listEditorForm()
      List.renderLists()
    }

    static remove (event) {
      switch (event.currentTarget.className) {
        case 'delete-list':
          const delListTitle = event.currentTarget.dataset.title
          List.remove(delListTitle, event.currentTarget.parentNode)
          break
        case 'delete-task':
          const taskDescription = event.target.dataset.taskName
          const listTitle = event.target.dataset.listTitle
          const listIndex = masterList.map(function (list) { return list.title }).indexOf(listTitle)
          const taskIndex = masterList[listIndex].tasks.map(function (task) { return task.description }).indexOf(taskDescription)
          masterList[listIndex].tasks.splice(taskIndex, 1)
          const oldDiv = event.currentTarget.parentNode.parentNode.parentNode
          const newDiv = masterList.find(list => list.title === listTitle).render('')
          const parentDiv = document.getElementById('lists')
          parentDiv.replaceChild(newDiv, oldDiv)
          break
      }
    }
  }

  document.getElementById('create-list-form').addEventListener('submit', function (e) {
    e.preventDefault()
    const title = e.target.childNodes[3].value
    e.target.childNodes[3].value = ''
    const newList = new List(title)

    TaskLister.render()
  })
})
