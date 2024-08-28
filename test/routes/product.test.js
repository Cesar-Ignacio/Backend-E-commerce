import { expect } from "chai";
import supertest from "supertest";
import app from "../../src/app.js";
import path from 'path';
import * as url from 'url';

// Obtén __dirname
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const agent = supertest.agent(app);

describe('Product Integration Test Suite', function () {

    this.timeout(3000);
    this.productIdCreate;
    this.productIdCreateImg;

    it('GET /api/products should return a list of products', async function () {
        const { _body, statusCode } = await agent.get('/api/products/');
        expect(statusCode).to.equal(200);
        expect(_body.data.docs).to.be.an('array');
        expect(_body.data).to.have.property('limit').and.eql(3);
    });

    it('POST /api/sessions/login should log in a user', async function () {
        const loginTest = {
            email: "jose@gmail.com",
            password: "jose"
        }
        const { _body, statusCode } = await agent.post('/api/sessions/login').send(loginTest);
        expect(statusCode).eql(200);
        expect(_body).to.be.an('object');
    })

    it('POST /api/products/ should create a new product', async function () {
        const product = {
            title: "Test Product",
            description: "The best test product",
            price: 50,
            code: 'aaa111',
            stock: 10,
            category: 'qwerty'
        };
        const { _body, statusCode } = await agent.post('/api/products/').send(product);
        expect(statusCode).to.equal(201);
        expect(_body.data).to.be.an('object').and.to.have.property('_id');
        this.productIdCreate = _body.data._id;
    });

    it('POST /api/products/ should create a new product with an image', async function () {
        const product = {
            title: "Test Product",
            description: "The best test product",
            price: 50,
            code: 'aaa112',
            stock: 10,
            category: 'qwerty'
        };
        // Ruta al archivo de imagen que deseas adjuntar
        const imagePath = path.resolve(__dirname, 'img/antes.jpg');
        const { _body, statusCode } = await agent.post('/api/products/')
            .field(product) // Añadir los campos del producto
            .attach('thumbnail', imagePath); // Adjuntar el archivo con el nombre 'img'
        expect(statusCode).to.equal(201);
        expect(_body.data).to.be.an('object').and.to.have.property('_id');
        expect(_body.data).to.have.property('thumbnail').that.includes('antes.jpg');

        this.productIdCreateImg = _body.data._id;
    });

    it('POST /api/products/ should return 400 if required fields are missing', async function () {
        const incompleteProduct = {
            title: "Incomplete Product",
            price: 50
            // Falta 'description', 'code', 'stock', 'category'
        };
        const { _body, statusCode } = await agent.post('/api/products/').send(incompleteProduct);
        expect(statusCode).to.equal(400);
        expect(_body.message).to.equal('Faltan parámetros obligatorios o se enviaron vacíos');
    });

    it('GET /api/products/:productId should return a product', async function () {
        const { _body, statusCode } = await agent.get(`/api/products/${this.productIdCreate}`);
        expect(statusCode).to.equal(200);
        expect(_body.data).to.be.an('object').and.to.have.property('_id');
    })

    it('GET /api/products/:productId should not return product data for an invalid ID', async function () {
        const invalidProductId = "6655f2e1838f6059080e";
        const { _body, statusCode } = await agent.get(`/api/products/${invalidProductId}`);
        expect(statusCode).to.equal(400);
        expect(_body.data).to.not.have.property('_id')
    })

    it('GET /api/products should filter products by category', async function () {
        const { _body, statusCode } = await agent.get('/api/products?query={"category":"qwerty"}');
        expect(statusCode).to.equal(200);
        expect(_body.data.docs).to.be.an('array').that.is.not.empty;
        _body.data.docs.forEach(product => {
            expect(product.category).to.eql('qwerty');
        });
    });

    it('PUT /api/products/:productId should update an existing product', async function () {
        const updatedProduct = {
            title: "Test Product",
            description: "The best test product",
            price: 30, // modified price
            code: 'aaa111',
            stock: 10,
            category: 'qwerty'
        };
        const { _body, statusCode } = await agent.put(`/api/products/${this.productIdCreate}`).send(updatedProduct);
        expect(statusCode).to.equal(200);
        expect(_body.data).to.have.property('_id').to.eql(this.productIdCreate);
    });

    it('DELETE /api/products/:productId should delete an existing product', async function () {

        const productDeleteImg = await agent.delete(`/api/products/${this.productIdCreateImg}`);
        const { _body, statusCode } = await agent.delete(`/api/products/${this.productIdCreate}`);
        expect(productDeleteImg.statusCode).to.equal(200);
        expect(productDeleteImg._body.message).to.equal("Producto eliminado")
        expect(statusCode).to.equal(200);
        expect(_body.message).to.equal("Producto eliminado")
    })

});