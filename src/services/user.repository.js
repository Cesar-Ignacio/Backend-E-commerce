import UserDTO from "../dto/user.dto.js";

export class UserRepository {
    constructor(daoUser, daoCart) {
        this.daoUser = new daoUser();
        this.daoCart = new daoCart();
    }

    async findOneByEmail(email) {
        const user= await this.daoUser.getByEmail(email);
        if(!user)
        {
            return user
        }
        return new UserDTO(user);
    }

    async createUser(user) {
        const createUser = await this.daoUser.create(user);
        const createCart = await this.daoCart.create(createUser._id);
        const updateUser = await this.daoUser.update(createUser._id, { cart_id: createCart._id });
        return new UserDTO(updateUser);
    }
}