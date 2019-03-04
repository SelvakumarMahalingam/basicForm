import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort, MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  public emp: any = {};
  public programs: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['image', 'programName', 'programCost', 'totalModules', 'totalLessons', 'action'];
  public superAdmin: any = true;
  constructor() {
    this.dataSource = new MatTableDataSource(this.programs);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.programDetails();
  }

  programDetails() {

    this.dataSource.data = [
      {
        'image': 'manoj.jpg',
        'programName': 'Marian',
        'programCost': '$2,749.06',
        'totalModules': 21,
        'totalLessons': 20,
        'action': 'accept'
      },
      {
        'image': 'manoj.jpg',
        'programName': 'Anna',
        'programCost': '$3,976.86',
        'totalModules': 37,
        'totalLessons': 21,
        'action': 'reject'
      },
      {
        'image': 'manoj.jpg',
        'programName': 'Carey',
        'programCost': '$2,703.57',
        'totalModules': 28,
        'totalLessons': 30,
        'action': 'pending'
      },
      {
        'image': 'manoj.jpg',
        'programName': 'Doyle',
        'programCost': '$2,925.70',
        'totalModules': 34,
        'totalLessons': 31,
        'action': 'reject'
      },
      {
        'image': 'manoj.jpg',
        'programName': 'Mandy',
        'programCost': '$2,540.92',
        'totalModules': 20,
        'totalLessons': 21,
        'action': 'reject'
      },
      {
        'image': 'manoj.jpg',
        'programName': 'Evangelina',
        'programCost': '$3,041.20',
        'totalModules': 39,
        'totalLessons': 26,
        'action': 'accept'
      },
      {
        'image': 'manoj.jpg',
        'programName': 'Kelly',
        'programCost': '$3,764.83',
        'totalModules': 39,
        'totalLessons': 28,
        'action': 'accept'
      },
      {
        'image': 'manoj.jpg',
        'programName': 'Petty',
        'programCost': '$2,772.10',
        'totalModules': 21,
        'totalLessons': 22,
        'action': 'accept'
      },
      {
        'image': 'manoj.jpg',
        'programName': 'Whitaker',
        'programCost': '$3,792.52',
        'totalModules': 27,
        'totalLessons': 29,
        'action': 'pending'
      },
      {
        'image': 'manoj.jpg',
        'programName': 'Judith',
        'programCost': '$2,236.21',
        'totalModules': 21,
        'totalLessons': 32,
        'action': 'accept'
      },
      {
        'image': 'manoj.jpg',
        'programName': 'Dawson',
        'programCost': '$1,273.29',
        'totalModules': 21,
        'totalLessons': 40,
        'action': 'accept'
      },
      {
        'image': 'manoj.jpg',
        'programName': 'Mcconnell',
        'programCost': '$1,870.64',
        'totalModules': 37,
        'totalLessons': 29,
        'action': 'accept'
      },
      {
        'image': 'manoj.jpg',
        'programName': 'Glenn',
        'programCost': '$3,465.19',
        'totalModules': 26,
        'totalLessons': 37,
        'action': 'accept'
      },
      {
        'image': 'manoj.jpg',
        'programName': 'Vinson',
        'programCost': '$1,744.32',
        'totalModules': 30,
        'totalLessons': 39,
        'action': 'accept'
      },
      {
        'image': 'manoj.jpg',
        'programName': 'Gina',
        'programCost': '$2,140.76',
        'totalModules': 20,
        'totalLessons': 24,
        'action': 'accept'
      },
      {
        'image': 'manoj.jpg',
        'programName': 'Mcfarland',
        'programCost': '$1,805.43',
        'totalModules': 21,
        'totalLessons': 29,
        'action': 'accept'
      },
      {
        'image': 'manoj.jpg',
        'programName': 'Buck',
        'programCost': '$2,577.20',
        'totalModules': 37,
        'totalLessons': 34,
        'action': 'accept'
      }
    ];
  }

}
