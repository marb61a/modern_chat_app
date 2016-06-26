import {Observable} from "rxjs";
import moment from "moment";
import _ from "lodash";

import {getJson$} from "../lib/request";
import {YOUTUBE_REGEXES} from "shared/validation/playlist";
import {fail} from "shared/observable-socket";

export class YoutubeService {
    constructor(apiKey){
        this._apiKey = apiKey;
        if(apiKey === "{fixme}")
            console.error("Please enter your own unique YouTube API key in server.js");
    }
    
    process$(url){
        if(this._apiKey === "fixme"){
            console.error("Please enter your own unique YouTube API key in server.js");
            return null;
        }
    }
    
    getSourceFromId$(id){
        
    }
}