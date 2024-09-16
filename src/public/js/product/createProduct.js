import { agregarElementoAdmin } from "../utils.js";

const userRole = document.querySelector('#userRole').value;
const form = document.querySelector("#form");
const pMensajeError = document.querySelector('#mensajeError');


document.addEventListener('DOMContentLoaded', () => {
    if (userRole === "ADMIN") {
        agregarElementoAdmin("/panelControl", "Panel de control");
    }
    renderUsers(users);
});



form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputTitle = document.querySelector('#title');
    const inputDescription = document.querySelector('#description');
    const inputPrice = document.querySelector('#price');
    const inputThumbnail = document.querySelector('#thumbnail');
    const inputCode = document.querySelector('#code');
    const inputStock = document.querySelector('#stock');
    const inputCategory = document.querySelector('#category');
    const formData = new FormData();
    formData.append('title', inputTitle.value);
    formData.append('description', inputDescription.value);
    formData.append('price', inputPrice.value);
    formData.append('thumbnail', inputThumbnail.files[0]);
    formData.append('code', inputCode.value);
    formData.append('stock', inputStock.value);
    formData.append('category', inputCategory.value);
    const response = await fetch('/api/products', {
        method: 'POST',
        body: formData
    })
    const responseData = await response.json();
    const { status, message, data } = responseData;
    if (status) {
        pMensajeError.innerText = `${message}`
    }
    else {
        //console.log(responseData);
        pMensajeError.innerText = `${data.errorDescription.message}`
    }

})