import { AfterViewInit, Component, EventEmitter, Input, Output, afterNextRender } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Input() nome!: string;
  @Input() imagem!: string;
  @Input() email!: string;
  @Output() usuarioLogado = new EventEmitter<boolean>();

  constructor(private authService: AuthService,
              private spinner: NgxSpinnerService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService) {
              }


  deslogar() {
    this.authService.logout();
    this.usuarioLogado.emit(false);
    this.router.navigate(['/login']);
  }

}
