import { Component, OnInit } from '@angular/core';
import { ShareService } from './shared/services/share.service';
import { DadosUsuario } from './models/dados-usuario.model';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  title = 'vida-nova-songs';
  nome: string = "";
  imagem: string = "";
  logado: boolean = false;
  email: string = "";

  constructor(private share: ShareService,
              private router: Router,
              private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.recebeDados();
  }

  deslogar(value: boolean) {
    this.logado = value;
  }

  private recebeDados(){
    this.share.receberDadosUsuario().subscribe({
      next: (data: DadosUsuario) => {
        if(!data){
          //this.router.navigate(['/']);
        }
        else{
          this.nome = data.nome;
          this.imagem = data.img;
          this.logado = data.logado;
          this.email = data.email
        }
      }
    })
  }


}
