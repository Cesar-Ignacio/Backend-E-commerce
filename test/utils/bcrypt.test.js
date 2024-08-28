import Assert from 'assert'
import MongoSingleton from '../../src/db/mongo.singleton.js'
import { checkPassword, hashPassword } from '../../src/utils/bcrypt.js';

MongoSingleton.getInstance();

const assert = Assert.strict;

describe('test de bcrypt', () => {
    before(function () {
        this.passwordTest = "HolaMundo";
    });

    it('debería hashear la contraseña correctamente', async function () {
        const passHas = await hashPassword(this.passwordTest);
        assert.notDeepEqual(passHas, this.passwordTest);
        this.passHas = passHas;
    });

    it('debería comparar correctamente la contraseña hasheada', async function () {
        const result = await checkPassword(this.passwordTest, this.passHas);
        assert.deepEqual(result, true);
    });

    it('debería fallar la comparación si el hash de la contraseña es modificado', async function () {
        const passHasModificado = this.passHas + "45";
        const result = await checkPassword(this.passwordTest, passHasModificado);
        assert.deepEqual(result, false);
    });

    it('debería manejar un hash inválido', async function () {
        const invalidHash = "invalid_hash";
        try {
            await checkPassword(this.passwordTest, invalidHash);
            assert.fail("La función no debería aceptar un hash inválido");
        } catch (error) {
            assert.ok(error instanceof Error, "Se esperaba que se lanzara un error");
        }
    });
});
