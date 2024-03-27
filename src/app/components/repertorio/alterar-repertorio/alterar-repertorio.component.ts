import { Component, OnInit } from '@angular/core';
import { MusicaService } from '../../../shared/services/musica.service';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { RepertorioService } from '../../../shared/services/repertorio.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Musica } from '../../../models/musica.model';
import { Usuario } from '../../../models/usuario.model';
import { Repertorio } from '../../../models/repertorio.model';

@Component({
  selector: 'app-alterar-repertorio',
  templateUrl: './alterar-repertorio.component.html',
  styleUrl: './alterar-repertorio.component.scss'
})
export class AlterarRepertorioComponent implements OnInit{

  musicas: Musica[] = [];
  usuarios: Usuario[] = [];
  public formAlterarRepertorio!: FormGroup;
  public selectControl = new FormControl();
  public repertorio?: Repertorio;
  public id?: any;
  nomeMusica1: string = "";
  musica1: any;
  idRecebido: any;
  data: any;

  constructor(private musicaService: MusicaService,
              private usuarioService: UsuarioService,
              private repertorioService: RepertorioService,
              private modalService: BsModalService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private activatedRouter: ActivatedRoute,) {}

  ngOnInit(): void {
    this.formAlterarRepertorio = this.formBuilder.group({
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
    this.buscarRepertorioPorId();
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

  public buscarRepertorioPorId(): void{
    this.idRecebido = this.activatedRouter.snapshot.paramMap.get('id');
    this.repertorioService.getRepertorioById(this.idRecebido).subscribe({
        next: (repertorioRecebido: Repertorio) => {
          this.formAlterarRepertorio.patchValue(repertorioRecebido);
          this.data = repertorioRecebido.data;
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

  public alterarRepertorio() {
    this.repertorio = this.formAlterarRepertorio!.getRawValue();
    this.spinner.show();
    this.repertorioService.upDateRepertorio(this.idRecebido, this.repertorio!)
    .then((data: any) => {
      this.toastr.success("Alterado com sucesso", data);
      this.router.navigate([ '/listar-repertorio' ]);
      this.spinner.hide();
    },
    error => {
      this.toastr.error("Erro ao alterar", error);
      this.spinner.hide();
    })
  }

}
