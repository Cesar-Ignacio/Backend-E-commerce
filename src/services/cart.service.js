export class CartService{
    constructor(dao)
    {
        this.dao=new dao();
    }

    async getByIdI(id){
       return await this.dao.getCartById(id);
    }

}