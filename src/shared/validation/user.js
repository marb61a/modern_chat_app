import {Validator} from "../validator";

export function validateLogin(username){
    const validator = new Validator;
    
    if(username.length >= 20)
        validator.error("Username must be fewer than 20 characters");
    
    return validator;   
}