import $ from "jquery";
import moment from "moment";

import {ElementComponent} from "../../lib/component";
import {PlaylistSortComponent} from "./sort";

export class PlaylistListComponent extends ElementComponent{
    constructor(playlistStore, usersStore){
        super("ul");
        
    }
    
}

class PlaylistItemComponent extends ElementComponent{
    
    get source() {
		return this._source;
	}
	
    constructor(source){
        super("li");
    }
}
