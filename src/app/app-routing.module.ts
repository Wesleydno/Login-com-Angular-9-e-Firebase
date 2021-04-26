import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
{
  path:'home',
  loadChildren: () => import('./modules/navigation/navigation.module').then(mod => mod.NavigationModule),
},
{
  path:'',
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
