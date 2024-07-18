import { Server } from "socket.io";
import { ProductsModelManager } from "./dao/mongo/products.mdb.js";
import { MessagesManager } from "./dao/mongo/messages.mdb.js";

const pmm=new ProductsModelManager();
const mm=new MessagesManager();
export const initSocketServer=(httpServer)=>{

    const io=new Server(httpServer);

    io.on("connection", async (socket) => {
        console.log("Cliente conectado");
        socket.emit("getProducts", await pmm.getPaginatedProducts({}));
        socket.emit("messages",await mm.getAll());
    })

    return io;
}