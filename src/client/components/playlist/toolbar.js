import $ from "jquery";

import {ElementComponent} from "../../lib/component";

export class PlaylistToolbarComponent extends ElementComponent {
    constructor(playlistStore) {
		super("div");
		this._playlist = playlistStore;
		this.$element.addClass("toolbar");
	}
	
	_onAttach(){
	    
	}
}
