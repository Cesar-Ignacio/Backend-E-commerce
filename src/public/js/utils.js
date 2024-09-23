
/**
  * Función que agrega un nuevo elemento de la lista para el administrador
  * @param {string} href - El enlace al que debe apuntar el nuevo elemento
  * @param {string} texto - El texto que se mostrará en el enlace
  */

export function agregarElementoAdmin(href, texto) {
    const ulTag = document.querySelector("ul");
    const liTags = document.querySelectorAll("ul li");
    liTags[1].remove()
    liTags[2].remove()
    liTags[4].remove()
    liTags[5].remove()
    if (ulTag) {
        const newLi = document.createElement("li");
        const ancla = document.createElement("a");
        ancla.href = href;
        ancla.textContent = texto;
        newLi.appendChild(ancla);
        ulTag.appendChild(newLi);
    } else {
        console.error("No se encontró la lista en el DOM");
    }
}

export function agregarElementoUserRegular() {
    const liTags = document.querySelectorAll("ul li");
    liTags[3].remove()
}

export const productCategoryList = [
    "Televisions",
    "Refrigerators",
    "Washing Machines",
    "Air Conditioners",
    "Microwaves",
    "Laptops",
    "Smartphones",
    "Speakers",
    "Vacuum Cleaners",
    "Dishwashers",
    "Headphones"
];

export const renderListCategorys = (tag) => {
    productCategoryList.forEach(name => {
        const optionTag = document.createElement('option');
        optionTag.innerText = name;
        optionTag.value = name;
        tag.appendChild(optionTag);
    })
}
