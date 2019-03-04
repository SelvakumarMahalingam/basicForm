/**
 * Created BY HMSPL
 * Modified By selva on 11/11/2018
 * Modified Description : Created Route
 */
import { Routes } from '@angular/router';
import { AccountInfoComponent } from './account-info/account-info.component';

// import { EquipmentCreateComponent } from './equipment-create/equipment-create.component';


export const AccountRoutes: Routes = [{
    path: '',
    component: AccountInfoComponent
}
// },
// {
//     path: 'equipment-mapping-create',
//     component: EquipmentCreateComponent
// }
];
