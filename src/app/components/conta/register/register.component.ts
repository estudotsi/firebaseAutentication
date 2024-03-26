import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../../models/login.model';
import { AuthService } from '../../../shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  public formRegister!: FormGroup;
  public login?: Login;

  constructor(private authService: AuthService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)] ],
    });
  }

  registrar() {
    this.authService.register(this.formRegister.value.email, this.formRegister.value.password)
  }


}
