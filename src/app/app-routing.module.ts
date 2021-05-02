import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
{
  path:'home',
  canActivate:[AuthGuard],
  loadChildren: () => import('./modules/navigation/navigation.module').then(mod => mod.NavigationModule),
},
{
  path:'',
  canActivate:[LoginGuard],
  loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule),
},
{
  path:'**',
  component: PageNotFoundComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
