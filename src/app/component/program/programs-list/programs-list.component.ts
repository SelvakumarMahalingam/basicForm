
import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort, MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { noop as _noop } from 'lodash-es';
import { PageEvent } from '@angular/material';
import { ProgramApiService } from '../../../services/program.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BuyProgramComponent } from '../buy-program/buy-program.component';
interface Element {
  ProgramName: string;
  coachName: string;
  GroupsLinkied: string;
  ProgramSize: string;
}

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.scss']
})

export class ProgramsListComponent implements OnInit {
  public programs: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  // limit: number = 1000;
  public showLoader: any = false;
  public userDetails: any = {};
  public organisationId: any;


  displayedColumns: string[] = ['image', 'ProgramName', 'ProgramCost', 'modules', 'lesson', 'status', 'action'];
  // full: boolean = true;

  constructor(public dialog: MatDialog,
    private programService: ProgramApiService,
    private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource(this.programs);
    if (localStorage.getItem('userDetails')) {
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      this.organisationId = this.userDetails.user.organisationDetails.organisationId;
    }
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.programList();
  }

  // program list
  programList() {
    this.showLoader = true;
    let obj: any = {};
    obj = {
      'index': 0,
      'limit': 0,
      'total': 0,
      'sortingKey': 'asc',
      'sortBy': 'asc',
      'organisationId': this.organisationId
    };
    this.programService.programList(obj).subscribe(data => {
      if (data) {
        this.showLoader = false;
        this.dataSource.data = data.programs;
      } else {
        // this.toastr.success(data.message);
      }
    },
      err => {
        let mgs = JSON.parse(err._body);
        mgs = mgs.message;
        this.toastr.error(mgs);
        this.showLoader = false;
        // this.showLoader = false;
      });
  }
  // buy program
  buyProgram(val) {
    this.showLoader = true;
    let obj: any = {};
    obj = {
      'organisationId': this.organisationId,
      'programId': val.programId
    };
    this.programService.buyProgram(obj).subscribe(data => {
      if (data) {
        this.showLoader = false;
        this.toastr.success(data.message);
      } else {
        // this.toastr.success(data.message);
      }
    },
      err => {
        let mgs = JSON.parse(err._body);
        mgs = mgs.message;
        this.toastr.error(mgs);
        this.showLoader = false;
      });
  }
  buyPopUp(val): void {
    let currProgram = val;
    const dialogRef = this.dialog.open(BuyProgramComponent, {
      // panelClass: 'uploadPopUp',
      disableClose: true,
      data: { value: val },
      // width: '651px',
      width: '430px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.buyProgram(currProgram);
      }
    });
  }
}

