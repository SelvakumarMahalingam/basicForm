import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload';
import {
  MatMenuModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatTabsModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatExpansionModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { OnlyNumber } from '../directive/onlyNumber.directive';


@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    MatMenuModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    FileUploadModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatExpansionModule
  ],
  declarations: [OnlyNumber],
  exports: [
    NgxDatatableModule,
    MatMenuModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    OnlyNumber,
    MatSlideToggleModule,
    MatTableModule,
    FileUploadModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatExpansionModule
  ]
})
export class SharedModule { }
