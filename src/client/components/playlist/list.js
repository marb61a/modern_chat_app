import $ from "jquery";
import moment from "moment";

import {ElementComponent} from "../../lib/component";
import {PlaylistSortComponent} from "./sort";

export class PlaylistListComponent extends ElementComponent{
    constructor(playlistStore, usersStore){
        super("ul");
        this._playlist = playlistStore;
		this._users = usersStore;
		this.$element.addClass("playlist-list");
    }
    
    _onAttach(){
        const $list = this.$element;
		let itemsMap = {};
    }
    
}

class PlaylistItemComponent extends ElementComponent{
    
    get source() {
		return this._source;
	}
	
    constructor(source){
        super("li");
        this._source = source;
    }
}
