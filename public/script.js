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

function addInput(button) {
    // Procura pela div a adicionar elementos
    let div = window.document.querySelector(`.${button.id}-div`);

    let fields = div.querySelectorAll('input');

    // Realiza um clone do último item adicionado
    const newField = fields[fields.length - 1].cloneNode(true);

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.value == '') return false;

    // Deixa o valor do input vazio
    newField.value = '';
    div.appendChild(newField);

    // Foca no campo recém criado
    fields = div.querySelectorAll('input');
    fields[fields.length - 1].focus();
}