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

const PhotosUpload = {
    input: '',

    preview: window.document.querySelector('#photos-preview'),

    uploadLimit: 6,

    files: [],

    handleFileInput(event) {
        const { files: fileList } = event.target

        PhotosUpload.input = event.target
        
        if(!PhotosUpload.hasLimit(event))

        Array.from(fileList).forEach((file) => {
            PhotosUpload.files.push(file)

            const reader = new FileReader() // Permite ler arquivos

            reader.onload = () => { // Executa quando o arquivo estiver lido, carregado

                const image = new Image() // Mesma coisa que <img />

                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file) // Transforma a imagem em uma URL no formato BLOB
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },

    hasLimit(event) {
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input

        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos.`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach((item) => {
            if(item.classList && item.classList.value == 'photo') {
                photosDiv.push(item)
            }
        })

        const totalPhotos = fileList.length + photosDiv.length

        if(totalPhotos > uploadLimit) {
            alert('Você atingiu o limite máximo de fotos')
            event.preventDefault()
            return true
        }

        return false
    },

    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach((file) => dataTransfer.items.add(file))

        return dataTransfer.files
    },

    getContainer(image) {
        const div = window.document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },

    getRemoveButton() {
        const button =  window.document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },

    removePhoto(event) {
        const photoDiv = event.target.parentNode // <div class="photo"><i></div>
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    },

    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode

        if(photoDiv.id) {
            const removedFiles = window.document.querySelector('input[name="removed_files"]')

            if(removedFiles) {
                removedFiles.value += `${photoDiv.id},`
            }
        }

        photoDiv.remove()
    }
}

const ImageGallery = {
    highlight: window.document.querySelector('.gallery .highlight > img'),
    previews: window.document.querySelectorAll('.gallery-preview img'),
    setImage(event) {
        const { target } = event

        ImageGallery.previews.forEach((preview) => preview.classList.remove('active'))

        target.classList.add('active')

        ImageGallery.highlight.src = target.src
        LightBox.image.src = target.src
    }
}