import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { Musica } from '../../models/musica.model';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {

  constructor(private angularFirestore: AngularFirestore) { }

    getAllMusicas() {
      return this.angularFirestore.collection('musicas', musica => musica.orderBy('nomeMusica'))
        .valueChanges({idField: 'firebaseId'}) as Observable<any[]>;
    }

    getMusicaById(id: string) {
      return this.angularFirestore.collection('musicas').doc(id).valueChanges() as Observable<Musica>;
    }

    addMusica(musica: Musica) {
      return this.angularFirestore.collection('musicas').add(musica);
    }

    upDateMusica(musicaId: string, musica: Musica) {
      return this.angularFirestore.collection('musicas').doc(musicaId).update(musica);
    }

    deleteMusica(musicaId: string) {
      return this.angularFirestore.collection('musicas').doc(musicaId).delete();
    }

    getAllMusicasByNome(nomeMusica: string) {
      return this.angularFirestore.collection('musicas').doc(nomeMusica).valueChanges() as Observable<Musica>;
    }

    filterPorNomeMusica(nomeMusica: string) {
      return this.angularFirestore.collection('musicas', ref => ref.where('nomeMusica','==', nomeMusica )).valueChanges()
  };

}
