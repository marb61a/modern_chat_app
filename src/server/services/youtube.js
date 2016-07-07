import {Observable} from "rxjs";
import moment from "moment";
import _ from "lodash";

import {getJson$} from "../lib/request";
import {YOUTUBE_REGEXES} from "shared/validation/playlist";
import {fail} from "shared/observable-socket";

const YOUTUBE_ENDPOINT = "https://www.googleapis.com/youtube/v3";

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
        
        const match = _(YOUTUBE_REGEXES)
            .map(r => url.match(r))
            .find(a => a != null);
            
        return match ? this.getSourceFromId$(match[1]) : null;
    }
    
    getSourceFromId$(id){
        return getJson$(this._buildGetVideoUrl(id))
            .flatMap(data => {
                
            });
    }
    
    _buildGetVideoUrl(id){
        return `${YOUTUBE_ENDPOINT}/videos?id=${id}&key=${this._apiKey}&part=snippet,contentDetails,statistics,status`;
    }
}