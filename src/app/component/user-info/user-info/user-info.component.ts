import { Component, OnInit, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeApiService } from '../../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { ClientApiService } from '../../../services/client.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public userDetails: any = {};
  public company: any = {};
  public viewId: any = {};
  public emp: any = {};
  public editUser: any;
  public showLoader: any = false;
  public companyImg = '';
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public currUrl: any = '';
  public userFile: any = '';
  public cdnUrl: any;
  public usrImage: any;
  public authToken: any;
  public imageId: any;
  coordinates = { x: 0 };
  @ViewChild('fileClick') fileClick: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeServies: EmployeeApiService,
    private toastr: ToastrService,
    private clientSerice: ClientApiService,
    private commonService: CommonService,
  ) {
    this.cdnUrl = this.commonService.imageUrl;

  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.viewId = this.route.snapshot.paramMap.get('id');
      this.viewDetails(this.viewId);
    }
    if (localStorage.getItem('authToken')) {
      this.authToken = localStorage.getItem('authToken');
    }
    if (localStorage.getItem('userDetails')) {
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      this.usrImage = this.userDetails.user.image;
    }
    // this.getImage();
  }
  viewDetails(val) {
    this.showLoader = true;
    this.employeeServies.viewEmp(this.viewId).subscribe(data => {
      if (data) {
        this.showLoader = false;
        localStorage.setItem('userDetails', JSON.stringify(data)); // update current user
        this.userDetails = data;
        this.usrImage = this.userDetails.user.image;
        this.changeUsr();
      }
    },
      err => {
        let mgs = JSON.parse(err._body);
        mgs = mgs.message;
        this.showLoader = false;
        // this.toastr.error(mgs);
      });
  }
  editUserDetails() {
    if (this.userDetails) {
      this.emp.fName = this.userDetails.user.nameDetails.fName;
      this.emp.lName = this.userDetails.user.nameDetails.lName;
      this.emp.mail = this.userDetails.user.mail.mail;
      this.emp.designation = this.userDetails.user.designation;
      this.emp.roleId = this.userDetails.user.roleDetails.roleId;
      this.emp.gender = this.userDetails.user.gender;
      this.emp.mobileNo = this.userDetails.user.mobileNo;
      this.emp.dob = this.userDetails.user.dob;
    }
  }
  editEmp(type) {
    this.showLoader = true;
    type = this.userDetails.user;
    let imgType = 'PROFILE';
    this.stringToImage();
    if (this.userFile) {
      this.clientSerice.imageUpload(this.userFile, imgType).subscribe(resp => {
        if (resp) {
          // this.toastr.success(data.message);
          this.imageId = resp.imageId;
          if (this.emp.dob) {
            let d = new Date(this.emp.dob);
            let empDate = d.getFullYear() + '-' +
              ((d.getMonth() + 1) <= 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + '-' +
              (d.getDate() <= 9 ? '0' + d.getDate() : d.getDate());
            this.emp.dob = empDate;
          }
          let obj: any = {};
          obj = {
            'image': this.imageId,
            'name': this.emp.fName + this.emp.lName,
            'designation': this.emp.designation,
            'nameDetails': {
              'fName': this.emp.fName,
              'lName': this.emp.lName
            },
            'roleDetails': {
              'roleId': this.emp.roleId
            },
            // 'groups': [{
            //   'groupId': this.emp.groupId
            // }],
            'dob': this.emp.dob,
            'gender': this.emp.gender,
            'userName': this.emp.fName + this.emp.lName,
            'mobileNo': this.emp.mobileNo
          };
          this.employeeServies.editEmp({ type, obj }).subscribe(data => {
            if (data) {
              this.showLoader = false;
              localStorage.setItem('userDetails', JSON.stringify(data));
              this.toastr.success('Data Updated Successfully');
              this.viewDetails(this.viewId);
              this.editUser = false;
            }
          },
            err => {
              let mgs = JSON.parse(err._body);
              mgs = mgs.message;
              this.toastr.error(mgs);
              this.showLoader = false;
            });
        }
      },
        err => {
          let mgs = JSON.parse(err._body);
          this.toastr.error(mgs.message);
        });
    }
  }
  changeUsr() {
    this.commonService.sendMessage('send');
  }
  // image upload
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: any, ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  stringToImage() {
    if (this.croppedImage) {
      fetch(this.croppedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'File name');
          this.userFile = file;
        });
      // if (this.userFile) {
      //   this.saveSelected();
      // }
    }
  }
  imageLoaded(event) {
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
    this.currUrl = val;
    let el: HTMLElement = this.fileClick.nativeElement as HTMLElement;
    el.click();
  }
  /* end image upload here */
  public saveSelected() {


  }
}

