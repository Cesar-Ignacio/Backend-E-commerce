const uploadForm = document.querySelector("#uploadForm");
const documents = document.querySelector('#documents');
const userId = document.querySelector('#userId').value;

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    const files = documents.files; 

    if (files.length !== 3) {
        alert('Debes subir exactamente 3 documentos.');
        return; 
    }
    
    for (const file of files) {
        formData.append('documents', file);
    }

    try {
        const response = await fetch(`api/users/${userId}/documents`, {
            method: 'POST',
            body: formData
        });

        const responseData = await response.json();
        alert(responseData.message);
    } catch (error) {
        alert('Ocurrió un error al subir los documentos.');
        console.error(error);
    }
});




/**
 * 
 * Si ya cuenta con los tres documentos no podra cargar mas
 * El usuario premium podra dejar de ser premium.
*/