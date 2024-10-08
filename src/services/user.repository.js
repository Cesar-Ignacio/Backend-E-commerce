import { DateTime } from "luxon";

import UserDTO from "../dto/user.dto.js";
export class UserRepository {
    constructor(daoUser, daoCart) {
        this.daoUser = new daoUser();
        this.daoCart = new daoCart();
    }

    async getUserList() {
        const userList = await this.daoUser.getUserAll();
        const list = userList.map((user) => {
            return new UserDTO(user).getPublicFields();
        })
        return list;
    }

    async getUserListDev() {
        const userList = await this.daoUser.getUserAll();
        const list = userList.map((user) => {
            return new UserDTO(user).getPublicFieldsDev();
        })
        return list;
    }

    async findOneByEmail(email) {
        const user = await this.daoUser.getByEmail(email);
        if (!user) {
            return user
        }
        return new UserDTO(user);
    }

    async findOneById(userId) {
        const user = await this.daoUser.getById(userId);
        return user;
    }

    async createUser(user) {
        const createUser = await this.daoUser.create(user);
        const createCart = await this.daoCart.create(createUser._id);
        const updateUser = await this.daoUser.update(createUser._id, { cart_id: createCart._id });
        return new UserDTO(updateUser);
    }

    async UserRoleChange(user) {
        const roles = {
            "PREMIUM": "USER",
            "USER": "PREMIUM"
        };
        const newRole = roles[user.role.toUpperCase()]
        const updateUser = await this.daoUser.update(user._id, { role: newRole })
        return new UserDTO(updateUser);
    }

    async changeUserPassword(userId, password) {
        const updateUser = await this.daoUser.update(userId, { password })
        return new UserDTO(updateUser);
    }

    async updateLastConnection(userId) {
        const updateUser = await this.daoUser.update(userId, { last_connection: DateTime.now() })
        return new UserDTO(updateUser);
    }

    async addDocumentToUserDocumentsField(userId, documents) {
        const updatedUser = await this.daoUser.addDocument(userId, documents)
        return new UserDTO(updatedUser)
    }

    async deleteUser(userId) {
        return await this.daoUser.delete(userId);
    }

}