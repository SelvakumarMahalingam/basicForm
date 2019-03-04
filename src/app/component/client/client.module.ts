import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutes } from './client.routing';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { MatDialogModule } from '@angular/material';
import { ViewClientComponent } from './view-client/view-client.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AcceptProgramComponent } from './accept-program/accept-program.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    RouterModule.forChild(ClientRoutes),
    ImageCropperModule
  ],
  // providers: [
  //   { provide: LY_THEME, useClass: MinimaLight, multi: true }, // name: `minima-light`
  //   { provide: LY_THEME, useClass: MinimaDark, multi: true } // name: `minima-dark`
  // ],
  declarations: [ClientListComponent, CreateClientComponent, AcceptProgramComponent, ViewClientComponent],
  entryComponents: [CreateClientComponent, AcceptProgramComponent],
})
export class ClientModule { }
