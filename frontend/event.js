document.querySelectorAll('.spoiler').forEach(spoiler => {
    spoiler.addEventListener('click', e => {
        e.currentTarget.classList.remove('spoiler') //ou spoiler.classList.remove('spoiler')
    })
})




//Pour supprimer tous les spoilers en même temps
const spoilers = document.querySelectorAll('.spoiler');

function revealSpoiler() {
    spoilers.forEach(spoiler => spoiler.classList.remove('spoiler'))
}
spoilers.forEach(spoiler => {
    spoiler.addEventListener('click', revealSpoiler)
})