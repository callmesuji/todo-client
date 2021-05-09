export class User{
    constructor(private username_:string,private password_:string){
    }
    get username(){
        return this.username_;
    }
    get password(){
        return this.password_;
    }
    set username(username){
        this.username_ = username;
    }
    set password(password){
        this.password_= password;
    }
}