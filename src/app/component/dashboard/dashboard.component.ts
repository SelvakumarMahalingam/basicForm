import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public curr: any = 0;
  public tabList = [{
    id: '1', name: 'Company Info',
  }, {
    id: '2', name: 'Super Admin Info',
  }, {
    id: '3', name: 'Invite More Admin',
  }]
}
