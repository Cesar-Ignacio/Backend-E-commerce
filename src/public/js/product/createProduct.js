import { agregarElementoAdmin, productCategoryList, renderListCategorys } from "../utils.js";

const userRole = document.querySelector('#userRole').value;
const form = document.querySelector("#form");
const pMensajeError = document.querySelector('#mensajeError');
const selectCategory=document.querySelector("#selectCategory");

document.addEventListener('DOMContentLoaded', () => {
    if (userRole === "ADMIN") {
        agregarElementoAdmin("/panelControl", "Panel de control");
    }
    renderListCategorys(selectCategory);
});



form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputTitle = document.querySelector('#title');
    const inputDescription = document.querySelector('#description');
    const inputPrice = document.querySelector('#price');
    const inputThumbnail = document.querySelector('#thumbnail');
    const inputCode = document.querySelector('#code');
    const inputStock = document.querySelector('#stock');
    const formData = new FormData();
    formData.append('title', inputTitle.value);
    formData.append('description', inputDescription.value);
    formData.append('price', inputPrice.value);
    formData.append('thumbnail', inputThumbnail.files[0]);
    formData.append('code', inputCode.value);
    formData.append('stock', inputStock.value);
    formData.append('category', selectCategory.value);
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