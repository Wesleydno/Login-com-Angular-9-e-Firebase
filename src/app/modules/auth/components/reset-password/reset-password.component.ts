import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public fGroup: FormGroup;

  constructor(private fBuilder: FormBuilder) {
    this.fGroup = this.fBuilder.group({
      'email': [null, Validators.compose([
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ])]
    });

   }

  ngOnInit() {
  }

  ngOnSubmit(){
    if(this.fGroup.invalid){
      return;
    }
    console.log(this.fGroup.value);
  }

}
