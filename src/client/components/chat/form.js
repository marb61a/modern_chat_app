import $ from "jquery";
import {Observable} from "rxjs";

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
        return this._chat.sendMessage$(message).catchWrap().do(
            () => this._$input.val("")
        );
    }
    
    _login$(username){
        this._$input.attr("disabled", "disabled");
        return this._users.login$(username).catchWrap()
        .do( () => this._$input.val("") )
        .finally(
            () => {
            this.$input.attr("diasbled", null);
            this.$input.focus();
        });
    }
}