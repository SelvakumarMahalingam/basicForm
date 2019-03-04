import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  static rootUrl: string = environment.host;
  private rootUrl = this.rootUrl;
  static cdnUrl = environment.cdnhost;
  public imageUrl = environment.cdnhost;
  private subject = new Subject<any>();

  constructor() { }

  static getrootUrl() {
    return this.rootUrl;
  }

  static authReq(url) {
    const headers = new Headers({
      // 'content-type': 'application/json',
      'Accept': 'application/json',
      'authorization': localStorage.getItem('authToken')
    });
    const reqOptions = new RequestOptions({ headers: headers });
    return {
      url: this.rootUrl + url,
      headers: reqOptions
    }
  }
  static cdnReq(url) {
    const headers = new Headers({
      // 'content-type': 'application/json',
      'Accept': 'application/json',
      'authorization': localStorage.getItem('authToken')
    });
    const reqOptions = new RequestOptions({ headers: headers });
    return {
      url: this.cdnUrl + url,
      headers: reqOptions
    }
  }
  static NoauthReq(url: string) {
    const headers = new Headers({ 'Accept': 'application/json' });
    const reqOptions = new RequestOptions({ headers: headers });
    return {
      url: this.rootUrl + url,
      headers: reqOptions
    };
  }
  // static deleteFile(url: string) {
  //   var headers = new Headers({ 'Content-Type': 'application/json', 'authorization': localStorage.getItem('authToken') });
  //   var reqOptions = new RequestOptions({ headers: headers });
  //   //headers.append('Content-Type', 'multipart/form-data');
  //   return {
  //     url: this.cdnUrl + url,
  //     RequestOptions: reqOptions
  //   }
  // }
  setAssembly(item: any) {
    this.subject.next(item);
    console.log(item);
  }
  getAssembly(): Observable<any> {
    return this.subject.asObservable();
  }
  sendMessage(message: string) {
    this.subject.next({ name: message });
}

clearMessage() {
    this.subject.next();
}

getMessage(): Observable<any> {
    return this.subject.asObservable();
}
}
