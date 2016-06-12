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
    
    get isConnecting(){
    	return this._state.isConnecting;
    }
    
    get isTotallyDead(){
    	return !this.isConnected && !this.isConnecting;
    }
    
    constructor(socket){
    	this._socket = socket;
    	this._state = {};
    	this._actionCallbacks = {};
		this._requests = {};
		this._nextRequestId = 0;
		
    }
}