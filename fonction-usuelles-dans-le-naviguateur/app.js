const h1 = document.querySelector('h1');
console.log(
    'position par rapport au haut',
    window.scrollY + h1.getBoundingClientRect().y,
    recursiveOffsetTop(h1)
)

// La fonction getBoundingClientRect() renvoie la position de l'élément par rapport à la fenêtre du navigateur
// 1ere méthode
function recursiveOffsetTop(element) {
    if (element.offsetParent) {
        return element.offsetTop + recursiveOffsetTop(element.offsetParent);
    } else {
        return element.offsetTop;
    }

}

// La fonction getBoundingClientRect() renvoie la position de l'élément par rapport à la fenêtre du navigateur
// 2eme méthode
function boucle_recursiveOffsetTop(element) {
    let top = 0;
    while (element.offsetParent) {
        top += element.offsetTop;
        element = element.offsetParent;
    }
    return top;
}

document.querySelector('div').addEventListener('mousemove', e => {
    console.log(e)
})

