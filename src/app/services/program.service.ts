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
export class ProgramApiService {

    constructor(private http: Http) { }

    programList(data) {
        const respData = CommonService.authReq('program/list');
        return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
    }
    userProgramList(data) {
        const respData = CommonService.authReq('program/userprogram/list');
        return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
    }
    programAdd(data) {
        const respData = CommonService.authReq('organisation/add');
        return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
    }
    buyProgram(data) {
        const respData = CommonService.authReq('program/buy_request');
        return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
    }
    acceptProgram(data) {
        const respData = CommonService.authReq('program/accept');
        return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
    }
    addProgram(data) {
        const respData = CommonService.authReq('program/add');
        return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
    }
    editProgram(data) {
        const respData = CommonService.authReq('program/edit' + data.programId);
        return this.http.put(respData.url, data, respData.headers).pipe(map(res => res.json()));
    }
    addLesson(data) {
        const respData = CommonService.authReq('program/lesson/add/' + data.programId + data.moduleId);
        return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
    }
    deleteLesson(data) {
        const respData = CommonService.authReq('program/lesson/delete/' + data.programId + data.moduleId + data.lesson);
        return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
    }
    editLesson(data) {
        const respData = CommonService.authReq('program/lesson/edit/' + data.programId + data.moduleId + data.lesson);
        return this.http.put(respData.url, data, respData.headers).pipe(map(res => res.json()));
    }
    addModule(data) {
        const respData = CommonService.authReq('program/module/add/' + data.programId);
        return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
    }
    deleteModule(data) {
        const respData = CommonService.authReq('program/module/delete/' + data.moduleId);
        return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
    }
    editModule(data) {
        const respData = CommonService.authReq('program/module/edit/' + data.programId + data.moduleId);
        return this.http.put(respData.url, data, respData.headers).pipe(map(res => res.json()));
    }
}
