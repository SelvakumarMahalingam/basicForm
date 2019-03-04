import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService,
    private logUser: AuthenticationService) { }

  ngOnInit() {
    if (localStorage.getItem('authToken')) {
      // window.history.back();
      this.router.navigate(['/employee-management']);
      } else {
      this.router.navigate(['/session/signin']);
      }

    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      password: [null, Validators.compose([Validators.required])]
    });
  }
  onSubmit(formdata) {
    let obj: any = {};
    obj.mail = formdata.value.email;
    obj.password = formdata.value.password;
    this.logUser.login(obj).subscribe(data => {
      if (data) {
        this.toastr.success(data.message);
        localStorage.setItem('authToken', data.authorization);
        localStorage.setItem('userDetails', JSON.stringify(data));
        this.router.navigate(['/employee-management']);
      }
    },
      err => {
        let mgs = JSON.parse(err._body);
        this.toastr.error(mgs.message);
      });
  }

}
