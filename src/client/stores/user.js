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
}