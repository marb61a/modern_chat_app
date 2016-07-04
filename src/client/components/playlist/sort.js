import $ from "jquery";
import {Observable} from "rxjs";

import {ComponentBase} from "../../lib/component";

export class PlaylistSortComponent extends ComponentBase {
    constructor(playlistStore, usersStore, $list){
        super();
        this._playlist = playlistStore;
		this._users = usersStore;
		this._$list = $list;
		this._$body = $("body");
		this._$html = $("html");
    }
    
    _onAttach(){
        const $placeholder = $(`<div class="placeholder">{place here}</div>`)
                                .appendTo(this._$mount);
        
        const startDrag$ = Observable.fromEvent(this._$list, "mousedown")
            .filter(() => this._users.isLoggedIn)
            .filter(e => $(e.target).hasClass("thumb"))
            .do(e => e.preventDefault());
        
        const endDrag$ = Observable.fromEvent(this._$body, "mouseup");
        const mouseMove$ = Observable.fromEvent(this._$body, "mousemove");
        
        const sortOperations$ = startDrag$
            .flatMap(startEvent => {
                const $fromElement = $(startEvent.target).closest("li");
                const fromComp = $fromElement.data("component");
                
                this._$html.addClass("sorting-playlist");
				$fromElement.addClass("dragging");
				$placeholder.text(fromComp.source.title);
				
				const halfPlaceholderHeight = $placeholder[0].offsetHeight / 2;
				const halfItemHeight = this._$list[0].firstChild.offsetHeight / 2;
				let target = {
					from: fromComp,
					to: null
				};
            })
            .flatMap(({from, to}) => 
                    this._playlist.moveSource$(from.source.id, to && to.source.id).catchWrap());
            
            sortOperations$.compSubscribe(this, result => {
                if(result && result.error)
                    alert(result.error.message || "Unknown Error");
            });
    }
}