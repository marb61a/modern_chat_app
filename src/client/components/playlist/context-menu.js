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
        const $playButton = $(`
            <a href="#" class="play">
				<i class="fa fa-play-circle" /> Play
			</a>
        `).appendTo(this.$element);
        
        const $deleteButton = $(`
            <a href="#" class="delete">
                <i class="fa fa-trash" /> Delete
            </a>
        `).appendTo(this.$element);
        
        const selectedItemSubject$ = new Subject();
        
        const openMenuOnItem$ = Observable.fromEventNoDefault(this._$list, "contextmenu")
            .map(event => $(event.target).closest("li").data("component"));
        
        const closeMenu$ = Observable.fromEvent($("body"), "mouseup")
			.filter(event => $(event.target).closest("li.selected, .context-menu").length == 0)
			.mapTo(null);
			
		const selectedItem$ = Observable.merge(openMenuOnItem$, closeMenu$, selectedItemSubject$)
			.filter(() => this._users.isLoggedIn)
			.share();
            
        let lastItem = null;
        
        selectedItem$
            .compSubscribe();
    }
}