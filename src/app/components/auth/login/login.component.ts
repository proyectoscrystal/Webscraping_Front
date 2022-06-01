import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgRecaptcha3Service } from 'ng-recaptcha3';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AppSettings } from '../../../config/constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  captcha: string = AppSettings.Captcha;

  myForm: FormGroup;
  formData: any;
  private siteKey = this.captcha;

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService,
    private recaptcha3: NgRecaptcha3Service,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: '',
      password: '',
    });
    this.recaptcha3.init(this.siteKey).then((status) => {
      console.log(status);
    });
  }

  signIn() {
    this.recaptcha3.getToken().then((token) => {
      this.formData = this.myForm.value;
      this.formData.recaptchaToken = token;

      this.auth.signIn(this.formData).subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', res.user);
          this.showSuccess();
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          console.log(err);
          this.showError(err.error);
        }
      );
    });
  }

  // Notificaciones
  showSuccess() {
    this.toastr.success('', 'Ingreso exitoso', {
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
