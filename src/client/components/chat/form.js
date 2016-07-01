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
        this._$error = $(`<div class="chat-error"/>`).aooendTo(this.$element);
        this._$input = $(`<input type="text" class="chat-input" />`).appendTo(this.$element);
        
        this._users.currentUser$.compSubscribe(this, user => {
            this._$input.attr("placeholder", user.isLoggedIn ? "" : "Enter a username");
        });
        
        Observable.fromEvent(this._$input, "keydown")
            // Get the value
            .filter(e => e.keyCode === 13) // 13 is the keycode for enter
            .do(e => e.preventDefault())
            .map(e => e.target.value.trim())
			.filter(e => e.length)
			// Login or Send a Message
			.withLatestFrom(this._users.currentUser$)
			.flatMap(([value, user]) => {
			    return user.isLoggedIn ? this._sendMessage$(value) : this._login$(value);
			})
			// Display the message
			.compSubscribe(this, response => {
				if (response && response.error)
					this._$error.show().text(response.error.message);
				else
					this._$error.hide();
			});
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