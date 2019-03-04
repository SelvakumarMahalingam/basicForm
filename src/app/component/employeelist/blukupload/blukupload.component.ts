import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { EmployeeApiService } from '../../../services/employee.service';
import { containsElement } from '@angular/animations/browser/src/render/shared';
// export interface UserData {
//   empid: string;
//   employeename: string;
//   email: string;
//   groupName: string;
// }
@Component({
  selector: 'app-blukupload',
  templateUrl: './blukupload.component.html',
  styleUrls: ['./blukupload.component.scss']
})
export class BlukuploadComponent implements OnInit {
  public empDetails = [];
  public rowList = [];
  public curr: any;
  public userDetails: any = {};
  public organisationId: any;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageEvent: PageEvent;
  displayedColumns = ['userName', 'employeename', 'email', 'designation', 'action'];
  // dataSource: MatTableDataSource<UserData>;
  dataSource = new MatTableDataSource();
  constructor(@Inject(MAT_DIALOG_DATA) public inputData: any, public dialog: MatDialog,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<BlukuploadComponent>,
    private employeeServies: EmployeeApiService) {
    this.empDetails = this.inputData;
    this.dataSource = new MatTableDataSource(this.empDetails);
    this.dataSource.paginator = this.paginator;
    if (localStorage.getItem('userDetails')) {
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      this.organisationId = this.userDetails.user.organisationDetails.organisationId;
    }
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  rowsVal(row) {
    this.rowList.push(row);
  }
  removeEmp(index) {
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = this.dataSource.filteredData;
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  saveEmployee() {
    // let finalReq = this.dataSource.filteredData.filter(function (value, index) {
    const finalReq: any = [];
    this.dataSource.filteredData.forEach((value: any, key: any) => {
      let obj: any = {};
      if (this.dataSource.filteredData) {
        obj = {
          'mail': {
            'mail': value.email
          },
          'basic': {
            'name': value.name,
            'nameDetails': {
              'fName': value.name,
              'lName': value.name
            },
            'designation': value.designation,
            'organisationDetails': {
              'organisationId': this.organisationId
            },
            'roleDetails': {
              'roleId': '1'
            },
            'userName': value.userName,
            'postCode': '677',
            'loginType': 'EMAIL'
          }
        };
      }
      finalReq.push(obj);
    });
    this.employeeServies.empAdd(finalReq).subscribe(data => {
      if (data) {
        this.dialogRef.close(data.message);
        this.toastr.success(data.message);
      } else {
        // this.toastr.success(data.message);
      }
    },
      err => {
        let mgs = JSON.parse(err._body);
        mgs = mgs.message;
        this.toastr.error(mgs);
        // this.showLoader = false;
      });
    // this.toastr.success('Data added successfully..!');
    // this.dialogRef.close();
  }
}
