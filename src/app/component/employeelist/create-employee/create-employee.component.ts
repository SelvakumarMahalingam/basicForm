import { Component, OnInit, EventEmitter, Inject, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { BlukuploadComponent } from '../blukupload/blukupload.component';
import { EmployeeApiService } from '../../../services/employee.service';
import * as XLSX from 'xlsx';
import { NgModel } from '@angular/forms';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import * as moment from 'moment';

type AOA = any[][];
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  public isAdd: any = true;
  public emp: any = {};
  public showLoader: any = false;
  public isActive: any = {};
  public fileData = [];
  public userDetails: any = {};
  public organisationId: any;
  public uploader: FileUploader = new FileUploader({
    disableMultipart: true
  });
  selectedYears: any[];
  public roles: any = [];
  public groups: any = [
    { id: 1, viewValue: 'group-A' },
    { id: 2, viewValue: 'group-B' },
    { id: 3, viewValue: 'group-C' },
    { id: 4, viewValue: 'group-D' },
    { id: 5, viewValue: 'group-E' }
  ];
  // @ViewChild(EmployeeListComponent)
  // private employeeListComponent: EmployeeListComponent;
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  fileObject: any;
  data: AOA = [];
  rawData: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  constructor(private employeeServies: EmployeeApiService,
    public dialogRef: MatDialogRef<CreateEmployeeComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public inputData: any, public dialog: MatDialog) {
    this.isActive = this.inputData.type; // for getting popUp key
    if (localStorage.getItem('userDetails')) {
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      this.organisationId = this.userDetails.user.organisationDetails.organisationId;
    }
  }
  ngOnInit() {
    if (this.inputData.value) {
      this.emp.fName = this.inputData.value.nameDetails.fName;
      this.emp.lName = this.inputData.value.nameDetails.lName;
      this.emp.mail = this.inputData.value.mail.mail;
      this.emp.designation = this.inputData.value.designation;
      this.emp.roleId = this.inputData.value.roleDetails.roleId;
      this.emp.gender = this.inputData.value.gender;
      this.emp.mobileNo = this.inputData.value.mobileNo;
      this.emp.dob = this.inputData.value.dob;
      // this.emp.groupId = this.inputData.value.groups.groupId;
    }
    this.roleList();
  }
  // select rolle multiple select
  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }

  editEmp(type) {
    // this.showLoader = true;
    if (this.emp.dob) {
      let d = new Date(this.emp.dob);
      let empDate = d.getFullYear() + '-' +
        ((d.getMonth() + 1) <= 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + '-' +
        (d.getDate() <= 9 ? '0' + d.getDate() : d.getDate());
      this.emp.dob = empDate;
    }
    let obj: any = {};
    obj = {
      // 'image': 'manoj.jpg',
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
      // 'country': 'india',
      // 'location': {
      // 'no': '12',
      // 'area': 'chennai',
      // 'city': 'chennai',
      // 'state': 'chennai',
      // 'country': 'chennai',
      // 'pinCode': '622132'
      // },
      'userName': this.emp.fName + this.emp.lName,
      // 'postCode': '677',
      'mobileNo': this.emp.mobileNo
    };

    this.employeeServies.editEmp({ type, obj }).subscribe(data => {
      if (data) {
        this.dialogRef.close(data.message);
        // this.showLoader = false;
        // this.toastr.success(data.message);
        this.toastr.success('Data Updated Successfully');
      }
    },
      err => {
        let mgs = JSON.parse(err._body);
        mgs = mgs.message;
        this.toastr.error(mgs);
        // this.showLoader = false;
      });
  }
  // drag and drop
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    let obj: any;
    obj = file.name.split('.');
    obj = obj[obj.length - 1];
    if (obj === 'xlsx') {
      const target: DataTransfer = <DataTransfer>(event[0]);
      // if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        // /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        // this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
        // this.rawData = this.data;
        this.rawData = XLSX.utils.sheet_to_json(ws, { raw: true });
        // this.dialogRef.close();
        this.empBlukupload(this.rawData); // open dialog box
      };
      reader.readAsBinaryString(event[0]);
    } else {
      this.toastr.error('Invalid File Type');
    }
  }
  addEmployee(value) {
     this.isActive = value;
  }
  // end  drag and drop
  remove(i, row) {
    this.rawData.slice(1, i);
  }
  formatedDate() {
    let d = new Date(this.emp.value.dob);
    let empDate = d.getFullYear() + '-' +
      ((d.getMonth() + 1) <= 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + '-' +
      (d.getDate() <= 9 ? '0' + d.getDate() : d.getDate());
    this.emp.dob = empDate;
  }
  saveEmployee(empInfo) {
    if (empInfo.value.dob) {
      let d = new Date(empInfo.value.dob);
      let empDate = d.getFullYear() + '-' +
        ((d.getMonth() + 1) <= 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + '-' +
        (d.getDate() <= 9 ? '0' + d.getDate() : d.getDate());
      empInfo.value.dob = empDate;
    }
    if (this.inputData.value) {
      this.editEmp(this.inputData.value);
    } else {
      let obj: any = [];
      obj = [{
        'mail': {
          'mail': empInfo.value.mail
        },
        'basic': {
          // 'image': 'manoj.jpg',
          'name': empInfo.value.fName + empInfo.value.lName,
          'nameDetails': {
            'fName': empInfo.value.fName,
            'lName': empInfo.value.lName
          },
          'designation': empInfo.value.designation,
          'organisationDetails': {
            'organisationId': this.organisationId
          },
          'roleDetails': {
            'roleId': empInfo.value.roleId
          },
          // 'groups': [{
          //   'groupId': empInfo.value.groupId
          // }],
          'dob': empInfo.value.dob,
          'gender': empInfo.value.gender,
          // 'country': 'india',
          'userName': empInfo.value.fName + empInfo.value.lName,
          'postCode': '677',
          'mobileNo': empInfo.value.mobileNo,
          'loginType': 'EMAIL'
        }
      }];
      this.employeeServies.empAdd(obj).subscribe(data => {
        if (data) {
          // this.toastr.success('Successfully');
          // this.showLoader = false;
          this.toastr.success(data.message);
          this.dialogRef.close(data.message);
        } else {
          this.toastr.success(data.message);
        }
      },
        err => {
          let mgs = JSON.parse(err._body);
          mgs = mgs.message;
          // this.showLoader = false;
          this.toastr.error(mgs);
          // // this.showLoader = false;
        });
    }
  }
  empBlukupload(val): void {
    const dialogRef = this.dialog.open(BlukuploadComponent, {
      panelClass: 'uploadPopUpData',
      disableClose: true,
      data: val
      // width: '651px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close();
      console.log('The dialog was closed');
      console.log(result);
      // this.EmployeeListComponent.employeeList();
    });
  }
  roleList() {
    this.employeeServies.roleList().subscribe(data => {
      if (data) {
        this.roles = data.roles;
      }
    },
      err => {
        let mgs = JSON.parse(err._body);
      });
  }
}
