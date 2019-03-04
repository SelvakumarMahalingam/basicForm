import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CommonService } from './common.service';
import { HttpHeaders } from '@angular/common/http';
// import 'rxjs/Rx';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {
  constructor(private http: Http) { }
  clientList(data) {
    const respData = CommonService.authReq('organisation/list');
    return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
  }
  clientAdd(data) {
    const respData = CommonService.authReq('organisation/add');
    return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
  }
  editClient(data) {
    const respData = CommonService.authReq('organisation/edit/' + data.val.organisationId);
    return this.http.put(respData.url, data.obj, respData.headers).pipe(map(res => res.json()));
  }
  viewClient(data) {
    const resData = CommonService.authReq('organisation/get/' + data);
    return this.http.get(resData.url, resData.headers).pipe(map(res => res.json()));
  }
  imageUpload(fileDatas: File, type) {
    const respData = CommonService.cdnReq('cdn/upload_image?docType=' + type);
    const formData: any = new FormData();
    formData.append('file', fileDatas, fileDatas['name']);
    return this.http.post(respData.url, formData, respData.headers).pipe(map(res => res.json()));
  }
}
