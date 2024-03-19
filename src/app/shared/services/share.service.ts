import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DadosUsuario } from '../../models/dados-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private dadosUsuario = new BehaviorSubject<any>('');

  public receberDadosUsuario() {
    return this.dadosUsuario.asObservable();
  }

  public enviarDadosUsuario(dados: DadosUsuario) {
    this.dadosUsuario.next(dados);
  }
}
