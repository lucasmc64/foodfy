const buttonChangeDisplay = window.document.querySelectorAll('.change-display');
const hideAndShow = window.document.querySelectorAll('.hide-and-show');

for (let i = 0; i < buttonChangeDisplay.length; i++) {
    buttonChangeDisplay[i].addEventListener('click', () => {
        if(!hideAndShow[i].classList.contains('hide')) {
            hideAndShow[i].classList.add('hide');
            buttonChangeDisplay[i].textContent = 'Mostrar';
        } else {
            hideAndShow[i].classList.remove('hide');
            buttonChangeDisplay[i].textContent = 'Esconder';
        }
    })
}