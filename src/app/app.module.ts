import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './shared/navbar/navbar.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    AngularFireAuthModule,
    ToastrModule.forRoot({}),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDfJnan8X9tdevOUWKmgtiyKB1DCUoAZWw",
      authDomain: "vida-nova-songs.firebaseapp.com",
      projectId: "vida-nova-songs",
      storageBucket: "vida-nova-songs.appspot.com",
      messagingSenderId: "648676129636",
      appId: "1:648676129636:web:713e01433663bb604bd871"
    })
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
