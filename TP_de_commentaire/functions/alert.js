
/**
 * 
 * @param {string} message 
 * @param {string} typpe 
 * @return {HTMLElement}
 * @description Crée un élément d'alerte avec le message spécifié.
 */
export function alertElement(message, type = 'danger') {
    const el = document.querySelector('#alert').content.firstElementChild.cloneNode(true);
    el.classList.add(`alert-${type}`) // Ajoute la classe de type d'alerte
    el.querySelector('.js-text').innerText = message;
    el.querySelector('button').addEventListener('click', e => {
        e.preventDefault()
        el.remove()
        el.dispatchEvent(new CustomEvent('close'))
    })
    return el
}