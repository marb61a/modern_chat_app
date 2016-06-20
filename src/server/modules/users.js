import _ from "lodash";
import {Observable} from "rxjs";
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
    
    getColorForUsername(username){
        
    }
    
    getUserForClient(client){
        const auth = client[AuthContext];
        if (!auth)
			return null;
		
		return auth.isLoggedIn ? auth : null;
    }
    
    loginClient$(client, username){
        username = username.trim();
        const validator = validateLogin(username);
        if(!validator.isValid)
            return validator.throw$();
            
        if (this._users.hasOwnProperty(username))
			return fail(`Username ${username} is already taken`);
		
		const auth = client[AuthContext] || (client[AuthContext] = {});
		
		if (auth.isLoggedIn)
			return fail("You are already logged in");
		
		auth.name = username;
		auth.color = this.getColorForUsername(username);
		auth.isLoggedIn = true;
    }
    
    logoutClient(client){
        const auth = this.getUserForClient(client);
        if(!auth)
            return;
        
        const index = this._userList.indexOf(auth);
        this._userList.splice(index, 1);
        delete this._users[auth.name];
        delete client[AuthContext];
        
        this._io.emit("users:removed", auth);
        console.log(`User ${auth.name} logged out`);
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

