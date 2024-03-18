import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth : AngularFireAuth,
              private router : Router,
              private toastr: ToastrService) { }

   login(email : string, password : string) {
    this.angularFireAuth.signInWithEmailAndPassword(email,password)
      .then( res => {
        localStorage.setItem('token','true');
        this.toastr.success("Bem vindo");
      },
      err => {
        this.toastr.error("Erro ao cadastrar", err.message);
        this.router.navigate(['/login']);
    })
  }

  register(email : string, password : string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then( res => {
      this.toastr.success("Bem vindo");
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.toastr.error("Erro ao registrar", err.message);
      this.router.navigate(['/register']);
    })
  }

  logout() {
    this.angularFireAuth.signOut()
    .then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      this.toastr.error("Erro ao deslogar", err.message);
    })
  }

}
