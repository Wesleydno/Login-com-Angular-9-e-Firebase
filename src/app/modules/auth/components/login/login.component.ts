import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { FirebaseError } from '../../../../helpers/firebase-errors';
import { AuthService } from './../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public fGroup: FormGroup;
  public hide = true;
  public showSpinner = false;
  public showFormLogin = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private fBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.fGroup = this.fBuilder.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ]),
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  ngOnSubmit() {
    this.login();
  }

  async login() {
    try {
      this.showSpinner =  true;
      this.showFormLogin = false;
      await this.authService.login(this.email.value, this.password.value);
      this.fGroup.reset();
      this.router.navigate(['home/dashboard'], { replaceUrl: true });
    } catch (error) {
      this.showSpinner = false;
      this.showFormLogin = true;
      await this.openSnackBar(FirebaseError('Login', error), 'Falha');
    } finally {
      this.showSpinner = false;
      this.showFormLogin = true;
    }
  }

  get email() {
    return this.fGroup.get('email');
  }

  get password() {
    return this.fGroup.get('password');
  }

  async openSnackBar(message: string, action: string) {
    await this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
    });
  }
}
