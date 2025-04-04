import confetti from "canvas-confetti"

export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    confetti()
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
