import { faker } from "@faker-js/faker";

const generateMockProducts=(quantity=100)=>{
    const products = [];
    for (let x = 0; x < quantity; x++) {
        products.push({
            _id: faker.database.mongodbObjectId(),
            code: faker.string.uuid(),
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            category: faker.hacker.noun(),
            price: parseFloat(faker.commerce.price()),
            stock: faker.number.int(100),
            status: faker.datatype.boolean(),
            thumbnail: faker.image.avatar()
        })
    }
    return products;
}

export default generateMockProducts;