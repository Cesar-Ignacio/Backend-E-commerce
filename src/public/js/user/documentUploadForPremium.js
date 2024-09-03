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

/**Cambiar el rol del user a premium si carga los 3 docs correctamente
 * Hablitar las policas, solos los usuarios comunes o premium pueden acceder a este recurso
*/