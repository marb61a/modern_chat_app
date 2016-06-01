import $ from "jquery";

import {ElementComponent} from "../../lib/component";

export class ChatFormComponent extends ElementComponent {
    constructor(chatStore, usersStore){
        super("div");
		this._users = usersStore;
		this._chat = chatStore;
		this.$element.addClass("chat-form");
    }
    
    _onAttach(){
        
    }
    
    _sendMessage$(message){
        
    }
    
    _login$(username){
        
    }
}