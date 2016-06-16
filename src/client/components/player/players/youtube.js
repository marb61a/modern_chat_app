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
	}
}