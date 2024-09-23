export class CartRepository {
    constructor(dao) {
        this.dao = new dao();
    }

    async getCartById(cartId) {
        return await this.dao.getById(cartId);
    }

    async getCartByUserId(userId)
    {
        return await this.dao.getByUserId(userId);
    }

    async createCart(userId) {
        return await this.dao.create(userId);
    }

    async addProductCart(cartId, productId) {
        return await this.dao.add(cartId, productId);
    }

    async deleteProductFromCartById(cartId, productId) {
        return await this.dao.delete(cartId, productId);
    }

    async updateProductQuantity(cartId, productId, quantity) {
        return await this.dao.update(cartId, productId, quantity);
    }

    async deleteAllProductsCart(cartId) {
        return await this.dao.deleteAll(cartId);
    }

    async deleteCart(cartId){
        return await this.dao.deleteCart(cartId);
    }

    async checkProductExistsInCart(cartId,productId)
    {
        return await this.dao.getByCartIdAndProductId(cartId,productId);
    }

}