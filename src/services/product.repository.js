import ProductDTO from "../dto/product.dto.js";

export class ProductRepository {
    constructor(dao) {
        this.dao = new dao();
    }

    async getPaginatedProducts(limit, page, query, sort) {
        return await this.dao.getPaginated(limit, page, query, sort);
    }

    async getProductById(productId) {
        return await this.dao.getById(productId);
    }

    async createProduct(product) {
        const productDto = new ProductDTO(product);
        return await this.dao.create(productDto);
    }

    async updateProduct(productId,productData)
    {
        return await this.dao.update(productId,productData);
    }

    async deleteProduct(productId)
    {
        return await this.dao.delete(productId);
    }
}