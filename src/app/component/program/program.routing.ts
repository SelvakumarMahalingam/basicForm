/**
 * Created BY HMSPL
 * Modified By selva on 30/11/2018
 * Modified Description : Created Route
 */
import { Routes } from '@angular/router';

import { CreateProgramComponent } from './create-program/create-program.component';
import { ProgramsListComponent } from './programs-list/programs-list.component';

 export const ProgramRoutes: Routes = [
    {
        path: '',
        component: ProgramsListComponent
    },
    {
        path: 'program-create',
        component: CreateProgramComponent
    },
];
