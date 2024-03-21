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

  musicas?: Musica[];
  modalRef?: BsModalRef;
  idDelete?: any;

  constructor(private musicaService: MusicaService,
              private modalService: BsModalService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.buscasMusicas();
  }

  public buscasMusicas(): void{
    this.musicaService.geeAllMusicas().subscribe({
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

  enviarDadosAlterarMusica(id: any){
    this.router.navigate([`/alterar-musicas/${id}`]);
  }

  confirme() {
    this.modalRef?.hide();
      this.spinner.show();
      this.musicaService.deleteMusica(this.idDelete)
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

}
