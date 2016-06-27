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
        
        const publishState$ = this.actions$.publishReplay(1);
        
    }
    
    addSource$(url){
        const validator = validateAddSource(url);
        if (!validator.isValid)
			return Observable.throw({ message: validator.message });

		return this._server.emitAction$("playlist:add", { url });
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