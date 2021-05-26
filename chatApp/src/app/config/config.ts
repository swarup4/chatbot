// import { Location } from '@angular/common';

export class Config {
    // constructor(private location: Location){}

    getApiUrl() {
        let apiUrl = "";
        // if(this.location.port == "8081"){
        //     apiUrl = "http://" + this.location.hostname + ":8182";
        // }else{
        //     apiUrl = "http://" + location.hostname + ":3001";
        // }
        return "http://127.0.0.1:8000";
    }
    config = {
        snackBarTimer: 300000
    }
}