const form = document.querySelector("form");
const userId = document.querySelector('#userId').value;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`api/users/premium/${userId}`, {
            method: 'PUT'
        });
        const responseData = await response.json();
        alert(responseData.message)
    } catch (error) {
        alert('Ocurrió un error al subir los documentos.');
        console.error(error);
    }

})

