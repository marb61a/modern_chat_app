import $ from "jquery";
import {Subject, Observable} from "rxjs";

import {ElementComponent} from "../../lib/component";

export class PlaylistContextMenuComponent extends ElementComponent{
    constructor(playlistStore, usersStore, $list){
        super("div");
		this.$element.addClass("context-menu");
		
		this._playlist = playlistStore;
		this._users = usersStore;
		this._$list = $list;
    }
    
    _onAttach(){
        
    }
}