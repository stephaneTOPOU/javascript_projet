// Exemple de Proxy pour intercepter les accès et modifications d'un objet
// et afficher des messages dans la console

const a = {
    b: 3
}

const p = new Proxy(a, {
    get(target, prop, receiver) {
        console.log('Accès à une propriété:', prop)
        return Reflect.get(...arguments)        
    },
    set(target, prop, value, receiver) {
        console.log('Modification de la propriété:', prop, 'avec la valeur:', value)
        return Reflect.set(...arguments)
    }
})
console.log(p.b)
p.b = 4
console.log(a)







// Exemple de Proxy pour valider les mises à jour d'un objet utilisateur
// avec des règles de validation pour l'âge

const person = {
    name: 'John Doe',
    age: 30
}

function updateUser(person) {
    person.age = 18 // Tentative de mise à jour de l'âge
    console.log(`Nom: ${person.name}, Âge: ${person.age}`) 
}

const majeurProxyHandler = {
    set(target, prop, value, receiver) {
        if (prop === 'age' && value < 18) {
            throw new Error('L\'utilisateur doit être majeur.')
        }
        return Reflect.set(...arguments)
    }
}
const aliveProxyHandler = {
    set(target, prop, value, receiver) {
        if (prop === 'age' && value > 100) {
            throw new Error('L\'utilisateur trop vieux.')
        }
        return Reflect.set(...arguments)
    }
}
const johnMajeur = new Proxy(new Proxy(person, majeurProxyHandler), aliveProxyHandler)

updateUser(johnMajeur) // Tentative de mise à jour de l'âge





// Exemple de Proxy pour gérer un objet avec des valeurs par défaut

const distribution = objWithDefault({}, [])
function objWithDefault(obj, initial) {
    return new Proxy(obj, {
        get(target, prop, receiver) {
            if (!(prop in target)) {
                Reflect.set(target, prop, structuredClone(initial))
            }
            return Reflect.get(...arguments)
        }
    })
}

distribution['john'].push('a')
distribution['john'].push('b')
distribution['john'].push('c')
distribution['jane'].push('d')

console.log(distribution) // { john: 5, jane: 1 }