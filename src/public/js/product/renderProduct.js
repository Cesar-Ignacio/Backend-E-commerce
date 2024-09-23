// import { io } from 'socket.io-client';
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import { agregarElementoAdmin, agregarElementoUserRegular, renderListCategorys} from "../utils.js";


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
const userEmail = document.querySelector('#userEmail').value;
const sortPrice = document.querySelector("#sortPrice");
const formProductSearch = document.querySelector("#formProductSearch");
const selectCategory = document.querySelector('#selectCategory');
const btnFiltro = document.querySelector("#btnFiltro");
const btnLimpiarFiltro = document.querySelector("#btnLimpiarFiltro");

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
    renderListCategorys(selectCategory);
});


const cardProduct = (product) => {
    const cardProducto = document.createElement("div");
    cardProducto.setAttribute("style", "border: 2px solid gray;padding: 0.5em;")

    const contenedorImg = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("style", "width: 100%; height: 100%")
    img.alt = "img";
    img.src = `/static/upload/products/${product.thumbnail}`;
    contenedorImg.appendChild(img);

    const contenedorInfo = document.createElement("div");
    contenedorInfo.setAttribute("style", "display:flex; flex-direction: column;")
    const titulo = document.createElement("strong");
    titulo.innerText = `${product.title}`;
    const precio = document.createElement("strong");
    precio.innerText = `$${product.price}`;
    contenedorInfo.append(titulo, precio);

    const btnSee = document.createElement("button");
    btnSee.innerText = "See";

    btnSee.addEventListener('click', async () => {
        window.location.href = `/productDetails/${product._id}`;
    })

    const btnAddCart = document.createElement("button");
    btnAddCart.innerText = "Add Cart "
    btnAddCart.addEventListener('click', async () => {
        const response = await fetch(`/api/carts/${cartId}/product/${product._id}`, {
            method: 'POST'
        })
        const { message } = await response.json();
        alert(`${message}`)
    })

    const btnEliminar = document.createElement("button");
    btnEliminar.innerText = "Delete";
    btnEliminar.addEventListener("click", async () => {
        fetch(`/api/products/${product._id}`, {
            method: "DELETE"
        }).then(response => response.json())
            .then(({ message }) => { alert(`${message}`) })

    })

    if (product.owner === userEmail || userRole === "ADMIN") {
        cardProducto.append(contenedorImg, contenedorInfo, btnSee, btnEliminar, btnAddCart);
    }
    else {
        cardProducto.append(contenedorImg, contenedorInfo, btnSee, btnAddCart);
    }

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
    data.docs.forEach(product => {
        cardProduct(product);
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

btnFiltro.addEventListener('click', async () => {
    const response = await fetch(`/api/products?sort=${sortPrice.value}&query={"category": "${selectCategory.value}"}`);
    const { data } = await response.json();
    renderizarProductos(data);
})

btnLimpiarFiltro.addEventListener('click', async () => {
    const response = await fetch('/api/products');
    const { data } = await response.json();
    renderizarProductos(data);
})

formProductSearch.addEventListener('submit', async (e) => {
    e.preventDefault();
    const productSearch = document.querySelector("#productSearch").value;
    const response = await fetch(`/api/products?keyword=${productSearch}`);
    const { data } = await response.json();
    renderizarProductos(data);
})

