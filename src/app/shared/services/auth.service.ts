import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GoogleAuthProvider } from '@angular/fire/auth';

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
        console.log("Aqui: ", res)
        localStorage.setItem('token','true');
        let nome = JSON.stringify(res.user?.displayName);
        console.log(nome)
        let nome1 = nome.substring(1, nome.length-1);
        console.log(nome1)
        localStorage.setItem('nome', nome1);


         let foto = JSON.stringify(res.user?.photoURL);
         let foto1 = foto.substring(1, foto.length-1);
        // let fotoSemAspas = retornoFoto?.substring(1, retornoFoto.length-1);
        console.log(foto1);
         localStorage.setItem('img', foto1);
        // localStorage.setItem('nome', JSON.stringify(nomeSemAspas));

        if(res.user?.emailVerified == true) {
          this.router.navigate(['/dashboard']);
          this.toastr.success("Bem vindo");
        }
        else {
          this.toastr.info("Verifique seu email");
        }

      },
      err => {
        this.toastr.error("Login ou senha incorreto");
        this.router.navigate(['/']);
    })
  }

  register(email: string, password: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then( res => {
      this.router.navigate(['/login']);
      this.sendEmailForVerification(res.user);
    }, err => {
      this.toastr.error("Erro ao registrar", err.message);
      this.router.navigate(['/register']);
    })
  }

  logout() {
    this.angularFireAuth.signOut()
    .then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      this.toastr.success("Usuário deslogado");
    }, err => {
      this.toastr.error("Erro ao deslogar", err.message);
    })
  }

  forgotPassword(email: string) {
    this.angularFireAuth.sendPasswordResetEmail(email)
    .then( res => {
      this.router.navigate(['/verify-email']);
    }, err => {
      this.toastr.error("Erro ao recuperar email", err.message);
    })
  }

  sendEmailForVerification(user : any) {
    console.log(user);
    user.sendEmailVerification()
    .then((res : any) => {
      this.router.navigate(['/verify-email']);
    }, (err : any) => {
      this.toastr.error("Email não enviado", err.message);
    })
  }

  googleSignIn() {
    return this.angularFireAuth.signInWithPopup(new GoogleAuthProvider)
    .then( res => {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
      this.toastr.success("Bem vindo");
    },
      err => {
        this.toastr.error("Erro ao tentar logar com Google", err.message);
      }
    )
  }


}
