import $ from "jquery";
import moment from "moment";
import {Observable} from "rxjs";

import {ElementComponent} from "../../lib/component";

export class ChatListComponent extends ElementComponent{
    constructor(server, usersStore, chatStore){
        super("ul");
        super("ul");
		this._server = server;
		this._users = usersStore;
		this._chat = chatStore;
		this.$element.addClass("chat-messages");
    }
    
    _onAttach(){
        Observable.merge();
    }
} 