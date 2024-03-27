import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Repertorio } from '../../../models/repertorio.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RepertorioService } from '../../../shared/services/repertorio.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MusicaService } from '../../../shared/services/musica.service';
import { Musica } from '../../../models/musica.model';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-cadastrar-repertorio',
  templateUrl: './cadastrar-repertorio.component.html',
  styleUrl: './cadastrar-repertorio.component.scss'
})
export class CadastrarRepertorioComponent implements OnInit{

  musicas: Musica[] = [];
  usuarios: Usuario[] = [];
  public formRepertorio!: FormGroup;
  public selectControl = new FormControl();
  public repertorio?: Repertorio;
  public id?: any;
  nomeMusica1: string = "";
  musica1: any;

  constructor(private musicaService: MusicaService,
              private usuarioService: UsuarioService,
              private repertorioService: RepertorioService,
              private modalService: BsModalService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.formRepertorio = this.formBuilder.group({
      id: ['',],
      data: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      dirigente: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      musica1: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      musica2: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      musica3: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      musica4: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      musica5: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    });

    this.spinner.show();
    this.buscarMusicas();
    this.buscarUsuarios();
  }

  public buscarMusicas(): void{
    this.musicaService.getAllMusicas().subscribe({
      next: (musicaRecebida: Musica[]) => {
        this.musicas = musicaRecebida;
        this.spinner.hide();
      },
      error: (error: any) => {
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  public buscarUsuarios(): void{
    this.usuarioService.getAllUsuarios().subscribe({
      next: (usuarioRecebido: Usuario[]) => {
        this.usuarios = usuarioRecebido;
        this.spinner.hide();
      },
      error: (error: any) => {
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  cadastrarRepertorio() {
    this.repertorio = this.formRepertorio!.getRawValue();
      this.spinner.show();
       this.repertorioService.addRepertorio(this.repertorio!)
       .then((data: any) => {
           this.toastr.success("Cadastrado com sucesso");
           this.router.navigate([ '/listar-repertorio' ]);
           this.spinner.hide();
         },
         error => {
          this.spinner.hide();
          this.toastr.error("Erro ao cadastrar", error.error);
    })
  }

}






