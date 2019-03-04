import { Component, OnInit, ViewChild } from '@angular/core';
import { delay } from '../../../directive/animation';
import { PageEvent } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeApiService } from '../../../services/employee.service';
import { ProgramApiService } from '../../../services/program.service';
import { ToastrService } from 'ngx-toastr';

export interface UserData {
  programName: string;
  coachName: string;
  groupName: string;
  programSize: string;
  status: string;
}

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
  animations: [delay]
})
export class ViewEmployeeComponent implements OnInit {

  public userDetails: any = {};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageEvent: PageEvent;
  public showLoader = false;
  public viewId: any = {};
  public users = [];
  displayedColumns = ['image', 'programName', 'coachName', 'programSize', 'status'];
  dataSource: MatTableDataSource<UserData>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeServies: EmployeeApiService,
    private programService: ProgramApiService,
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.route.snapshot.paramMap.get('id')) {
      this.viewId = this.route.snapshot.paramMap.get('id');
    }
    this.programList();
    this.viewDetails(this.viewId);
  }
  viewDetails(val) {
    this.employeeServies.viewEmp(this.viewId).subscribe(data => {
      if (data) {
        this.userDetails = data.user;
      }
    },
      err => {
        let mgs = JSON.parse(err._body);
        mgs = mgs.message;
        // this.toastr.error(mgs);
      });
  }

  programList() {
    this.showLoader = true;
    let obj: any = {};
    obj = {
      'index': 0,
      'limit': 0,
      'total': 0,
      'sortingKey': 'asc',
      'sortBy': 'asc',
      // 'userId': this.viewId
      'userId': this.viewId,
      // 'organisationId': this.viewId
        };
    this.programService.userProgramList(obj).subscribe(data => {
      if (data) {
        this.dataSource.data = data.programs;
        this.showLoader = false;
      } else {
        //     this.toastr.success(data.message);
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
