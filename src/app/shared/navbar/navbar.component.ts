import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


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
              private router: Router) {}

  deslogar() {
    this.authService.logout();
    this.usuarioLogado.emit(false);
    this.router.navigate(['/login']);
  }

}
