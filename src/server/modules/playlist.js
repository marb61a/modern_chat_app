import {Observable} from "rxjs";
import _ from "lodash";

import {ModuleBase} from "../lib/module";
import {fail} from "shared/observable-socket";
import {validateAddSource} from "shared/validation/playlist";

export class PlayListModule extends ModuleBase{
    constructor(io, usersModule, playlistRepository, videoServices){
        super();
        this._io = io;
		this._users = usersModule;
		this._repository = playlistRepository;
		this._services = videoServices;
		
		this._nextSourceId = 1;
		this._playlist = [];
		this._currentIndex = -1;
		this._currentSource = null;
		this._currentTime = 0;
		
    }
    
    init$(){
        
    }
}