import { CartService } from "./cart.service.js";
import { CartModelManager } from "../dao/mongo/carts.mdb.js";

export const cartServicie = new CartService(CartModelManager)