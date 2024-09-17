// import { io } from 'socket.io-client';
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import { agregarElementoAdmin, agregarElementoUserRegular } from "../utils.js";


const socketClient = io()

const catalogo = document.querySelector("#catalogo");
const spanLimit = document.querySelector("#limit");
const spanCantPro = document.querySelector("#cantPro");
const spantotPag = document.querySelector("#totPag");
const spanPage = document.querySelector("#page");
const btnNext = document.querySelector("#btnNext");
const btnPrev = document.querySelector("#btnPrev");
const cartId = document.querySelector('#cartId').value;
const userRole = document.querySelector('#userRole').value;
let next = true;
let previou = true;

socketClient.on("getProducts", data => {
    renderizarProductos(data)
})

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


const cardProduct = (pro) => {
    const cardProducto = document.createElement("div");
    cardProducto.setAttribute("style", "border: 2px solid gray;padding: 0.5em;")

    const contenedorImg = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("style", "width: 100%; height: 100%")
    img.alt = "img";
    img.src = `/static/upload/products/${pro.thumbnail}`;
    contenedorImg.appendChild(img);

    const contenedorInfo = document.createElement("div");
    contenedorInfo.setAttribute("style", "display:flex; flex-direction: column;")
    const titulo = document.createElement("strong");
    titulo.innerText = `${pro.title}`;
    const precio = document.createElement("strong");
    precio.innerText = `$${pro.price}`;
    contenedorInfo.append(titulo, precio);

    const btnSee = document.createElement("button");
    btnSee.innerText = "See";

    btnSee.addEventListener('click', async () => {
        window.location.href = `/productDetails/${pro._id}`;
    })

    const btnAddCart = document.createElement("button");
    btnAddCart.innerText = "Add Cart "
    btnAddCart.addEventListener('click', async () => {
        const response = await fetch(`/api/carts/${cartId}/product/${pro._id}`, {
            method: 'POST'
        })
        const { message } = await response.json();
        alert(`${message}`)
    })

    const btnEliminar = document.createElement("button");
    btnEliminar.innerText = "Delete";
    btnEliminar.addEventListener("click", async () => {
        const response = await fetch(`/api/products/${pro._id}`, {
            method: "DELETE"
        })
        const { message } = await response.json();
        alert(`${message}`)
    })

    cardProducto.append(contenedorImg, contenedorInfo, btnSee, btnEliminar, btnAddCart);

    catalogo.appendChild(cardProducto);
}

const renderizarProductos = (data) => {
    spanLimit.innerText = data.limit;
    spanCantPro.innerText = data.totalDocs;
    spanPage.innerText = data.page;
    spantotPag.innerText = data.totalPages;
    btnNext.value = data.nextPage;
    btnPrev.value = data.prevPage;
    previou = data.hasPrevPage;
    next = data.hasNextPage;
    catalogo.innerHTML = " ";
    data.docs.forEach(pro => {
        cardProduct(pro);
    })
}

btnNext.addEventListener('click', async ({ target: { value } }) => {
    if (next) {
        const res = await fetch(`/api/products?page=${value}`);
        const dataResponse = await res.json();
        renderizarProductos(dataResponse.data)
    }
});

btnPrev.addEventListener('click', async ({ target: { value } }) => {
    if (previou) {
        const res = await fetch(`/api/products?page=${value}`);
        const dataResponse = await res.json();
        renderizarProductos(dataResponse.data)
    }
});





