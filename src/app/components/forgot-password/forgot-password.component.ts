import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../models/login.model';
import { AuthService } from '../../shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  public formForgot!: FormGroup;
  public login?: Login;

  constructor(private authService: AuthService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.formForgot = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email] ],
    });
  }

  forgotPassword() {
    this.authService.forgotPassword(this.formForgot.value.email)
    this.formForgot.reset();
  }

}
