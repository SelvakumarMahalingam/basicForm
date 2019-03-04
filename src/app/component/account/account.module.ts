import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountRoutes } from './account.routing';
import { SharedModule } from '../../shared/shared.module';
import { AccountInfoComponent } from './account-info/account-info.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AccountRoutes),
    FileUploadModule
  ],
  declarations: [AccountInfoComponent]
})
export class AccountModule { }
