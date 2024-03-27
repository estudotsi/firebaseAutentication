import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastrar-usuarios',
  templateUrl: './cadastrar-usuarios.component.html',
  styleUrl: './cadastrar-usuarios.component.scss'
})
export class CadastrarUsuariosComponent implements OnInit{

  public formUsuario!: FormGroup;
  public usuario?: Usuario;
  public id?: any;

  constructor(private usuarioService: UsuarioService,
              private spinner: NgxSpinnerService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.formUsuario = this.formBuilder.group({
    id: ['',],
    nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    codinome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      });
    }

    public cadastrarUsuario() {
      this.usuario = this.formUsuario!.getRawValue();
      this.spinner.show();
       this.usuarioService.addUsuario(this.usuario!)
       .then((data: any) => {
           this.toastr.success("Cadastrado com sucesso");
           this.router.navigate([ '/listar-usuarios' ]);
           this.spinner.hide();
         },
         error => {
          this.spinner.hide();
          this.toastr.error("Erro ao cadastrar", error.error);
         })
    }

}
