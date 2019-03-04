import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CommonService } from '../services/common.service';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }

  userList(data, limits) {
    var resData = CommonService.authReq('/api/User/GetAdminUserList?Index=' + limits.Index + '&_IndexSize=' + limits.Limit);
    return this.http.post(resData.url, data, resData.headers).pipe(map(res => res.json()));
  }

}
