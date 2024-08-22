const btnEndBuy = document.querySelector("#btnEndBuy");
const btnDeleteProduct = document.querySelectorAll('.btnDeleteProduct');
const cartId = document.querySelector("#cartId").value;

btnEndBuy.addEventListener("click", async (e) => {
    const response = await fetch(`/api/carts/${cartId}/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const responseData = await response.json()
    if (responseData.status) {
        window.location.href = `/ticket/${responseData.data._id}`;
    }
    else {
        alert(responseData.message);
    }
})

btnDeleteProduct.forEach(button => {
    button.addEventListener('click', async () => {
        const tagTr = button.closest('tr');
        const productId = tagTr.querySelector('input').value;
        const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: "DELETE"
        })
        const responseData = await response.json();
        alert(responseData.message)
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    });
});
