import $ from "jquery";
import {ElementComponent} from "../../lib/component";
import {usersStore} from "../../services";
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
    component = new UsersComponent(usersStore);
    component.attach($("section.users"))
}catch(e){
    console.error(e);
	if (component)
		component.detach();
}finally{
    
}