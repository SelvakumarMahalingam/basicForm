import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CommonService } from './common.service';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

  constructor(private http: Http) { }

  empAdd(data) {
    const respData = CommonService.authReq('user/add');
    return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
  }
  emplist(data) {
    const respData = CommonService.authReq('user/list');
    return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
  }
  empChangeStatus(data) {
    const obj: any = {};
    obj.status = data.status;
    const respData = CommonService.authReq('user/change_status/' + data.userId);
    return this.http.put(respData.url, obj, respData.headers).pipe(map(res => res.json()));
  }

  editEmp(user) {
    const respData = CommonService.authReq('user/' + user.type.userId);
    return this.http.put(respData.url, user.obj, respData.headers).pipe(map(res => res.json()));
  }
  roleList() {
    const respData = CommonService.authReq('user/role_list');
    return this.http.get(respData.url, respData.headers).pipe(map(res => res.json()));
  }
  viewEmp(data) {
    const resData = CommonService.authReq('user/' + data);
    return this.http.get(resData.url, resData.headers).pipe(map(res => res.json()));
  }
  programList(data) {
    const respData = CommonService.authReq('program/userprogram/list');
    return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
  }
  // empBlukAdd(data) {
  //   const respData = CommonService.authReq('user/add');
  //   return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
  // }
}
