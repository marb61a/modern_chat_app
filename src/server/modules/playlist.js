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
		
		setInterval(this._tickUpdateTime.bind(this), 1000);
		setInterval(this.tickUpdateClients.bind(this), 5000);
    }
    
    init$(){
        return this._repository.getAll$().do(this.setPlaylist.bind(this));
    }
    
    getSourceById(){
    	return _.find(this._playlist, { id });
    }
    
    setPlaylist(playlist){
    	this._playlist = playlist;
    	for(let source of playlist)
    		source.id = this._nextSourceId++;
    	
    	this._io.emit("playlist:list", this._playlist);
    }
    
    setCurrentSource(source){
    	if(source == null){
    		this._currentSource = null;
    		this._currentIndex = this._currentTime = 0;
    	} else{
    		const newIndex = this._playlist.indexOf(source);
    		if (newIndex === -1)
    			throw new Error(`Cannot set current to source ${source.id} / ${source.title}, it was not found`);
    		
    		this._currentTime = 0;
			this._currentSource = source;
			this._currentIndex = newIndex;
    	}
    }
}