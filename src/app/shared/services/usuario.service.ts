import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private angularFirestore: AngularFirestore) { }

  geeAllUsuarios() {
    return this.angularFirestore.collection('usuarios', usuario => usuario.orderBy('nome'))
      .valueChanges({idField: 'firebaseId'}) as Observable<any[]>;
  }

  geeAllUsuarioById(id: string) {
    return this.angularFirestore.collection('usuarios').doc(id).valueChanges() as Observable<Usuario>;
  }

  addUsuario(usuario: Usuario) {
    return this.angularFirestore.collection('usuarios').add(usuario);
  }

  upDateUsuario(usuarioId: string, usuario: Usuario) {
    return this.angularFirestore.collection('usuarios').doc(usuarioId).update(usuario);
  }

  deleteUsuario(usuarioId: string) {
    return this.angularFirestore.collection('usuarios').doc(usuarioId).delete();
  }

}
