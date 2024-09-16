import { agregarElementoAdmin } from "../utils.js";

const userRole = document.querySelector('#userRole').value;

// Lista de usuarios simulada
const users = [
    { id: 1, name: 'César', email: 'cesar@mail.com', role: 'ADMIN', active: true },
    { id: 2, name: 'Maria', email: 'maria@mail.com', role: 'USER', active: true },
    { id: 3, name: 'Juan', email: 'juan@mail.com', role: 'USER', active: false },
    { id: 4, name: 'Ana', email: 'ana@mail.com', role: 'USER', active: true },
];

// Renderizar usuarios en la tabla
function renderUsers(usersList) {
    const tbody = document.querySelector('#usersTable tbody');
    tbody.innerHTML = ''; // Limpiar la tabla antes de renderizar

    usersList.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>
                        <button class="delete-btn" onclick="deleteUser(${user.id})">Eliminar</button>
                        <button class="role-btn" onclick="changeRole(${user.id})">Cambiar Rol</button>
                    </td>
                `;

        tbody.appendChild(row);
    });
}

// Función para eliminar un usuario
function deleteUser(userId) {
    const index = users.findIndex(user => user.id === userId);
    if (index > -1) {
        users.splice(index, 1); // Eliminar del array
        renderUsers(users); // Volver a renderizar la lista
    }
}

// Función para cambiar el rol de un usuario
function changeRole(userId) {
    const user = users.find(user => user.id === userId);
    if (user) {
        user.role = user.role === 'ADMIN' ? 'USER' : 'ADMIN'; // Cambiar entre ADMIN y USER
        renderUsers(users); // Volver a renderizar la lista
    }
}

// Función para eliminar usuarios inactivos
function deleteInactiveUsers() {
    const activeUsers = users.filter(user => user.active); // Filtrar solo los activos
    renderUsers(activeUsers);
}

// Evento para eliminar usuarios inactivos
document.getElementById('deleteInactiveBtn').addEventListener('click', deleteInactiveUsers);

// Renderizar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    if (userRole === "ADMIN") {
        agregarElementoAdmin("/panelControl", "Panel de control");
    }
    renderUsers(users);
});
