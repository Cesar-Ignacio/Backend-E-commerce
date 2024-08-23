const btnEndBuy = document.querySelector("#btnEndBuy");
const btnDeleteProduct = document.querySelectorAll('.btnDeleteProduct');
const cartId = document.querySelector("#cartId").value;
const btnIncrement = document.querySelectorAll(".btnIncrement");
const btnDecrement = document.querySelectorAll(".btnDecrement");


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
        reloadPageAfterDelay();
    });
});

btnIncrement.forEach(btn => {
    btn.addEventListener("click", async (e) => {
        const tagTr = btn.closest('tr');
        const input = tagTr.querySelector("td > input");
        const productId = tagTr.querySelector('input').value;
        const data = {
            quantity: parseInt(input.value) + parseInt(1)
        }
        const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        reloadPageAfterDelay();
    })
})

btnDecrement.forEach(btn => {
    btn.addEventListener("click", async (e) => {
        const tagTr = btn.closest('tr');
        const input = tagTr.querySelector("td > input")
        const productId = tagTr.querySelector('input').value;
        if (input.value > 1) {
            const data = {
                quantity: parseInt(input.value) - parseInt(1)
            }
            const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            reloadPageAfterDelay();
        }
    })
})

function reloadPageAfterDelay(delay = 1000) {
    setTimeout(() => {
        window.location.reload();
    }, delay);
}

window.onload = () => {
    const totalSpan = document.querySelector("#total");
    const tagsTr = document.querySelectorAll("tr");
    let total = 0;
    tagsTr.forEach(tr => {
        const tdPrice = tr.querySelector("td.price");
        const quantityInput = tr.querySelector("td > input");

        if (tdPrice && quantityInput) {
            const priceText = tdPrice.innerText.trim();
            const quantityValue = quantityInput.value.trim();

            const price = parseFloat(priceText);
            const quantity = parseFloat(quantityValue);

            if (!isNaN(price) && !isNaN(quantity)) {
                total += price * quantity;
            } else {
                console.log("Error: Invalid price or quantity");
            }
        }
    });
    totalSpan.innerText = total

};