import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GroupRoutes } from './group.routing';
import { SharedModule } from '../../shared/shared.module';
import { GroupListComponent } from './group-list/group-list.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ViewGroupComponent } from './view-group/view-group.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(GroupRoutes)
  ],
  declarations: [GroupListComponent, CreateGroupComponent, ViewGroupComponent]
})
export class GroupModule { }
