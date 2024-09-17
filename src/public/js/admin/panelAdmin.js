import { agregarElementoAdmin } from "../utils.js";

const userRole = document.querySelector('#userRole').value;

// Lista de usuarios simulada
const users = [
    { id: 1, name: 'César', email: 'cesar@mail.com', role: 'ADMIN', active: true },
    { id: 2, name: 'Maria', email: 'maria@mail.com', role: 'USER', active: true },
    { id: 3, name: 'Juan', email: 'juan@mail.com', role: 'USER', active: false },
    { id: 4, name: 'Ana', email: 'ana@mail.com', role: 'USER', active: true },
];

async function getUserList() {
    const response = await fetch("/api/users");
    const responseData = await response.json();
    return responseData.data;
}

// Renderizar usuarios en la tabla
async function renderUsers(usersList) {
    const tbody = document.querySelector('#usersTable tbody');
    tbody.innerHTML = ''; // Limpiar la tabla antes de renderizar
    usersList.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
                    <td>${user._id}</td>
                    <td>${user.fullName}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    
                `;
        const colum = document.createElement("td");
        const btnEliminar = document.createElement("button");
        const btnCambiarRole = document.createElement("button");
        btnEliminar.className = "delete-btn";
        btnEliminar.innerText = 'Eliminar';
        btnEliminar.addEventListener('click', () => deleteUser(user._id))
        btnCambiarRole.className = "role-btn";
        btnCambiarRole.innerText = "Cambiar Rol"
        btnCambiarRole.addEventListener('click', () => changeRole(user._id))
        colum.appendChild(btnEliminar)
        colum.appendChild(btnCambiarRole)
        row.appendChild(colum);
        tbody.appendChild(row);
    });
}

// Función para eliminar un usuario
async function deleteUser(userId) {
    const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
    });
    const responseData = await response.json();
    alert(responseData.message);
    const userList = await getUserList();
    renderUsers(userList);
}

// Función para cambiar el rol de un usuario
async function changeRole(userId) {
    const response = await fetch(`/api/users/premium/${userId}`, {
        method: 'PUT'
    })
    const responseData = await response.json();
    alert(responseData.message);
    const userList = await getUserList();
    renderUsers(userList);
}

// Función para eliminar usuarios inactivos
function deleteInactiveUsers() {
    const activeUsers = users.filter(user => user.active); // Filtrar solo los activos
    renderUsers(activeUsers);
}

// Evento para eliminar usuarios inactivos
document.getElementById('deleteInactiveBtn').addEventListener('click', deleteInactiveUsers);

// Renderizar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    if (userRole === "ADMIN") {
        agregarElementoAdmin("/panelControl", "Panel de control");
    }
    const userList = await getUserList();
    renderUsers(userList);
});
