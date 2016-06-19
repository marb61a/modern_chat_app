import $ from "jquery";
import moment from "moment";
import {Observable} from "rxjs";

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
		
		// Child Components
		const sort = new PlaylistSortComponent(this._playlist, this._users, this.$element);
		sort.attach(this._$mount);
		this.children.push(sort);
		
		// Playlist
		Observable.merge(
		    this._playlist.state$.first(),
		    this._playlist.actions$.filter(a => a.type === "list"))
		    .compSubscribe(this, ({state}) => {
		        $list.empty();
		        itemsMap = {};
		        for(let source of state.list){
		            const comp = new PlaylistItemComponent(source);
		            itemsMap[source.id] = comp;
					comp.attach($list);
		        }
		    });
    }
}

class PlaylistItemComponent extends ElementComponent{
    set isPlaying(isPlaying) {
		this._setClass("is-playing", isPlaying);
	}

	set isSelected(isSelected) {
		this._setClass("selected", isSelected);
	}

	set progress(progress) {
		this._$progress.css("width", `${progress}%`);
	}
    
    get source() {
		return this._source;
	}
	
    constructor(source){
        super("li");
        this._source = source;
    }
}
