import { Router } from "express";
import PDFDocument from 'pdfkit';
import { ticketService } from "../services/index.js";

const routes = Router();


routes.get('/generateTicketPdf/:ticketId', async (req, res) => {
    const { ticketId } = req.params;

    const ticket = await ticketService.getTicketById(ticketId);

    // Crea un nuevo documento PDF
    const doc = new PDFDocument();

    // Configura la respuesta para que sea un PDF
    res.setHeader('Content-Type', 'application/pdf');

    // El flujo del PDF va directamente a la respuesta
    doc.pipe(res);

    // Encabezado
    doc.fontSize(25).text(`Ticket #${ticket.code}`, { align: 'center' });
    doc.moveDown();

    // Información del comprador
    doc.fontSize(15).text(`Comprador: ${ticket.purchaser}`);
    doc.text(`Fecha de compra: ${new Date(ticket.purchase_datetime).toLocaleString()}`);
    doc.moveDown();

    // Detalle de productos
    doc.fontSize(18).text('Detalle de productos:', { underline: true });
    doc.moveDown();

    ticket.products.forEach(product => {
        doc.fontSize(12).text(`Producto: ${product.title}`);
        doc.text(`Código: ${product.code}`);
        doc.text(`Cantidad: ${product.quantity}`);
        doc.text(`Precio unitario: $${product.price.toFixed(2)}`);
        doc.moveDown();
    });

    // Total
    doc.moveDown();
    doc.fontSize(20).text(`Total: $${ticket.amount.toFixed(2)}`, { align: 'right' });

    // Termina el documento
    doc.end();

})

export default routes;