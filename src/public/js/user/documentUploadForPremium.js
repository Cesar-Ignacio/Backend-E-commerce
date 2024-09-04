const uploadForm = document.querySelector("#uploadForm");
const documents = document.querySelector('#documents');
const userId = document.querySelector('#userId').value;
const hasDocuments = document.querySelector("#hasDocuments").value;
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const files = documents.files;
    let userConfirmation = true;
    if (JSON.parse(hasDocuments)) {
        userConfirmation = confirm("Ya tienes documentos cargados. ¿Deseas reemplazarlos con los nuevos?");
    }

    if (userConfirmation) {
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
            reloadPageAfterDelay(100);
        } catch (error) {
            alert('Ocurrió un error al subir los documentos.');
            console.error(error);
        }
    } else {
        alert("La subida de documentos ha sido cancelada.");
    }


});

function reloadPageAfterDelay(delay = 1000) {
    setTimeout(() => {
        window.location.reload();
    }, delay);
}


