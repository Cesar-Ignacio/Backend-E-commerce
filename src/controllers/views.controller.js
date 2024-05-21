import { ProductsModelManager } from "../dao/products.mdb.js";

const pmm = new ProductsModelManager()
export const renderViewHoma = async (req, res) => {
    const data = await pmm.getAll()
    res.status(200).render("home", { data: data })
};

export const renderViewRealTimeProducts = (req, res) => {
    res.status(200).render('realTimeProducts');
};

export const renderViewCreateProduct=(req,res)=>{
    res.status(200).render('createProduct');
}

