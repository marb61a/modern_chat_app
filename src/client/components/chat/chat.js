import $ from "jquery";
import {ComponentBase} from "../../lib/component";

import "./chat.scss";

import {usersStore, chatStore, server} from "../../services";

import {ChatListComponent} from "./list";
import {ChatFormComponent} from "./form";

class ChatComponent extends ComponentBase{
    constructor(server, usersStore, chatStore) {
		super();
		this._server = server;
		this._users = usersStore;
		this._chat = chatStore;
	}
	
	_onAttach(){
		
	}
}

let component;

try {
	component = new ChatComponent(server, usersStore, chatStore);
	component.attach($("section.chat"));
} catch (e){
	console.error(e);
	if (component)
		component.detach();
} finally {
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => component && component.detach());
	}
}