export class User{

    Username?: string;
    Password?: string;

    //optional to initailizs the objects easily
    constructor(init?: Partial<User>){
        Object.assign(this, init);
    }

}