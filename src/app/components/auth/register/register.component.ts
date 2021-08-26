import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgRecaptcha3Service } from 'ng-recaptcha3';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AppSettings } from '../../../config/constants';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  captcha: string = AppSettings.Captcha;

  myForm: FormGroup;
  formData: any;
  private siteKey = this.captcha;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private recaptcha3: NgRecaptcha3Service
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: '',
      username: '',
      password: '',
    });
    this.recaptcha3.init(this.siteKey).then((status) => {
      console.log(status);
    });
  }

  signUp() {
    this.recaptcha3.getToken().then((token) => {
      this.formData = this.myForm.value;
      this.formData.recaptchaToken = token;

      this.authService.signUp(this.formData).subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', res.user);
          this.showSuccess(res.message);
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          console.error(err);
          this.showError(err.error);
        }
      );
    });
  }

  // Notificaciones
  showSuccess(res) {
    this.toastr.success('', res, {
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    });
  }

  showError(msg) {
    this.toastr.error('', msg, {
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    });
  }
}
