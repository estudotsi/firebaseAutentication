import { Component, OnInit, TemplateRef } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.scss'
})
export class ListarUsuariosComponent implements OnInit{

  usuarios: Usuario[] = [];
  modalRef?: BsModalRef;
  idDelete?: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  public usuariosFiltrados: Usuario[] = [];
  private filtroListado = '';

  constructor(private usuarioService: UsuarioService,
              private modalService: BsModalService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private toastr: ToastrService) {}

ngOnInit(): void {
  this.spinner.show();
  this.buscarUsuarios();
  }

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.usuariosFiltrados = this.filtroLista
      ? this.filtrarEventos(this.filtroLista)
      : this.usuarios;
  }

  public filtrarEventos(filtrarPor: string): Usuario[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.usuarios.filter(
      (usuario) =>
        usuario.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }


  public buscarUsuarios(): void{
    this.usuarioService.getAllUsuarios().subscribe({
      next: (usuarioRecebido: Usuario[]) => {
        this.usuarios = usuarioRecebido;
        this.usuariosFiltrados = this.usuarios
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

  enviarDadosAlterarUsuario(id: any){
    this.router.navigate([`/alterar-usuarios/${id}`]);
  }

  confirme() {
    this.modalRef?.hide();
      this.spinner.show();
      this.usuarioService.deleteUsuario(this.idDelete)
      .then((data: any) => {
        this.toastr.success("Deletado com sucesso", data);
        this.spinner.hide();
      },
      error => {
        this.toastr.error("Erro ao deletar", error.err);
        this.spinner.hide();
      })
  }

  decline(): void {
    this.modalRef?.hide();
  }

  openModal(template: TemplateRef<any>, id: any) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.idDelete = id;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.buscarUsuarios();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.buscarUsuarios();
  }

}
