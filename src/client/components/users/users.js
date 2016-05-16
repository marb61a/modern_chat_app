import $ from "jquery";
import {ElementComponent} from "../../lib/component";
import "./users.scss";

class UsersComponent extends ElementComponent {
    constructor(usersStore){
        super("ul");
        this.$element.addClass("users");
		this._users = usersStore;
    }
    
    _onAttach(){
        
    }
}

let component;

try{
    
}catch(e){
    
}finally{
    
}