import { CartRepository } from "./cart.repository.js";
import { MessageRepository } from "./message.repository.js";
import { ProductRepository } from "./product.repository.js";
import { CartDao } from "../dao/mongo/carts.mdb.dao.js";
import { MessagesDao } from "../dao/mongo/messages.mdb.dao.js";
import { ProductsDao } from "../dao/mongo/products.mdb.dao.js";
import { UsersDao } from "../dao/mongo/users.mdb.dao.js";
import { UserRepository } from "./user.repository.js";

export const cartService = new CartRepository(CartDao);
export const messageService = new MessageRepository(MessagesDao);
export const productService=new ProductRepository(ProductsDao);
export const userService=new UserRepository(UsersDao,CartDao);