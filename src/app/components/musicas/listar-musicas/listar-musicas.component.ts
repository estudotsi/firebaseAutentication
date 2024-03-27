import { Component, OnInit, TemplateRef } from '@angular/core';
import { MusicaService } from '../../../shared/services/musica.service';
import { Musica } from '../../../models/musica.model';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-musicas',
  templateUrl: './listar-musicas.component.html',
  styleUrl: './listar-musicas.component.scss'
})
export class ListarMusicasComponent implements OnInit{

  musicas: Musica[] = [];
  modalRef?: BsModalRef;
  idDelete?: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  musicasFiltradas: Musica[] = [];
  private filtroListado = '';



  constructor(private musicaService: MusicaService,
              private modalService: BsModalService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.buscasMusicas();
  }

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.musicasFiltradas = this.filtroLista
      ? this.filtrarEventos(this.filtroLista)
      : this.musicas;
  }

  public filtrarEventos(filtrarPor: string): Musica[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.musicas.filter(
      (musica) =>
        musica.nomeMusica.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  public buscasMusicas(): void{
    this.musicaService.getAllMusicas().subscribe({
      next: (musicaRecebida: Musica[]) => {
        this.musicas = musicaRecebida;
        this.musicasFiltradas = this.musicas;
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

  enviarDadosAlterarMusica(id: any){
    this.router.navigate([`/alterar-musicas/${id}`]);
  }

  confirme() {
    this.modalRef?.hide();
      this.spinner.show();
      this.musicaService.deleteMusica(this.idDelete)
      .then((data: any) => {
        this.toastr.success("Deletado com sucesso");
        this.spinner.hide();
      },
      error => {
        this.toastr.error("Erro ao deletar");
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
    this.buscasMusicas();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.buscasMusicas();
  }

}
