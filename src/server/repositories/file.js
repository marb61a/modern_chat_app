import fs from "fs";
import {Observable} from "rxjs";

const readFile = Observable.bindNodeCallback(fs.readFile);
const writeFile = Observable.bindNodeCallback(fs.writeFile);

export class FileRepository{
    constructor(filename) {
		this._filename = filename;
	}
	
	getAll(){
	    return readFile(this._filename);
	}
	
	save$(items){
	    
	}
}