import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Repertorio } from '../../models/repertorio.model';

@Injectable({
  providedIn: 'root'
})
export class RepertorioService {

  constructor(private angularFirestore: AngularFirestore) { }

  geeAllRepertorios() {
    return this.angularFirestore.collection('repertório', repertorio => repertorio.orderBy('data', 'desc'))
      .valueChanges({idField: 'firebaseId'}) as Observable<any[]>;
  }

  geeAllRepertorioById(id: string) {
    return this.angularFirestore.collection('repertório').doc(id).valueChanges() as Observable<Repertorio>;
  }

  addRepertorio(repertorio: Repertorio) {
    return this.angularFirestore.collection('repertório').add(repertorio);
  }

  upDateRepertorio(repertorid: string, repertorio: Repertorio) {
    return this.angularFirestore.collection('repertório').doc(repertorid).update(repertorio);
  }

  deleteRepertorio(repertorid: string) {
    return this.angularFirestore.collection('repertório').doc(repertorid).delete();
  }

}
