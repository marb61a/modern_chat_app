import _ from "lodash";
import {Observable} from "rxjs";
import {validateLogin} from "shared/validation/users";

export class UsersStore {
    getCurrentUser(){
        return this._currentUser;
    }
    
    get isLoggedIn(){
        return this._currentUser && this.currentUser.isLoggedIn;
    }
    
    constructor(server){
        this._server = server;
        
        // Users List
        const defaultStore = {users: []};
        const events$ = Observable.merge(
            this._server.on$("users:list").map(opList),
			this._server.on$("users:added").map(opAdd),
			this._server.on$("users:removed").map(opRemove)
        );
        
    }
        
    login$(name){
        const validator = validateLogin(name);
        if(validator.hasErrors)
            return Observable.throw({message: validator.message});
		
		return this._server.emitAction$("auth:login", {name});
    }
    
    logout$(){
        return this._server.emitAction$("auth:logout");
    }
}
    
function opList(users){
    return state => {
        state.users = users;
        state.users.sort((l, r) => l.name.localeCompare(r.name));
        return{
            type: "list",
		    state: state   
        };
    };
}

function opAdd(user){
    return state => {
        
    };
}

function opRemove(user){
    return state => {
        
    };
}
