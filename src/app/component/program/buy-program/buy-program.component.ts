import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-buy-program',
  templateUrl: './buy-program.component.html',
  styleUrls: ['./buy-program.component.scss']
})
export class BuyProgramComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BuyProgramComponent>,
  ) { }

  ngOnInit() {
  }
  buyProgram() {
    this.dialogRef.close('BuyProgram');
  }
}
