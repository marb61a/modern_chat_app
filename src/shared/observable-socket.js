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
	
	on(event, callback) {
		this._socket.on(event, callback);
	}
	
	off(event, callback) {
		this._socket.off(event, callback);
	}

	emit(event, arg) {
		this._socket.emit(event, arg);
	}
	
	// Client Side Emit
	emitAction$(action, arg) {
		const id = this._nextRequestId++;
		this._registerCallbacks(action);
		const subject = this._requests[id] = new ReplaySubject(1);
		this._socket.emit(action, arg, id);
		return subject;
	}
	
	_registerCallbacks(action){
		if(this._actionCallbacks.hasOwnProperty(action))
			return;
		
		this._socket.on(action, (arg, id) => {
			const request = this._popRequest(id);
			if (!request)
				return;
			request.next(arg);
			request.complete();
		});
	}
}