const ticketId=document.querySelector("#ticketId").value;

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch(`/api/ticket/generateTicketPdf/${ticketId}`);
    const responseData = await response.blob();
    const url = URL.createObjectURL(responseData);
    document.getElementById('pdfViewer').src = url;
});