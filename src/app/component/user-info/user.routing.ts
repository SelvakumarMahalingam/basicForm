/**
 * Created BY HMSPL
 * Modified By selva on 25/12/2018
 * Modified Description : Created Route
 */
import { Routes } from '@angular/router';
import { UserInfoComponent } from '../user-info/user-info/user-info.component';
import { ChangePasswordComponent } from '../user-info/change-password/change-password.component';

export const UserRoutes: Routes = [
  {
    path: '',
    component: UserInfoComponent
  },
  {
    path: 'session/change-password',
    component: ChangePasswordComponent
  }
];
