import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: "full" },
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'quienSoy', component: QuienSoyComponent}
];
