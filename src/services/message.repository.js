export class MessageRepository{

    constructor(dao)
    {
        this.dao=new dao();
    }

    async get(){
        return this.dao.getAll();
    }

    async createMessage(email,message){
        return this.dao.create(email,message);
    }
}