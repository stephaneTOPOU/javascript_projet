import { cloneTemplate, createElement } from "../fonction/dom.js"

/**
 * 
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */



export class TodoList {

    /**@type {Todo[]} */
    #todos = []

    /**@type {HTMLUListElement} */
    #listElement = []

    /**
     * 
     * @param {Todo[]} todos 
     */
    constructor(todos) {
        this.#todos = todos
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    appendTo(element) {
        element.append(
            cloneTemplate('todolist-layout')
        )
        
        this.#listElement = element.querySelector('.list-group')
        for (let todo of this.#todos) {
            const t = new TodoListItem(todo)
            this.#listElement.append(t.element)
        }
        element.querySelector('form').addEventListener('submit', e => this.#onSubmit(e))
        element.querySelectorAll('.btn-group button').forEach(button => {
            button.addEventListener('click', e => this.#toggleFilter(e))
        })

        this.#listElement.addEventListener('delete', ({detail: todo}) => {
            this.#todos = this.#todos.filter(t => t !== todo)
            this.#onUpdate()           
        })

        this.#listElement.addEventListener('toggle', ({detail: todo}) => {
            todo.completed = !todo.completed
            this.#onUpdate()           
        })
    }

    /**
     * 
     * @param {SubmitEvent} e 
     */
    #onSubmit (e) {
        const form = e.currentTarget
        e.preventDefault()
        const title = new FormData(form).get('title').toString().trim()
        //console.log(title)

        if (title === '') {
            return
        }
        const todo = {
            id: Date.now(),
            title,
            completed: false
        }
        const item = new TodoListItem(todo)
        this.#listElement.prepend(item.element)
        this.#todos.push(todo)
        this.#onUpdate()
        form.reset()
    }

    #onUpdate () {
        localStorage.setItem('todos', JSON.stringify(this.#todos))
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    #toggleFilter (e) {
        e.preventDefault()
        const filter = e.currentTarget.getAttribute('data-filter')
        //console.log(filter)
        e.currentTarget.parentElement.querySelector('.active').classList.remove('active')
        e.currentTarget.classList.add('active')

        if (filter === 'todo') {
            this.#listElement.classList.add('hide-completed')
            this.#listElement.classList.remove('hide-todo')
        } else if (filter === 'done') {
            this.#listElement.classList.add('hide-todo')
            this.#listElement.classList.remove('hide-completed')
        } else {
            this.#listElement.classList.remove('hide-todo')
            this.#listElement.classList.remove('hide-completed')
        }
    }
}

class TodoListItem {

    #element
    #todo

    /**@type{Todo} */
    constructor (todo) {
        this.#todo = todo
        const id = `todo-${todo.id}`
        const li = cloneTemplate('todolist-item').firstElementChild
        this.#element = li

        // const li = createElement('li', {
        //     class: 'todo list-group-item d-flex align-items-center'
        // })
        

        const checkbox = li.querySelector('input')
        checkbox.setAttribute('id', id)
        if (todo.completed) {
            checkbox.setAttribute('checked', '')
        }        
        
        // const checkbox = createElement('input', {
        //     type: 'checkbox',
        //     class: 'form-check-input',
        //     id,
        //     checked : todo.completed ? '' : null
        // })
        
        const label = li.querySelector('label')
        label.setAttribute('for', id)
        label.innerText = todo.title

        // const label = createElement('label', {
        //     class: 'ms-2 form-check-label',
        //     for: id
        // })
        
        const button = li.querySelector('button')

        // const button = createElement('button', {
        //     class: 'ms-auto btn btn-danger btn-sm'
        // })
        //button.innerHTML = '<i class="bi-trash"></i>'

        // li.append(checkbox)
        // li.append(label)
        // li.append(button)

        this.toggle(checkbox)


        button.addEventListener('click', e => this.removeTodo(e))
        checkbox.addEventListener('change', e => this.toggle(e.currentTarget))

        this.#element.addEventListener('delete', e => {
            //console.log(e)
            //e.preventDefault()
        })
        
    }


    /**
     * 
     * @return {HTMLElement} 
     */
    get element () {
        return this.#element
    }


    /**
     * 
     * @param {PointerEvent} e 
     */
    removeTodo (e) {
        e.preventDefault()
        const event = new CustomEvent('delete', {
            detail: this.#todo,
            bubbles: true,
            cancelable: true
        })
        this.#element.dispatchEvent( event )

        if (event.defaultPrevented) {
            return
        }
        this.#element.remove()
    }

    /**
     * Change l'état (à faire / fait) de la tâche
     * 
     * @param {HTMLInputElement} checkbox 
     */
    toggle (checkbox) {
        if (checkbox.checked) {
            this.#element.classList.add('is-completed')
        } else {
            this.#element.classList.remove('is-completed')
        }
        const event = new CustomEvent('toggle', {
            detail: this.#todo,
            bubbles: true
        })
        this.#element.dispatchEvent(event)
    }
}