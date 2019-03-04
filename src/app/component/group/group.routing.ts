/**
 * Created BY HMSPL
 * Modified By selva on 11/11/2018
 * Modified Description : Created Route
 */
import { Routes } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ViewGroupComponent } from './view-group/view-group.component';

 export const GroupRoutes: Routes = [
    {
    path: '',
    component: GroupListComponent
    },
    {
        path: 'group-create',
        component: CreateGroupComponent
    },
    {
      path: 'group-view',
      component: ViewGroupComponent
   }
    
];
