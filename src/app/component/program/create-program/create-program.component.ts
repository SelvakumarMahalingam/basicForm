import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramApiService } from '../../../services/program.service';
import { ToastrService } from 'ngx-toastr';
import { ClientApiService } from '../../../services/client.service';
import { CommonService } from '../../../services/common.service';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { Logs } from 'selenium-webdriver';


@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.scss']
})
export class CreateProgramComponent implements OnInit {
  public videoURL: any;
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  @ViewChild('fileClick') fileClick: ElementRef;
  fileObject: any;
  public uploader: FileUploader = new FileUploader({
    // url: URL,
    disableMultipart: true
  });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  public pgm: any = {};
  public pgmInfo: any = {};
  panelOpenState = false;
  public videoLists: any = [{ lessonType: 'VIDEO' }];
  public attachLists: any = [{}];
  public modulesLists: any = [{
    moduleName: '', moduleNo: '', description: '', lessons:
      [{
        //     'lessonType': 'VIDEO',
        //     'taskType': 'TEXT',
        //     'lessonSubType': 'TEXT',
        //     'ischeckinTask': true,
        //     'lessonName': 'string',
        //     'maxCheckInCount': 0,
        //     'videoId': 'string',
        //     'video': {
        //       'type': 'string',
        //       'width': 1080,
        //       'height': 1080,
        //       'duration': 0
        //     },
        //     'image': 'string',
        //     'description': 'string',
        //     'lessonNo': 0
      }
      ]
  }];
  public exerciseLists: any = [{ lessonType: 'EXERCISE' }];
  public currFileName: any;
  public companyImg: any;
  public userFile: any;
  public currUrl: any;
  public overLay: any = false;
  public coverImg: any = '';

  constructor(
    private programServies: ProgramApiService,
    private toastr: ToastrService,
    private commonService: CommonService,
    private clientSerice: ClientApiService
  ) {
    this.videoURL = 'https://instagram.fmaa3-1.fna.fbcdn.net/vp/083e483b440e9196107c4bd5486d2df7/5C6B8BA7/t50.2886-16/52709754_264443521146450_2603771700692647936_n.mp4?_nc_ht=instagram.fmaa3-1.fna.fbcdn.net';
  }

  ngOnInit() {
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    console.log(file);
    let obj: any;
    obj = file.name;
    this.currFileName = file.name;
    obj = obj.split('.');
    obj = obj[obj.length - 1];
    if (obj === 'pdf') {

    } else {
      this.toastr.error('Invalid File Type');
    }
  }
  addvideo() {
    this.videoLists.push({ lessonType: 'VIDEO' });
  }
  addExercise() {
    this.exerciseLists.push({ lessonType: 'EXERCISE' });
  }
  addAttachment() {
    console.log(this.attachLists);
    this.attachLists.push({ title: '', attachDescription: '', fileId: '' });
  }
  addModules() {
    this.modulesLists.push({
      moduleName: '', moduleNo: '', description: '', lessons:
        [{}]
    });
  }
  removeAttachment(index) {
    this.attachLists.splice(index, 1);
  }
  deleteModule(index) {
    this.modulesLists.splice(index, 1);
  }

  cancel() {
    this.videoURL = '../../../../assets/video/videoplayback.mp4';
  }
  // image upload crop file
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: any, ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  coverImageCropped(event: any, ImageCroppedEvent) {
    console.log('event.base64', event.base64);
    this.coverImg = event.base64;
  }

