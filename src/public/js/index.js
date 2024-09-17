const btnLogout = document.querySelector("#btnlogout");

btnLogout.addEventListener('click', async () => {
    const response = await fetch('/api/sessions/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const responseData = await response.json();

    if (responseData.status) {
        window.location.href = responseData.data.url;
    }

});