import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: ''
  };
  constructor(private router: Router, private loginService: LoginService, private commonService: CommonService) { }

  login(user: any) {
    let obj = {
      username: user.username,
      password: user.password
    }
    this.loginService.loginUser(obj).subscribe((res: any) => {
      if(res['status'] != 0){
        sessionStorage.userData = JSON.stringify(res);
        this.commonService.setUserData(res);
        this.router.navigateByUrl('/app');
      }      
    }, (err: any) => {
      console.log(err);
    });
  }

  ngOnInit(): void {
  }

}
