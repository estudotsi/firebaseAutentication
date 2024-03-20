import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './shared/navbar/navbar.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ListarMusicasComponent } from './components/musicas/listar-musicas/listar-musicas.component';
import { TituloComponent } from './shared/titulo/titulo.component';
import { CadastrarMusicasComponent } from './components/musicas/cadastrar-musicas/cadastrar-musicas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    NavbarComponent,
    ListarMusicasComponent,
    TituloComponent,
    CadastrarMusicasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    AngularFireAuthModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
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
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
