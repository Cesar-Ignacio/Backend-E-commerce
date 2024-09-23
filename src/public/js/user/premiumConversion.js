import { agregarElementoAdmin, agregarElementoUserRegular } from "../utils.js";

const form = document.querySelector("form");
const userId = document.querySelector('#userId').value;
const userRole = document.querySelector('#userRole').value;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`api/users/premium/${userId}`, {
            method: 'PUT'
        });
        const responseData = await response.json();
        alert(responseData.message)
        reloadPageAfterDelay(100);
    } catch (error) {
        alert('Ocurrió un error al subir los documentos.');
        console.error(error);
    }

})

function reloadPageAfterDelay(delay = 1000) {
    setTimeout(() => {
        window.location.reload();
    }, delay);
}

document.addEventListener("DOMContentLoaded", () => {
    switch (userRole) {
        case "ADMIN":
            agregarElementoAdmin("/panelControl", "Panel de control");
            break;
        case "USER":
            agregarElementoUserRegular();
            break;
        default:
            console.warn('Rol de usuario no reconocido:', userRole);
            break;
    }
});