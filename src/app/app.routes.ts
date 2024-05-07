import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { ErrorComponent } from './componentes/error/error.component';
import { authGuard } from './guards/auth.guard';
import { AuthService } from './servicios/auth.service';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: "full" },
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate:[authGuard]},
    {path: 'quienSoy', component: QuienSoyComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'chat', component: ChatComponent,canActivate:[authGuard]},
    {path: 'juegos',  loadChildren: () => import('./modulo-juegos/modulo-juegos.module')
.then(m => m.ModuloJuegosModule)},

{path: '**' , component: ErrorComponent},

{path: 'error' , component: ErrorComponent}];