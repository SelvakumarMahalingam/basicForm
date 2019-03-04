/**
 * Created BY HMSPL
 * Modified By selva on 11/11/2018
 * Modified Description : Created Route
 */
import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

 export const EmployeeRoutes: Routes = [
  {
    path: '',
    component: EmployeeListComponent
  },
  {
      path: 'employee-create',
      component: CreateEmployeeComponent
  },
  {
    path: 'employee-view/:id',
    component: ViewEmployeeComponent
 }
];
