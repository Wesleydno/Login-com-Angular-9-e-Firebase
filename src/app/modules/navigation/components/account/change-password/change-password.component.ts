import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from './../../../../../services/auth.service';

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  fGroup: FormGroup;
  hideNewPassword: boolean;
  user: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private fBuilder: FormBuilder
  ) {
    this.hideNewPassword = true;
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.fGroup = this.fBuilder.group({
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
    });
  }

  async ngOnSubmit() {
    this.user = this.fGroup.value;
    console.log(this.user);
  }

  get password() {
    return this.fGroup.get("password");
  }
}
