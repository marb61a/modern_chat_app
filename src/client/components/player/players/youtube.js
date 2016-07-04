import {Observable} from "rxjs";
import $ from "jquery";

import ElementComponent from "../../../lib/component";

export class YoutubePlayer extends ElementComponent{
    constructor() {
		super("div");
	}
	
	_onAttach(){
	    this.$element.addClass("player youtube");
	}
	
	init$(){
	    this.$element.hide();
	    
	    const $playerElement = $(`<div />`).appendTo(this.$element);
	    return new Observable(observer => {
	    	window.onYoutubeIframeAPIReady = () => {
	    		this._player = new window.YT.Player($playerElement[0], {
	    			
	    		});		
	    	};
	    });
	}
	
	play(source, time){
		this.$element.show();
		this._player.loadVideoById(source.url, time);
	}
	
	stop() {
		this.$element.hide();
		this._player.pauseVideo();
	}
	
	seek(time) {
		this._player.seekTo(time);
	}
}