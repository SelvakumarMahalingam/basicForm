import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import {AuthGuard} from './core/auth-guard/auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'session/signin',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
{
  path: '',
  component: AdminLayoutComponent,
  children: [
     {
      path: 'dashboard',
      loadChildren: './component/dashboard/dashboard.module#DashboardModule',
      canActivate: [AuthGuard]
    },
    {
      path: 'account',
      loadChildren: './component/account/account.module#AccountModule',
      canActivate: [AuthGuard]
    },
    {
      path: 'employee-management',
      loadChildren: './component/employeelist/employeelist.module#EmployeelistModule',
      canActivate: [AuthGuard]
    },
    {
      path: 'group-management',
      loadChildren: './component/group/group.module#GroupModule',
      canActivate: [AuthGuard]
    },
    {
      path: 'program-management',
      loadChildren: './component/program/program.module#ProgramModule',
      canActivate: [AuthGuard]
    },
    {
      path: 'profile-management',
      loadChildren: './component/profile/profile.module#ProfileModule',
      canActivate: [AuthGuard]
    },
    {
      path: 'client-management',
      loadChildren: './component/client/client.module#ClientModule',
      canActivate: [AuthGuard]
    },
    {
      path: 'userInfo/:id',
      loadChildren: './component/user-info/user-info.module#UserInfoModule',
      canActivate: [AuthGuard]
    }
  ]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'session',
    loadChildren: './session/session.module#SessionModule'
  }]
}, {
  path: '**',
  redirectTo: 'session/404'
}];
