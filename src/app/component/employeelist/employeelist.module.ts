import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { RouterModule } from '@angular/router';
import { EmployeeRoutes } from './employee.routing';
import { SharedModule } from '../../shared/shared.module';
import { FileUploadModule } from 'ng2-file-upload';
import { MatDialogModule } from '@angular/material';
import { BlukuploadComponent } from './blukupload/blukupload.component';

import { MatListModule, MatSelectModule, MatOptionModule, MatButtonModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeeRoutes),
    SharedModule,
    MatDialogModule,
    MatSelectModule,
    MatListModule,
    MatOptionModule,
    MatButtonModule
  ],
  entryComponents: [ BlukuploadComponent],
  declarations: [EmployeeListComponent, CreateEmployeeComponent, ViewEmployeeComponent, BlukuploadComponent]
})
export class EmployeelistModule { }
