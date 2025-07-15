/**
 * Intéragit avec une API JSON
 * @param {string} url 
 * @param {RequestInit & {json?: object}} options
 * @returns {Promise<any>}
 */
export async function fetchJSON(url, options = {}) {
    const headers = { Accept: 'application/json', ...options.headers }

    if (options.json) {
        options.body = JSON.stringify(options.json)
        headers['Content-Type'] = 'application/json'
    }

    try {
        const response = await fetch(url, { ...options, headers })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Erreur serveur (${response.status}) : ${errorText}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Erreur fetchJSON:', error.message)
        throw error // Laisse le code appelant gérer l'erreur si besoin
    }
}
