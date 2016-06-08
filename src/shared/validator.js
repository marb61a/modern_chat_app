import {Observable} from "rxjs";

export class Validator {
    constructor() {
		this._errors = [];
	}
	
	error(message) {
		this._errors.push(message);
	}
}