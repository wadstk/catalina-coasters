import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Unable to login';

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private localstorageService: LocalstorageService,
              private router: Router) { }

  ngOnInit(): void {
    this._initLoginForm();
  }

  _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.isSubmitted = true;
    
    if(this.loginFormGroup.invalid) { return; }
    
    const loginData = {
      username: this.loginForm.username.value,
      password: this.loginForm.password.value
    };

    this.auth.login(loginData.username, loginData.password).subscribe((user) => {

      this.authError = false;
      this.localstorageService.setItem(<string>user.token);
      this.router.navigate(['/']);

    }, (error: HttpErrorResponse) => {

      this.authError = true;

      /*if(error.status != 400) {
        this.authMessage = "Server Error, Please try again";
      } */

    });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
