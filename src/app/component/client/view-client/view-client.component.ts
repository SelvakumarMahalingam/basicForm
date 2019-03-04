import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort, MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { ClientApiService } from '../../../services/client.service';
import { ProgramApiService } from '../../../services/program.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateClientComponent } from '../create-client/create-client.component';
import { AcceptProgramComponent } from '../accept-program/accept-program.component';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../services/common.service';
@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit {
  public programs: any = [];
  public currProgram: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['image', 'programName', 'programCost', 'totalModules', 'totalLessons', 'status'];
  public superAdmin: any = true;
  public viewId: any = {};
  public clientDetails: any;
  public showLoader: any;
  public authToken: any;
  public cdnUrl: any;
  constructor(private clientServies: ClientApiService,
    private programService: ProgramApiService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private commonService: CommonService
  ) {
    this.dataSource = new MatTableDataSource(this.programs);
    this.cdnUrl = this.commonService.imageUrl;
    if (localStorage.getItem('authToken')) {
      this.authToken = localStorage.getItem('authToken');
    }
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.route.snapshot.paramMap.get('id')) {
      this.viewId = this.route.snapshot.paramMap.get('id');
      this.programList();
    }
    this.clientList();
  }

  // program list
  programList() {
    let obj: any = {};
    obj = {
      'index': 0,
      'limit': 0,
      'total': 0,
      'sortingKey': 'asc',
      'sortBy': 'asc',
      'organisationId': this.viewId
    };
    this.programService.userProgramList(obj).subscribe(data => {
      if (data) {
        this.dataSource.data = data.programs;
      } else {
        // this.toastr.success(data.message);
      }
    },
      err => {
        let mgs = JSON.parse(err._body);
        mgs = mgs.message;
        // this.toastr.error(mgs);
      });
  }

  clientList() {
    this.showLoader = true;
    let obj: any = {};
    obj = {
      'organisation': {
      }
    };
    this.clientServies.viewClient(this.viewId).subscribe(data => {
      if (data) {
        this.showLoader = false;
        this.clientDetails = data.organisation;
      } else {
        //     this.toastr.success(data.message);
      }
    },
      err => {
        let mgs = JSON.parse(err._body);
        mgs = mgs.message;
        this.showLoader = false;
        // this.toastr.error(mgs);
        // this.showLoader = false;
      });
  }
  clientCreate(type, val): void {
    const dialogRef = this.dialog.open(CreateClientComponent, {
      panelClass: 'createClient',
      disableClose: true,
      data: { type: type, value: val }
      // width: '651px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.clientList();
      }
    });
  }
  acceptPopUp(val): void {
    this.currProgram = val;
    const dialogRef = this.dialog.open(AcceptProgramComponent, {
      // panelClass: 'uploadPopUp',
      disableClose: true,
      data: { value: val },
      // width: '651px',
      width: '550px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.acceptProgram(result);
      }
    });
  }
  acceptProgram(val) {
    this.showLoader = true;
    let obj: any = {};
    obj = {
      'programId': this.currProgram.programId,
      'isFreeProgram': true,
      'cost': JSON.parse(val.value.cost)
    };
    this.programService.acceptProgram(obj).subscribe(data => {
      if (data) {
        this.showLoader = false;
        this.dataSource.data = data.programs;
        this.programList();
      } else {
        console.log('data empty');
      }
    },
      err => {
        this.showLoader = false;
        let mgs = JSON.parse(err._body);
        mgs = mgs.message;
        // this.toastr.error(mgs);
      });
  }
}
