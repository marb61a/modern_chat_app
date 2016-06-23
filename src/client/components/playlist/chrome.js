import $ from "jquery";
import moment from "moment";

import {ComponentBase} from "../../lib/component";

export class PlaylistChromeComponent extends ComponentBase {
    constructor(playlistStore, $header){
        super();
        this._playlist = playlistStore;
		this._$header = $header;
    }
    
    _onAttach(){
        this._$header.html("");
    }
}