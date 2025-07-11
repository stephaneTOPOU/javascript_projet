const div = document.querySelector('div');
console.log(div.dataset.user);

div.dataset.hello = "Bonjour";
console.log(div.dataset.hello);

const button = document.querySelector('button');

let i = 0;
const listener = () => {
    i++
    console.log(button.dataset.user);
    if (i >= 3) {
        button.removeEventListener('click', listener)        
    }
}
button.addEventListener('click', listener);


button.animate([    
    { transform: 'translateY(100px)' }    
], {
    duration: 1000,
    iterations: Infinity
})

window.addEventListener('resize', () =>{
    console.log(window.innerWidth, window.innerHeight)
})

const mediaQuery = window.matchMedia("(min-width: 400px)")
mediaQuery.matches

mediaQuery.addEventListener('change', () => {
    console.log(mediaQuery.matches) // true ou false suivant la taille de l'écran
})

const img = document.querySelector('img')

img.addEventListener('load', () => {
    console.log(img.width, img.height)
})
