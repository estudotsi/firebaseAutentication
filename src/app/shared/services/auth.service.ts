import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { ShareService } from './share.service';
import { DadosUsuario } from '../../models/dados-usuario.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private dadosUsuario: DadosUsuario = { nome: "", img: "", logado: false, token: "", email: ""}
  loggedIn = false;

  constructor(private angularFireAuth : AngularFireAuth,
              private router : Router,
              private toastr: ToastrService,
              private share: ShareService,
              private spinner: NgxSpinnerService,) { }

   login(email : string, password : string) {
    this.spinner.show();
    this.angularFireAuth.signInWithEmailAndPassword(email,password)
      .then( res => {
          this.dadosUsuario.nome = res.user?.displayName!;
          this.dadosUsuario.img = res.user?.photoURL!;
          this.dadosUsuario.logado = true;
          this.dadosUsuario.token = res.user?.uid!;
          this.dadosUsuario.email = res.user?.email!;
          localStorage.setItem('token', res.user?.uid!);
          this.share.enviarDadosUsuario(this.dadosUsuario);
          this.loggedIn = true;

        if(res.user?.emailVerified == true) {
          this.spinner.hide();
          this.router.navigate(['/listar-repertorio']);
          this.toastr.success("Bem vindo");
        }
        else {
          this.spinner.hide();
          this.toastr.info("Verifique seu email");
        }
      },
      err => {
        this.spinner.hide();
        this.toastr.error("Login ou senha incorretos");
        this.router.navigate(['/']);
    })
  }

  register(email: string, password: string) {
    this.spinner.show();
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then( res => {
      this.router.navigate(['/login']);
      this.sendEmailForVerification(res.user);
      this.toastr.info("Verifique seu email");
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error("Erro ao registrar", err.message);
      this.router.navigate(['/register']);
    })
  }

  logout() {
    this.spinner.show();
    this.angularFireAuth.signOut()
    .then( () => {
      localStorage.removeItem('token');
      this.toastr.success("Usuário deslogado");
      this.spinner.hide();
    }, err => {
      this.toastr.error("Erro ao deslogar", err.message);
      this.spinner.hide();
    })
  }

  forgotPassword(email: string) {
    this.spinner.show();
    this.angularFireAuth.sendPasswordResetEmail(email)
    .then( res => {
      this.toastr.info("Verifique seu email");
      this.router.navigate(['/verify-email']);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error("Erro ao recuperar email", err.message);
    })
  }

  sendEmailForVerification(user : any) {
    user.sendEmailVerification()
    .then((res : any) => {
      this.router.navigate(['/verify-email']);
    }, (err : any) => {
      this.toastr.error("Email não enviado", err.message);
    })
  }

  googleSignIn() {
    this.spinner.show();
    return this.angularFireAuth.signInWithPopup(new GoogleAuthProvider)
    .then( res => {
      this.dadosUsuario.nome = res.user?.displayName!;
          this.dadosUsuario.img = res.user?.photoURL!;
          this.dadosUsuario.logado = true;
          this.dadosUsuario.token = res.user?.uid!;
          localStorage.setItem('token', res.user?.uid!);
          this.share.enviarDadosUsuario(this.dadosUsuario);
          this.router.navigate(['/listar-repertorio']);
          this.spinner.hide();
          this.toastr.success("Bem vindo");
          this.loggedIn = true;
    },
      err => {
        this.toastr.error("Erro ao tentar logar com Google", err.message);
        this.spinner.hide();
      }
    )
  }

  public isLoggedIn() {
    return this.loggedIn;
 }


}
