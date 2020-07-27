function hideAndShow(buttonToHideAndShow) {
    const infoToHideAndShow = buttonToHideAndShow.parentNode.parentNode.querySelector('.hide-and-show')

    if (!infoToHideAndShow.classList.contains('hide')) {
        infoToHideAndShow.classList.add('hide');
        buttonToHideAndShow.textContent = 'Mostrar';
    } else {
        infoToHideAndShow.classList.remove('hide');
        buttonToHideAndShow.textContent = 'Esconder';
    }
}