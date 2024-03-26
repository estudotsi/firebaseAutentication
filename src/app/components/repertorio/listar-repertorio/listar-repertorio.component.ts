import { Component, OnInit } from '@angular/core';
import { Repertorio } from '../../../models/repertorio.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RepertorioService } from '../../../shared/services/repertorio.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-listar-repertorio',
  templateUrl: './listar-repertorio.component.html',
  styleUrl: './listar-repertorio.component.scss'
})
export class ListarRepertorioComponent implements OnInit{

  repertorios?: Repertorio[];
  modalRef?: BsModalRef;
  idDelete?: any;

  constructor(private repertorioService: RepertorioService,
              private modalService: BsModalService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.buscarRepertorios();
  }

  public buscarRepertorios(): void{
    this.repertorioService.geeAllRepertorios().subscribe({
      next: (repertorioRecebido: Repertorio[]) => {
        this.repertorios = repertorioRecebido;
        console.log("Teste: ", this.repertorios);
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

  generatePDF(repertorio: any) {
    let documento = new jsPDF();

    const data = new Date(repertorio.data);
    let dia = data.toLocaleString('pt-BR', { timeZone: 'UTC' , weekday: 'long'});
    let dataCompleta = data.toLocaleString('pt-BR', { timeZone: 'UTC' , dateStyle: 'full'});

  documento.setFont("Aria");
  documento.text("Vida Nova Songs", 80, 25);
  documento.setFillColor(50,50,50);

  documento.setFont("Courier");
  documento.setFontSize(20);
  documento.text("Repertório", 80, 35);
  documento.setFillColor(50,50,50);

  documento.setFont("Courier-Bold");
  documento.setFontSize(20);
  documento.setTextColor(0, 0, 0);
  documento.text("Data evento: " + dataCompleta, 42, 50);
  documento.text("Dirigente: " + repertorio.dirigente, 42, 60);
  documento.text("Música 1: " + repertorio.musica1, 42, 70);
  documento.text("Música 2: " + repertorio.musica2, 42, 80);
  documento.text("Música 3: " + repertorio.musica3, 42, 90);
  documento.text("Música 4: " + repertorio.musica4, 42, 100);
  documento.text("Música 5: " + repertorio.musica5, 42, 110);

  documento.output("dataurlnewwindow");
  }

}