// import { Component, OnInit, ViewChild } from '@angular/core';
// import { delay } from '../../../directive/animation';
// import { PageEvent } from '@angular/material';
// import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateClientComponent } from '../create-client/create-client.component';
// export interface UserData {
//   companyName: string;
//   mailId: string;
//   tradingName: string;
//   regno: string;
//   status: string;
//   themeColor: string;
// }
import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

// import { GithubApi } from '../models/Issues';

import { ToastrService } from 'ngx-toastr';
import { ClientApiService } from '../../../services/client.service';

// export interface GithubApi {
//   items: GithubIssue[];
//   total_count: number;
// }

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
  // animations: [delay]
})
export class ClientListComponent implements OnInit {
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public showLoader: any = false;
  pageEvent: PageEvent;
  displayedColumns = ['Companyname', 'MailID', 'TradingName', 'BusinessRegistrationNo', 'Status', 'action'];
  // exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();
  // resultsLength = 0;
  // isLoadingResults = false;
  // isRateLimitReached = false;
  public users: any = [];
  // constructor(private http: HttpClient) { }
  // ngAfterViewInit() {
  //   this.exampleDatabase = new ExampleHttpDao(this.http);

  //   // If the user changes the sort order, reset back to the first page.
  //   this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

  //   merge(this.sort.sortChange, this.paginator.page)
  //     .pipe(
  //       startWith({}),
  //       switchMap(() => {
  //         this.isLoadingResults = true;
  //         return this.exampleDatabase!.getRepoIssues(
  //           this.sort.active, this.sort.direction, this.paginator.pageIndex);
  //       }),
  //       map(data => {
  //         // Flip flag to show that loading has finished.
  //         this.isLoadingResults = false;
  //         this.isRateLimitReached = false;
  //         this.resultsLength = data.total_count;

  //         return data.items;
  //       }),
  //       catchError(() => {
  //         this.isLoadingResults = false;
  //         // Catch if the GitHub API has reached its rate limit. Return empty data.
  //         this.isRateLimitReached = true;
  //         return observableOf([]);
  //       })
  //     ).subscribe(data => this.dataSource.data = data);
  // }


  constructor(public dialog: MatDialog, private toastr: ToastrService,
    private clientServies: ClientApiService) {
    // const users: UserData[] = [];
    // this.dataSource = new MatTableDataSource(users);
    // // this.dataSource = new MatTableDataSource(this.rows);
    this.clientList();
    this.dataSource = new MatTableDataSource(this.users);
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();
  }
  // search
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

  // client list
  clientList() {
    this.showLoader = true;
    let obj: any = {};
    obj = {
      'index': 0,
      'limit': 0,
      'total': 0,
      'sortingKey': 'asc',
      'sortBy': 'asc',
    };
    this.clientServies.clientList(obj).subscribe(data => {
      if (data) {
        this.showLoader = false;
        this.dataSource.data = data.organisations;
        //  this.dataSource.filter =  data.users;
        // this.toastr.success('Successfully');
        // this.toastr.success(data.message);
        //  this.router.navigate(['/']);
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
  removeClient(val) {
    console.log('d');
  }
}

