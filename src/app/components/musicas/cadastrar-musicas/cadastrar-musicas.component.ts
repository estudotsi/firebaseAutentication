import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Musica } from '../../../models/musica.model';
import { MusicaService } from '../../../shared/services/musica.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastrar-musicas',
  templateUrl: './cadastrar-musicas.component.html',
  styleUrl: './cadastrar-musicas.component.scss'
})
export class CadastrarMusicasComponent implements OnInit{

  public formMusica!: FormGroup;
  public musica?: Musica;
  public id?: any;

  constructor(private musicaService: MusicaService,
              private spinner: NgxSpinnerService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService) {}

    ngOnInit() {
      this.formMusica = this.formBuilder.group({
        id: ['',],
        nomeMusica: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        cantor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        dataCadastro: ['', [Validators.required]],
        estilo: ['', Validators.required],
        execucoes: [0],
      });
    }

    public cadastrarMusica() {
      this.musica = this.formMusica!.getRawValue();
      this.spinner.show();
       this.musicaService.addMusica(this.musica!)
       .then((data: any) => {
           this.toastr.success("Cadastrado com sucesso");
           this.router.navigate([ '/listar-musicas' ]);
           this.spinner.hide();
         },
         error => {
          this.spinner.hide();
          this.toastr.error("Erro ao cadastrar");
         })
    }

}
