import _ from "lodash";
import {Observable} from "rxjs";
import {ModuleBase} from "../lib/module";

import {ModuleBase} from "../lib/module";
import {validateLogin} from "shared/validation/users";
import {fail} from "shared/observable-socket";

const AuthContext = Symbol("AuthContext");

export class UsersModule extends ModuleBase{
    constructor(){
        super();
		this._io = io;
		this._userList = [];
		this._users = {};
    }
    
    loginClient$(client, username){
        username = username.trim();
    }
    
    logoutClient(client){
        
    }
    
    registerClient(client){
        client.onActions({
            "users:list": () => {
				return this._userList;
			},
			
			"auth:login": ({name}) => {
				return this.loginClient$(client, name);
			},
			
			"auth:logout": () => {
				this.logoutClient(client);
			}
        });
        
        client.on("disconnect", () => {
            this.logoutClient(client);
        });
    }
}

