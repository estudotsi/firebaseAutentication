import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.scss'
})
export class TituloComponent {

  @Input() titulo!: string;
  @Input() iconClass = "bi bi-speedometer";
  @Input() subtitulo!: string;
  @Input() button: boolean = false;

}
