const buttons = window.document.querySelectorAll('.add-field');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function (event) {
        // Procura pela div a adicionar elementos
        let div = window.document.querySelector(`.${event.target.id}-div`);
        
        const fields = div.querySelectorAll('input');
        
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
    })
}