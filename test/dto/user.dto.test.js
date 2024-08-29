import { expect } from "chai";
import UserDTO from "../../src/dto/user.dto.js";

describe('Test DTO USER', async function () {

    it('should correctly create a UserDTO from user data', async function () {
        const userDB = {
            _id: '603c5f4f6f1b2c001f647c4e',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            age: 30,
            cart_id: '603c5f4f6f1b2c001f647c4f',
            password: 'securepassword123',
            role: 'user'
        };
        const userDto = new UserDTO(userDB);
        console.log(typeof userDto)
       expect(userDto).to.be.an('object');
        expect(userDto).to.have.property('fullName');
    })
})