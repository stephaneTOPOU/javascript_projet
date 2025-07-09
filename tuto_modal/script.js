function openModal(modal) {
    modal.style.display = null
    modal.setAttribute('aria-hidden', 'false')
    modal.querySelector('input, textarea, button')?.focus()
    document.body.style.overflow = 'hidden'
}

function closeModal(modal) {
    modal.setAttribute('aria-hidden', 'true')
    modal.addEventListener('animationend', () => {
        modal.style.display = 'none'
        document.body.style.overflow = ''
    }, { once: true })
}

// Gestion des modales existantes dans la page
document.querySelectorAll('.js-modal').forEach(link => {
    link.addEventListener('click', async e => {
        e.preventDefault()
        const target = link.getAttribute('href')

        if (target.startsWith('#')) {
            // modale locale
            const modal = document.querySelector(target)
            if (modal) openModal(modal)
        } else {
            // Chargement ajax
            const url = target.split('#')[0]
            const hash = target.split('#')[1]

            try {
                const response = await fetch(url)
                const html = await response.text()
                const wrapper = document.createElement('div')
                wrapper.innerHTML = html

                const newModal = wrapper.querySelector('#' + hash)
                if (newModal) {
                    document.body.appendChild(newModal)
                    openModal(newModal)
                }
            } catch (err) {
                console.error('Erreur chargement Ajax :', err)
            }
        }
    })
})

// Fermeture modale
document.addEventListener('click', e => {
    if (e.target.classList.contains('js-close-modal')) {
        const modal = e.target.closest('.modal')
        closeModal(modal)
    }
})

// Touche échappement
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal[aria-hidden="false"]')
        if (modal) closeModal(modal)
    }
})
