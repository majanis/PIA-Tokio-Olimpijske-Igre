import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelegatComponent } from './delegat/delegat.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { RegisterComponent } from './register/register.component';
import { VodjaComponent } from './vodja/vodja.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'organizator', component: OrganizatorComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component:HomeComponent},
  {path: 'delegat', component:DelegatComponent},
  {path: 'vodja', component:VodjaComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
