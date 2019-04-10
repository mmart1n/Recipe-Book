import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthService } from '../auth.service';
import { EqualPasswordsValidator } from 'src/app/shared/generic-equal-passlords.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      'currPassword': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'newPassword': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'repeatedNewPassword': new FormControl('', [Validators.required, EqualPasswordsValidator.checkPasswords('newPassword')])
    });
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      this.authService.changePassword(this.changePasswordForm.value.currPassword, this.changePasswordForm.value.newPassword);
      this.changePasswordForm.reset();
    }
  }

}
