import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-buy-program',
  templateUrl: './accept-program.component.html',
  styleUrls: ['./accept-program.component.scss']
})
export class AcceptProgramComponent implements OnInit {
  public program: any = {};

  constructor(
    public dialogRef: MatDialogRef<AcceptProgramComponent>,
  ) { }

  ngOnInit() {
  }
  saveProgram(formData) {
     this.dialogRef.close(formData);
  }
}
