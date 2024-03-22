import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ListarMusicasComponent } from './components/musicas/listar-musicas/listar-musicas.component';
import { CadastrarMusicasComponent } from './components/musicas/cadastrar-musicas/cadastrar-musicas.component';
import { AlterarMusicasComponent } from './components/musicas/alterar-musicas/alterar-musicas.component';
import { authGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //{ path: 'dashboard', component: DashboardComponent, canActivate:[authGuard] },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'listar-musicas', component: ListarMusicasComponent, canActivate:[authGuard] },
  { path: 'cadastrar-musicas', component: CadastrarMusicasComponent, canActivate:[authGuard] },
  { path: 'alterar-musicas/:id', component: AlterarMusicasComponent, canActivate:[authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
