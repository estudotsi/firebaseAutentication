import { Component, OnInit } from '@angular/core';
import { MusicaService } from '../../../shared/services/musica.service';
import { Musica } from '../../../models/musica.model';

@Component({
  selector: 'app-listar-musicas',
  templateUrl: './listar-musicas.component.html',
  styleUrl: './listar-musicas.component.scss'
})
export class ListarMusicasComponent implements OnInit{

  musicas?: Musica[];

  constructor(private musicaService: MusicaService) {}

  ngOnInit(): void {
    this.buscasMusicas();
  }

  public buscasMusicas(): void{

    //this.pedido$ = pedidoService.buscarPedidos();

    this.musicaService.geeAllMusicas().subscribe({
      next: (musicaRecebida: Musica[]) => {
        //this.musicas$ = of(pedidosRecebidos);
        //this.pedidosFiltrados = this.pedido;
        this.musicas = musicaRecebida;
        console.log("Aqui: ", this.musicas);
      },
      error: (error: any) => {
        console.log("Erro: " , error.error);
      },
      complete: () => {

      }
    });
  }

}
