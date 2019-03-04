import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private logUser: AuthenticationService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ]
    });
  }

  onSubmit(formdata) {
    let obj: any = {};
    obj.mail = formdata.value.email;
    this.logUser.forgotpassword(obj).subscribe(data => {
      if (data) {
        this.toastr.success(data.message);
        this.router.navigate(['/session/signin']);
      }
    },
      err => {
        let mgs = JSON.parse(err._body);
        this.toastr.error(mgs.message);
      });
  }
}
