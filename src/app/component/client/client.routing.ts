/**
 * Created BY HMSPL
 * Modified By selva on 25/12/2018
 * Modified Description : Created Route
 */
import { Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { ViewClientComponent } from './view-client/view-client.component';

  export const ClientRoutes: Routes = [
  {
    path: '',
    component: ClientListComponent
  },
  {
      path: 'client-create',
      component: CreateClientComponent
  },
  {
    path: 'client-view/:id',
    component: ViewClientComponent
}
];
