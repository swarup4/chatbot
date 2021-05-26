import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';

let conf = new Config();
let config = conf.getApiUrl();

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(data: any){
    return this.http.post(config + '/api/user/auth/login', data);
  }
  signup(data: any){
    return this.http.post(config + '/api/user/auth/signup', data);
  }
  logout(id: string, body: any){
    return this.http.put(config + '/api/user/auth/logout/' + id, body);
  }
}
