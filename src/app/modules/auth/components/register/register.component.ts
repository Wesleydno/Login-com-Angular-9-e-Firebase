import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { FirebaseError } from '../../../../helpers/firebase-errors';
import { MustMatch } from '../../../../helpers/must-match.validator';
import { AuthService } from './../../../../services/auth.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  public fGroup: FormGroup;
  public showSpinner = false;
  public showFormRegister = true;

  user: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private fBuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.fGroup = this.fBuilder.group(
      {
        name: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25),
            Validators.pattern(/^[a-zA-Z\s]*$/),
          ]),
        ],
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
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(25),
          ]),
        ],
        confirmPassword: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(25),
          ]),
        ],
      },
      { validator: MustMatch("password", "confirmPassword") }
    );
  }

  ngOnInit() {}

  async ngOnSubmit() {
    this.user = this.fGroup.value;
    try {
      this.showSpinner = true;
      this.showFormRegister = false;
      await this.authService.register(this.user);
      this.fGroup.reset();
      this.router.navigate(["home/dashboard"], { replaceUrl: true });
    } catch (error) {
      this.showSpinner = false;
      this.showFormRegister = true;

      await this.openSnackBar(FirebaseError("Register", error), "Falha");
    } finally {
      this.showSpinner = false;
      this.showFormRegister = true;
    }
  }

  get email() {
    return this.fGroup.get("email");
  }

  get password() {
    return this.fGroup.get("password");
  }

  async openSnackBar(message: string, action: string) {
    await this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: "top",
    });
  }
}
