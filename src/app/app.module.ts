import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './components/conta/login/login.component';
import { RegisterComponent } from './components/conta/register/register.component';
import { ForgotPasswordComponent } from './components/conta/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/conta/verify-email/verify-email.component';
import { ListarMusicasComponent } from './components/musicas/listar-musicas/listar-musicas.component';
import { TituloComponent } from './shared/titulo/titulo.component';
import { CadastrarMusicasComponent } from './components/musicas/cadastrar-musicas/cadastrar-musicas.component';
import { AlterarMusicasComponent } from './components/musicas/alterar-musicas/alterar-musicas.component';
import { ListarUsuariosComponent } from './components/usuarios/listar-usuarios/listar-usuarios.component';
import { CadastrarUsuariosComponent } from './components/usuarios/cadastrar-usuarios/cadastrar-usuarios.component';
import { AlterarUsuariosComponent } from './components/usuarios/alterar-usuarios/alterar-usuarios.component';
import { AlterarRepertorioComponent } from './components/repertorio/alterar-repertorio/alterar-repertorio.component';
import { ListarRepertorioComponent } from './components/repertorio/listar-repertorio/listar-repertorio.component';
import { CadastrarRepertorioComponent } from './components/repertorio/cadastrar-repertorio/cadastrar-repertorio.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VerifyEmailComponent,
    NavbarComponent,
    ListarMusicasComponent,
    TituloComponent,
    CadastrarMusicasComponent,
    AlterarMusicasComponent,
    ListarUsuariosComponent,
    CadastrarUsuariosComponent,
    AlterarUsuariosComponent,
    AlterarRepertorioComponent,
    ListarRepertorioComponent,
    CadastrarRepertorioComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    AngularFireAuthModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxSelectModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({}),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDfJnan8X9tdevOUWKmgtiyKB1DCUoAZWw",
      authDomain: "vida-nova-songs.firebaseapp.com",
      projectId: "vida-nova-songs",
      storageBucket: "vida-nova-songs.appspot.com",
      messagingSenderId: "648676129636",
      appId: "1:648676129636:web:713e01433663bb604bd871"
    }),
    provideFirebaseApp(() => initializeApp({"projectId":"vida-nova-songs","appId":"1:648676129636:web:713e01433663bb604bd871","storageBucket":"vida-nova-songs.appspot.com","apiKey":"AIzaSyDfJnan8X9tdevOUWKmgtiyKB1DCUoAZWw","authDomain":"vida-nova-songs.firebaseapp.com","messagingSenderId":"648676129636"})),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    provideClientHydration(),
    {provide: LOCALE_ID, useValue: 'pt' },
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
