import {ModuleBase} from "../lib/module";

export class UsersModule extends ModuleBase{
    constructor(){
        super();
		this._io = io;
		this._userList = [];
		this._users = {};
    }
    
    registerClient(client){
        client.onActions({
            
        });
        
        client.on("disconnect", () => {
            this.logoutClient(client);
        });
    }
}

