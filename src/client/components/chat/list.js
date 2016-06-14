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

function serverStatusFactory({isConnected, isReconnecting, attempt}){
    let statusMessage = null;
    if(isConnected)
        statusMessage = "Connected";
    
    if (statusMessage == null)
		return null;
}

function userActionFactory({type, user}){
    if(type !== "add" && type !== "remove")
        return null
    
    return $(`<li class="user-action ${type}" />`)
        .append([
    
        ]);
}

function chatMessageFactory({user, message, type, time}){
    return $(`<li class="message ${type}" />`)
        .data("user", user.name)
        .append([
            
        ]);
}