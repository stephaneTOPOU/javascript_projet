import confetti from 'canvas-confetti';
import './style.scss';
import('./counter.js').then((module) => {
    module.setupCounter(document.querySelector('button') );
});

console.log(import.meta.env.VITE_API_ENDPOINT);



confetti()