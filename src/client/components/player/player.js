import $ from "jquery";
import _ from "lodash";

import {ElementComponent} from "../../lib/component";

import "./player.scss";

import {playlistStore} from "../../services";

class PlayerComponent extends ElementComponent{
    constructor(playlistStore){
        super();
		this._playlist = playlistStore;
		this.$element.addClass("players");
    }
    
    _onAttach(){
        
    }
    
}

let component;

try{
    component = new PlayerComponent(playlistStore);
} catch (e) {
    console.error(e);
} finally {
    
}