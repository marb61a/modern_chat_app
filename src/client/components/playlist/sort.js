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
            .flatMap()
            .flatMap();
    }
}