import {ModuleBase} from "../lib/module";

import {validateSendMessage} from "shared/validation/chat";
import {fail} from "shared/observable-socket";

const MAX_HISTORY = 100;
const BATCH_SIZE = 10;

export class ChatModule extends ModuleBase{
    constructor(io, usersModule){
        super();
		this._io = io;
		this._users = usersModule;
		this._chatLog = [];    
    }
    
    sendMessage(user, message, type){
        message = message.trim();
        
        const validator = validateSendMessage(user, message, type);
    }
    
    registerClient(client){
        
    }
}