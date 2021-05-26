import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  user = {};
  constructor() { }

  setUserData(userData: any) {
    this.user = userData;
  }
  getUserData() {
    return this.user;
  }
}
