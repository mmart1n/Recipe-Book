import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { EqualPasswordsValidator } from 'src/app/shared/generic-equal-passlords.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  SignUpForm: FormGroup;

  ngOnInit() {
    this.SignUpForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'newPassword': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'repeatedNewPassword': new FormControl('', [Validators.required, EqualPasswordsValidator.checkPasswords('newPassword')])
    });
  }

  onSubmit() {
    if (this.SignUpForm.valid) {
      this.authService.signupUser(this.SignUpForm.value.email, this.SignUpForm.value.newPassword);
      this.SignUpForm.reset();
    }
  }

}
