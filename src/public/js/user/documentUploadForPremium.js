const uploadForm = document.querySelector("#uploadForm");
const documents = document.querySelector('#documents');
const userId = document.querySelector('#userId').value;

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const file of documents.files) {
        formData.append('documents', file);
    }

    const response = await fetch(`api/users/${userId}/documents`, {
        method: 'POST',
        body: formData
    })

    const responseData = await response.json();
    alert(responseData.message);
})

window.onload = () => {
    console.log("Hola mundo")
}

/**
 * Validar que sean tres docs
 * Si ya cuenta con los tres documentos no podra cargar mas
 * El usuario premium podra dejar de ser premium.
*/