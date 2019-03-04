import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileRoutes } from './profile.routing';
import { ProfileManagementComponent } from './profile-management/profile-management.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProfileRoutes),
    SharedModule
  ],
  declarations: [ProfileManagementComponent]
})
export class ProfileModule { }
