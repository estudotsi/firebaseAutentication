import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/conta/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/conta/register/register.component';
import { ForgotPasswordComponent } from './components/conta/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/conta/verify-email/verify-email.component';
import { ListarMusicasComponent } from './components/musicas/listar-musicas/listar-musicas.component';
import { CadastrarMusicasComponent } from './components/musicas/cadastrar-musicas/cadastrar-musicas.component';
import { AlterarMusicasComponent } from './components/musicas/alterar-musicas/alterar-musicas.component';
import { authGuard } from './shared/guard/auth.guard';
import { ListarUsuariosComponent } from './components/usuarios/listar-usuarios/listar-usuarios.component';
import { AlterarUsuariosComponent } from './components/usuarios/alterar-usuarios/alterar-usuarios.component';
import { CadastrarUsuariosComponent } from './components/usuarios/cadastrar-usuarios/cadastrar-usuarios.component';
import { ListarRepertorioComponent } from './components/repertorio/listar-repertorio/listar-repertorio.component';
import { AlterarRepertorioComponent } from './components/repertorio/alterar-repertorio/alterar-repertorio.component';
import { CadastrarRepertorioComponent } from './components/repertorio/cadastrar-repertorio/cadastrar-repertorio.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //{ path: 'dashboard', component: DashboardComponent, canActivate:[authGuard] },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  // { path: 'listar-musicas', component: ListarMusicasComponent, canActivate:[authGuard] },
  /*{ path: 'cadastrar-musicas', component: CadastrarMusicasComponent, canActivate:[authGuard] },
  { path: 'alterar-musicas/:id', component: AlterarMusicasComponent, canActivate:[authGuard] },*/
  { path: 'listar-musicas', component: ListarMusicasComponent},
  { path: 'cadastrar-musicas', component: CadastrarUsuariosComponent},
  { path: 'alterar-musicas/:id', component: AlterarMusicasComponent},
  { path: 'listar-usuarios', component: ListarUsuariosComponent },
  { path: 'alterar-usuarios/:id', component: AlterarUsuariosComponent},
  { path: 'cadastrar-usuario', component: CadastrarUsuariosComponent},
  { path: 'listar-repertorio', component: ListarRepertorioComponent },
  { path: 'alterar-repertorio/:id', component: AlterarRepertorioComponent},
  { path: 'cadastrar-repertorio', component: CadastrarRepertorioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
