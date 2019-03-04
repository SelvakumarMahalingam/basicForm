/**
 * Created BY HMSPL
 * Modified By selva on 11/11/2018
 * Modified Description : Created Route
 */
import { Routes } from '@angular/router';
import { ProfileManagementComponent } from './profile-management/profile-management.component';

 export const ProfileRoutes: Routes = [
    {
        path: '',
        component: ProfileManagementComponent
    }
];
