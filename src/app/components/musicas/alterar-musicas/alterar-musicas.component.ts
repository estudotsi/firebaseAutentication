import { Component, OnInit } from '@angular/core';
import { MusicaService } from '../../../shared/services/musica.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Musica } from '../../../models/musica.model';

@Component({
  selector: 'app-alterar-musicas',
  templateUrl: './alterar-musicas.component.html',
  styleUrl: './alterar-musicas.component.scss'
})
export class AlterarMusicasComponent implements OnInit{

  public formMusicaAlterar!: FormGroup;
  public musica?: Musica;
  id?: any;
  execucoes?: number;

  constructor(private musicaService: MusicaService,
              private activatedRouter: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.buscarPedidoPorId();

    this.formMusicaAlterar = this.formBuilder.group({
      firebaseId: ['',],
      nomeMusica: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      cantor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      dataCadastro: ['', [Validators.required]],
      estilo: ['', Validators.required],
      execucoes: [this.execucoes],
    });
  }

  public buscarPedidoPorId(): void{
      this.id = this.activatedRouter.snapshot.paramMap.get('id');
      this.musicaService.getMusicaById(this.id).subscribe({
          next: (musicaRecebida: Musica) => {
            this.formMusicaAlterar.patchValue(musicaRecebida);
            this.execucoes = musicaRecebida.execucoes;
            this.spinner.hide();
            },
          error: (error: any) => {
            this.spinner.hide();
            this.toastr.error("Erro ao alterar");
            },
          complete: () => {
            this.spinner.hide();
            }
        });
  }

  public alterarMusica() {
    this.musica = this.formMusicaAlterar!.getRawValue();
    this.spinner.show();
    this.musicaService.upDateMusica(this.id, this.musica!)
    .then((data: any) => {
      this.toastr.success("Alterado com sucesso");
      this.router.navigate([ '/listar-musicas' ]);
      this.spinner.hide();
    },
    error => {
      this.toastr.error("Erro ao cadastrar");
      this.spinner.hide();
      this.toastr.error("Erro ao cadastrar");
    })
  }

}
