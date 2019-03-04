
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { delay } from '../../../directive/animation';
import { PageEvent } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { EmployeeApiService } from '../../../services/employee.service';
export interface UserData {
  image: string;
  empName: string;
  empCode: string;
  groupName: string;
  status: string;
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  animations: [delay]
  // encapsulation: ViewEncapsulation.None
})

export class EmployeeListComponent implements OnInit {
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageEvent: PageEvent;
  displayedColumns = ['empName', 'empCode', 'groupName', 'status', 'action'];
  dataSource = new MatTableDataSource();
  public emp: any = {};
  public users: any = [];
  public showLoader: any = false;
  public empStatus = [
    { id: '1', name: 'ACTIVE' },
    { id: '2', name: 'INACTIVE' }];
  constructor(public dialog: MatDialog,
    private toastr: ToastrService,
    private employeeServies: EmployeeApiService) {
    this.emp.status = 'Active';
    this.employeeList();
    this.dataSource = new MatTableDataSource(this.users);
  }
  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();
  }
    // change status */
  statusChange(val, element) {
    this.employeeServies.empChangeStatus(val).subscribe(data => {
      if (data) {
        this.toastr.success('Status updated Successfully');
        this.employeeList();
      } else {
        this.toastr.success(data.message);
      }
    },
      err => {
        let mgs = JSON.parse(err._body);
        mgs = mgs.message;
        this.toastr.error(mgs);
      });
  }
  /* remove employee*/
  removeEmp(val) {
  }
  addEmployee(type, val): void {
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
      panelClass: 'uploadPopUp',
      disableClose: true,
      data: { type: type, value: val }
      // width: '651px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.employeeList();
      }
    });
  }
  //  Search popup box
  public loadData() {
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
  // employee list
  employeeList() {
    let userDetails: any = {};
    let organisationId: any;
    if (localStorage.getItem('userDetails')) {
      userDetails = JSON.parse(localStorage.getItem('userDetails'));
      organisationId = userDetails.user.organisationDetails.organisationId;
    }
    this.showLoader = true;
    let obj: any = {};
    // obj = {
    //   // 'index': 0,
    //   // 'limit': 10,
    //   // 'total': 100,
    //   // 'sortingKey': 'asc',
    //   // 'sortBy': 'asc',
    //   'organisationId': 'ORG24846904ae9e75434e7ecded2'
    // };
    obj = {
      'organisationId': organisationId
    };
    this.employeeServies.emplist(obj).subscribe(data => {
      if (data) {
        this.dataSource.data = data.users;
        this.showLoader = false;
      } else {
        this.toastr.success(data.message);
      }
    },
      err => {
        let mgs = JSON.parse(err._body);
        mgs = mgs.message;
        this.toastr.error(mgs);
        this.showLoader = false;
      });
  }
}
