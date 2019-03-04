import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CommonService } from './common.service';
// import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: Http, private router: Router) { }
  login(data) {
    const respData = CommonService.NoauthReq('user/login');
    return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
  }
  forgotpassword(data) {
    const respData = CommonService.NoauthReq('user/forgot_password');
    return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
  }
  // changePassword(data) {
  //   var resData = CommonService.fwdauthReq('/user/change_password');
  //   return this.http.put(resData.url, data, resData.headers).pipe(map(res => res.json()));
  // }
  // this below functions are used to auth guard
  getToken() {
    return localStorage.getItem('authToken');
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }
  logout() {
    const resData = CommonService.authReq('user/logout');
    return this.http.post(resData.url, null, resData.headers).pipe(map(res => res.json()));

  }
}
