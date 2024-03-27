import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alterar-usuarios',
  templateUrl: './alterar-usuarios.component.html',
  styleUrl: './alterar-usuarios.component.scss'
})
export class AlterarUsuariosComponent implements OnInit{

  public formUsuarioAlterar!: FormGroup;
  public usuario?: Usuario;
  id?: any;

  constructor(private usuarioService: UsuarioService,
              private activatedRouter: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.buscarUsuarioPorId();

    this.formUsuarioAlterar = this.formBuilder.group({
      firebaseId: ['',],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      codinome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    });
  }

  public buscarUsuarioPorId(): void{
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    this.usuarioService.getUsuarioById(this.id).subscribe({
        next: (usuarioRecebido: Usuario) => {
            this.formUsuarioAlterar.patchValue(usuarioRecebido);
            this.spinner.hide();
          },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error("Erro ao alterar", error);
          },
        complete: () => {
          this.spinner.hide();
          }
      });
  }

  public alterarUsuario() {
    this.usuario = this.formUsuarioAlterar!.getRawValue();
    this.spinner.show();
    this.usuarioService.upDateUsuario(this.id, this.usuario!)
    .then((data: any) => {
      this.toastr.success("Alterado com sucesso", data);
      this.router.navigate([ '/listar-usuarios' ]);
      this.spinner.hide();
    },
    error => {
      this.toastr.error("Erro ao cadastrar", error.err);
     this.spinner.hide();
     this.toastr.error("Erro ao cadastrar", error.err);
    })
  }

}
