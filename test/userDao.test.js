import { expect } from "chai";
import MongoSingleton from "../src/db/mongo.singleton.js";
import { UsersDao } from "../src/dao/mongo/users.mdb.dao.js";


const userData = {
    firstName: 'Juan',
    lastName: 'Pérez',
    age: 25,
    email: 'example@gmail.com',
    password: 'HolaMundo'
};
describe('Test DAO USER', function () {
    this.timeout(3000); // Tiempo máximo para todas las pruebas

    before(function () {
        MongoSingleton.getInstance();
        this.dao = new UsersDao();
        this.user = {}; // Inicializar el objeto user
    });

    beforeEach(function () {
        this.timeout(3000); // Asegurar tiempo de espera para cada prueba
    });

    it('GET Debería retornar un array de usuario', async function () {
        const result = await this.dao.getAll();
        expect(result).to.not.be.empty;
        expect(result).to.be.an('array');
    });

    it('POST Debería crear un nuevo usuario', async function () {
        const result = await this.dao.create(userData);
        expect(result).to.be.an('object');
        expect(result).to.have.property('_id');
        this.user.id = result._id;
        this.user.email = result.email;
    });

    it('POST No debería aceptar un usario con el mismo email', async function () {
        try {
            // Intentar crear un nuevo usuario con el email duplicado
            await this.dao.create(userData);
            // Si llegamos aquí, significa que no se lanzó el error y la prueba debe fallar
            throw new Error('El sistema permitió la creación de un usuario con email duplicado');
        } catch (error) {
            expect(error).to.exist;
            expect(error.message).to.include('duplicate key error');
        }
    });

    it('GET Debería retornar un usuario por su ID', async function () {
        const user = await this.dao.getById(this.user.id);
        expect(user).to.be.an('object');
        expect(user._id.toString()).to.eql(this.user.id.toString());
    });

    it('GET Debería retornar un usuario por su EMAIL', async function () {
        const user = await this.dao.getByEmail(this.user.email);
        expect(user).to.be.an('object');
        expect(user.email.toString()).to.eql(this.user.email.toString());
    });

    it('PUT Debería actualizar un usuario existente', async function () {
        userData.age = 50;
        const user = await this.dao.update(this.user.id, userData);
        expect(user).to.be.an('object');
        expect(user).to.have.property('age').and.be.eql(50);
    });

    it('DELETE Debería eliminar un usuario', async function () {
        const user = await this.dao.delete(this.user.id);
        const foundUser = await this.dao.getById(user._id);
        expect(user).to.be.an('object');
        expect(foundUser).to.be.null;
    });
});


