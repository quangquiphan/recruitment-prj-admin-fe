import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concat } from 'lodash';
import { AuthUser } from 'src/app/model/auth-user.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import AppConstant from 'src/app/utilities/app-constant';
import AppUtil from 'src/app/utilities/app-util';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{
  signInForm: FormGroup = new FormGroup({});
  authUser: AuthUser | undefined;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authenticateService: AuthenticateService
  ) {
    this.signInForm = this.fb.group({
      email: [ '', [
        Validators.required,
        Validators.pattern(AppConstant.PATTERNS.EMAIL)
      ]],
      passwordHash: [ '', [
        Validators.required,
        Validators.pattern(AppConstant.PATTERNS.PASSWORD)
      ]],
      keepLogin: [false]
    })
  }

  ngOnInit(): void {

  }

  onSignIn() {
    let params = {
      email: this.signInForm.value.email,
      passwordHash: AppUtil.hasMD5(this.signInForm.value.passwordHash).toString(),
      keepLogin: Boolean (this.signInForm.value.keepLogin)
    }


    this.authenticateService.login(AppUtil.toSnakeCaseKey(params)).subscribe(
      res => {
        if (res.status === 200) {
          this.authenticateService.setToken(res.data.accessToken);
          this.route.navigate(['/candidate']).then(r => {});
        }
      }
    )
  }
}
