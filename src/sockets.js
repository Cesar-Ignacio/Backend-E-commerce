import { Server } from "socket.io";
import { ProductsModelManager } from "./dao/products.mdb.js";

const pmm=new ProductsModelManager();
export const initSocketServer=(httpServer)=>{

    const io=new Server(httpServer);

    io.on("connection", async (socket) => {
        console.log("Cliente conectado");
        socket.emit("getProducts", await pmm.getAll());
    })

    return io;
}