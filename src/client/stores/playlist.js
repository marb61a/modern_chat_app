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
        const events$ = Observable.merge();
        
        this.actions$ = events$
            .scan(
                ({state}, op) => op(state),
                {state : defaultState}
            );
    }
    
    addSource$(url){
        const validator = validateAddSource(url);
    }
}