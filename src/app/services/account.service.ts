import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CommonService } from '../services/common.service';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private subject = new Subject<any>();
  constructor(private http: Http) { }

  // sendData(data) {
  //   this.subject.next({ data });
  // }
  // clearMessage() {
  //   this.subject.next();
  // }
  // getData(): Observable<any> {
  //   return this.subject.asObservable();
  // }

  addCompany(data) {
    var resData = CommonService.authReq('/organisation/add');
    return this.http.post(resData.url, data, resData.headers).pipe(map(res => res.json()));
  }

  // assemblyList() {
  //   var resData = CommonService.authReq('/api/Configuration/GetAssemblyList');
  //   return this.http.get(resData.url, resData.headers).pipe(map(res => res.json()));
  // }

  // stageList() {
  //   var resData = CommonService.authReq('/api/Configuration/StageList');
  //   return this.http.get(resData.url, resData.headers).pipe(map(res => res.json()));
  // }

  // saveChanges(data) {
  //   var respData = CommonService.authReq('/api/Configuration/');
  //   return this.http.put(respData.url + data.machineId, data, respData.headers).pipe(map(res => res.json()));
  // }

  // addMachine(data) {
  //   var respData = CommonService.authReq('/api/Configuration/addMachine');
  //   return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
  // }
}
