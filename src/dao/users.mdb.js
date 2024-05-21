import { modelUser } from "./models/users.model";

export class UsersModelManager{
    constructor(){}

    async getAll(){
        return await modelUser.find().lean();
    }

}