  stringToImage() {
    if (this.croppedImage) {
      fetch(this.croppedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'File name');
          this.userFile = file;
        });
    }
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.companyImg = event.target.result;
      };
    }
  }
  public onFileClick(val) {
    let el: HTMLElement = this.fileClick.nativeElement as HTMLElement;
    el.click();
  }

  addProgram(formData) {
    let obj: any = {};
    console.log(formData.value);
    obj.attachments = [];
    obj.videoLists = [];
    obj.modules = [];
    obj.lessons = [];
    // console.log('obj value', formData.value);
    obj = {
      'programName': formData.value.programName,
      'image': 'string',
      'coverImage': 'string',
      'cost': formData.value.cost ? JSON.parse(formData.value.cost) : '',
      'offerCost': 0,
      'currencyType': 'string',
      'subscriptionDuration': 0,
      'description': 'string',
      'isFreeProgram': formData.value.publicProgram,
      // 'attachments': [{
      //   'title': 'string',
      //   'description': 'string',
      //   'fileId': 'string',
      //   'createdAt': '2019-02-27',
      //   'updatedAt': '2019-02-27'
      // }],
      'isPublicProgram': true,
      // 'modules': [{
      //   'moduleName': 'string',
      //   'description': 'string',
      //   'moduleNo': 0,
      //   'lessons': [{
      //     'lessonType': 'VIDEO',
      //     'taskType': 'TEXT',
      //     'lessonSubType': 'TEXT',
      //     'ischeckinTask': true,
      //     'lessonName': 'string',
      //     'maxCheckInCount': 0,
      //     'videoId': 'string',
      //     'video': {
      //       'type': 'string',
      //       'width': 1080,
      //       'height': 1080,
      //       'urls': [{
      //         'quality': 'string',
      //         'url': 'string',
      //         'image': 'string',
      //         'width': 1080,
      //         'height': 1080
      //       }],
      //       'duration': 0
      //     },
      //     'image': 'string',
      //     'description': 'string',
      //     'questions': [{
      //       'questionId': 'string',
      //       'title': 'dd',
      //       'image': 'string',
      //       'question': 'string',
      //       'description': 'string',
      //       'isMultiAnswer': false,
      //       'answer': [
      //         'string'
      //       ],
      //       'options': [
      //         'string'
      //       ],
      //       'answerLimit': 0
      //     }],
      //     'dailyCheckIn': {
      //       'image': 'string'
      //     },
      //     'lessonNo': 0
      //   }]
      // }]
    };
    // obj.attachments = this.attachLists;
    // obj.videoLists = this.videoLists;
    // obj.exerciseLists = this.exerciseLists;
    // console.log('obj::', obj);
    this.modulesLists.push({ lesson: this.videoLists });
    this.modulesLists.push({ lesson: this.exerciseLists });
    console.log(this.modulesLists);
  // this.programServies.addProgram(obj).subscribe(data => {

    //   if (data) {
    //     // this.toastr.success('Successfully');
    //     // this.showLoader = false;
    //     this.toastr.success(data.message);
    //   } else {
    //     this.toastr.success(data.message);
    //   }
    // },
    //   err => {
    //     let mgs = JSON.parse(err._body);
    //     mgs = mgs.message;
    //     // this.showLoader = false;
    //     this.toastr.error(mgs);
    //     // // this.showLoader = false;
    //   });
  }
  public addImage() {
    this.overLay = false;
    let type = 'COMPANYLOGO';
    if (this.croppedImage) {
      fetch(this.croppedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'File name');
          this.userFile = file;
          this.clientSerice.imageUpload(this.userFile, type).subscribe(data => {
            if (data) {
              // this.toastr.success(data.message);
              //  this.imageId = data.imageId;
              console.log(data.message);
            }
          },
            err => {
              let mgs = JSON.parse(err._body);
              this.toastr.error(mgs.message);
              // this.dialogRef.close();
            });
        });
    }
  }
  public coverImage() {
    this.overLay = false;
    let type = 'COMPANYLOGO';
    if (this.coverImg) {
      if (this.coverImg) {
        fetch(this.coverImg)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'File name');
            let coverFile = file;
            this.clientSerice.imageUpload(coverFile, type).subscribe(data => {
              if (data) {
                // this.toastr.success(data.message);
                //  this.imageId = data.imageId;
                console.log(data.message);
              }
            },
              err => {
                let mgs = JSON.parse(err._body);
                this.toastr.error(mgs.message);
              });
          });
      }
    }
  }
}
