import $ from "jquery";
import {ComponentBase} from "../../lib/component";

import "./playlist.scss";

import * as services from "../../services";

import {PlaylistListComponent} from "./list";
import {PlaylistToolbarComponent} from "./toolbar";
import {PlaylistContextMenuComponent} from "./context-menu";
import {PlaylistChromeComponent} from "./chrome";

class PlaylistComponent extends ComponentBase {
    constructor(playlistStore, usersStore) {
		super();
		this._playlist = playlistStore;
		this._users = usersStore;
	}
	
}

let component;

try{
   component = new PlaylistComponent(services.playlistStore, services.usersStore);
   
} catch(e){
    console.error(e);
} finally{
    
}