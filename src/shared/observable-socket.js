import {Observable, ReplaySubject} from "rxjs";

export function clientMessage(message){
    const error = new Error(message);
	error.clientMessage = message;
	return error;
}

export function fail(message) {
	return Observable.throw({clientMessage: message});
}

let successObservable = Observable.empty();
export function success() {
	return successObservable;
}

export class ObservableSocket {
    get isConnected(){
    	return this._state.isConnected;
    }
    
    get isReconnecting(){
    	return this._state.isReconnecting;
    }
    
    get isTotallyDead(){
    	return !this.isConnected && !this.isReconnecting;
    }
    
    constructor(socket){
    	this._socket = socket;
    	this._state = {};
    	this._actionCallbacks = {};
		this._requests = {};
		this._nextRequestId = 0;
		
		this.status$ = Observable.merge(
		    this.on$("connect").map(() => ({
		        isConnected : true
		    })),
		    this.on$("disconnect").map(() => ({
		        isConnected : false
		    })),
		    this.on$("reconnecting").map(attempt => ({
		        isConnected : false, 
		        isReconnecting : true
		        
		    })),
		    this.on$("reconnecting failed").map(() => ({
		        isConnected: false, isReconnecting: false
		    }))
		)
		.publshReplay(1)
		.refCount();
		
		this.status$.subscribe(state => this._state = state);
    }
    
    // Basic Wrappers
    on$(event) {
		return Observable.fromEvent(this._socket, event);
	}
	
	
}