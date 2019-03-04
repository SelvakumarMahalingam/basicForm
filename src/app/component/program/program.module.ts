import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProgramComponent } from './create-program/create-program.component';
import { ProgramsListComponent } from './programs-list/programs-list.component';
import { RouterModule } from '@angular/router';
import { ProgramRoutes } from './program.routing';
import { SharedModule } from '../../shared/shared.module';
import { BuyProgramComponent } from './buy-program/buy-program.component';

// videogular
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
// import {SingleMediaPlayer} from './single-media-player';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProgramRoutes),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    SharedModule,
    FileUploadModule,
    ImageCropperModule
  ],
  declarations: [CreateProgramComponent, ProgramsListComponent, BuyProgramComponent],
  entryComponents: [BuyProgramComponent]
})
export class ProgramModule { }
