import {Observable} from "rxjs";

import {validateAddSource} from "shared/validation/playlist";

export class PlaylistStore {
    constructor(server){
        const defaultState = {
            current: null, 
            list: [], 
            map: {}
        };
        
        this._server = server;
        const events$ = Observable.merge(
            server.on$("playlist:list").map(opList),
			server.on$("playlist:added").map(opAdd),
			server.on$("playlist:current").map(opCurrent),
			server.on$("playlist:removed").map(opRemove),
			server.on$("playlist:moved").map(opMove));
        
        this.actions$ = events$
            .scan(
                ({state}, op) => op(state),
                {state : defaultState}
            )
            .publish();
        
        const publishedState$ = this.actions$.publishReplay(1);
        this.state$ = publishedState$
                        .startWith({state:defaultState});
        
        this.serverTime$ = this.actions$
                            .filter(a => a.type == "current")
                            .map(a => a.state.current)
                            .publishReplay(1);
        
        this.actions$.connect();
        this.serverTime$.connect();
		publishedState$.connect();
		
		server.on("connect", () => {
		    server.emitAction$("playlist:list")
    				.subscribe(() => {
    					server.emit("playlist:current");
    				});
		});
    }
    
    addSource$(url){
        const validator = validateAddSource(url);
        if (!validator.isValid)
			return Observable.throw({ message: validator.message });

		return this._server.emitAction$("playlist:add", { url });
    }
    
    setCurrentSource$(source){
        return this._server.emitAction$("playlist:set-current", { id: source.id });
    }
    
    deleteSource$(source){
        return this._server.emitAction$("playlist:remove", { id: source.id });
    }
    
    moveSource$(fromId, toId){
        if(fromId == toId)
            return Observable.empty();
        
        return this._server.emitAction$("playlist:move", {fromId, toId});
    }
}

function opList(sources){
    return state => {
        
    };
}

function opAdd(){
    return state => {
        
    };
}

function opCurrent(){
    return state => {
        
    };
}

function opRemove(){
    return state => {
        
    };
}

function opMove(){
    return state => {
        
    };
}

function opError(state, error){
    console.error(error);
    return {
		type: "error",
		error: error,
		state: state
	};
}