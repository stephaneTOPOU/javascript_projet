//1ere méthode
// Intersection Observer with CSS class toggle
const observer1 = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');            
        } 
    }
}, {
    rootMargin: '50px 50px 50px 50px',
})

observer1.observe(document.querySelector('.btn1'));
observer1.observe(document.querySelector('.btn2'));


//2eme méthode
// Intersection Observer with animation
const observer2 = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            entry.target.animate([
                { transform: 'translateX(-50px)', opacity: 0 },
                { transform: 'translateX(0)', opacity: 1 }                
            ], {
                duration: 500,
                iterations: 1,
                fill: 'forwards'
            });
            observer2.unobserve(entry.target); // Stop observing after animation
        } 
    }
})

observer2.observe(document.querySelector('.btn1'));
observer2.observe(document.querySelector('.btn2'));

observer2.disconnect(); // Disconnect the observer when not needed anymore