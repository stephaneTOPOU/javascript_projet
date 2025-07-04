import { alertElement } from "./functions/alert.js"
import { fetchJSON } from "./functions/api.js"

class InfinitePagination {

    /** @type {string} */
    #endpoint
    /** @type {HTMLTemplateElement} */
    #template
    /** @type {HTMLElement} */
    #target
    /** @type {HTMLElement} */
    #loader
    /** @type {object} */
    #elements
    /** @type {IntersectionObserver} */
    #observer
    /** @type {boolean}*/
    #loading = false
    /** @type {number} */
    #Page = 1

    /**
     * 
     * @param {HTMLElement} element 
     */

    constructor(element) {
        this.#loader = element
        this.#endpoint = element.dataset.endpoint
        this.#template = document.querySelector(element.dataset.template)
        this.#target = document.querySelector(element.dataset.target)
        this.#elements = JSON.parse(element.dataset.elements)

        this.#observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    this.#loadMore()
                }
            }
        })
        this.#observer.observe(element)

    }

    async #loadMore() {
        if (this.#loading) return
        this.#loading = true
        try {
            const url = new URL(this.#endpoint)
            url.searchParams.set('_page', this.#Page)
            const comments = await fetchJSON(url.toString())
            if (comments.length === 0) {
                this.#observer.disconnect()
                this.#loader.remove()
                //console.log('Aucun commentaire à charger')
                return
            }
            for (const comment of comments) {
                const commentElement = this.#template.content.cloneNode(true)
                // Injecte les données du commentaire dans les bons éléments
                for (const [key, selector] of Object.entries(this.#elements)) {
                    commentElement.querySelector(selector).innerText = comment[key]
                }
                this.#target.append(commentElement)
            }
        } catch (e) {
            //console.error('Erreur lors du chargement des commentaires :', error)
            this.#loader.style.display = 'none'
            const error = alertElement('Impossible de charger les contenus')
            error.addEventListener('close', () => {
                this.#loader.style.removeProperty('display')
                this.#loading = false
            })
            this.#target.append(error)
        }
        this.#Page++
        this.#loading = false
    }


}



class FetchForm {

    /** @type {string} */
    #endpoint
    /** @type {HTMLTemplateElement} */
    #template
    /** @type {HTMLElement} */
    #target
    /** @type {object} */
    #elements


    /**
     * @param {HTMLFormElement} form 
     */
    constructor(form) {
        this.#endpoint = form.dataset.endpoint
        this.#template = document.querySelector(form.dataset.template)
        this.#target = document.querySelector(form.dataset.target)
        this.#elements = JSON.parse(form.dataset.elements)
        form.addEventListener('submit', e => {
            e.preventDefault()
            this.#submitForm(e.currentTarget)
        })
    }

    /**
     * @param {HTMLFormElement} form 
     */
    async#submitForm(form) {
        const button = form.querySelector('button')
        button.setAttribute('disabled', '')
        try {
            const data = new FormData(form)
            const comment = await fetchJSON(this.#endpoint, {
                method: 'POST',
                body: JSON.stringify(Object.fromEntries(data)),
                json: Object.fromEntries(data),
            })
            const commentElement = this.#template.content.cloneNode(true)
            // Injecte les données du commentaire dans les bons éléments
            for (const [key, selector] of Object.entries(this.#elements)) {
                commentElement.querySelector(selector).innerText = comment[key]
            }
            this.#target.prepend(commentElement)
            form.reset()
            button.removeAttribute('disabled')

            form.insertAdjacentElement(
                'beforebegin',
                alertElement(`Commentaire envoyé avec succès !`, 'success')
            )
        } catch (e) {
            const errorElement = alertElement('Impossible d\'envoyer le commentaire', 'danger')
            form.insertAdjacentElement(
                'beforebegin',
                errorElement
            )
            errorElement.addEventListener('close', () => {
                //errorElement.remove()
                button.removeAttribute('disabled')
            })
        }
    }

}
document.querySelectorAll('.js-infinite-pagination').forEach(el => new InfinitePagination(el))
document.querySelectorAll('.js-form-fetch').forEach(form => new FetchForm(form))