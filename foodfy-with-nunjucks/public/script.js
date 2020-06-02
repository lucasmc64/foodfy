const modalOverlay = window.document.querySelector('.modal-overlay')
const foods = window.document.querySelectorAll('.food')


for (let food of foods) {
    food.addEventListener("click", function () {
        const imageSource = food.querySelector('img').getAttribute('src')
        const foodName = food.querySelector('h3').textContent
        const foodAuthor = food.querySelector('p').textContent

        modalOverlay.classList.add('active')

        modalOverlay.querySelector('div.image').style.background = `url("${imageSource}") no-repeat center center / cover`
        modalOverlay.querySelector('h3').textContent = foodName
        modalOverlay.querySelector('p').textContent = foodAuthor
    })
}

modalOverlay.querySelector('button#close').addEventListener("click", function () {
    modalOverlay.classList.remove('active')
})