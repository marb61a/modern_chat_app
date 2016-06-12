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
    }
    
    function opList(users){
        return state => {
            state.users = users;
            state.users.sort((l, r) => l.name.localeCompare(r.name));
            return{
                type: "list",
			    state: state   
            };
        }
    }
    
    function opAdd(user){
        return state => {
            
        }
    }
    
    function opRemove(user){
        return state => {
            
        }
    }
}