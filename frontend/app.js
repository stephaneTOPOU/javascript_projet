
/**
 * Créé un élément HTML représentant un article
 * 
 * @param {{ title:string, body:string }} post 
 * @return {HTMLElement}
 */
function createArticle(post) {
    const article = document.createElement('article')
    article.append(createElementWithText('h2', post.title))
    article.append(createElementWithText('p', post.body))
    return article
}

function createElementWithText(tagName, content) {
    const element = document.createElement(tagName)
    element.innerText = content
    return element
}

async function main() {
    const wrapper = document.querySelector('#lastPost')
    const loader = document.createElement('p')
    loader.innerText = 'Chargement...'
    wrapper.append(loader)
    try {
        const r = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
            headers: {
                Accept: 'application/json'
            }
        })

        if (!r.ok) {
            throw new Error('Erreur serveur')
        }

        const posts = await r.json()
        loader.remove()

        for (let post of posts) {
            console.log(createArticle(post))
            wrapper.append(createArticle(post))
        }
    } catch (error) {
        loader.innerText = 'Impossible de charger les articles'
        loader.style.color = 'red'
    }

}


main()
