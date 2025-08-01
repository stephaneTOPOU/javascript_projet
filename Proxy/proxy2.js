const state = {
    count: 0
}

const p = new Proxy(state, {
    get(target, prop, receiver) {
        console.log('Accès à une propriété:', prop)
        return Reflect.get(...arguments)
    },
    set(target, prop, value, receiver) {
        console.log('Modification de la propriété:', prop, 'avec la valeur:', value)
        return Reflect.set(...arguments)
    }
})

document.getElementById('increment').addEventListener('click', () => {
    p.count++
    document.getElementById('counter').value = p.count
})

document.getElementById('decrement').addEventListener('click', () => {
    p.count--
    document.getElementById('counter').value = p.count
})

document.getElementById('reset').addEventListener('click', () => {
    p.count = 0
    document.getElementById('counter').value = p.count
})

