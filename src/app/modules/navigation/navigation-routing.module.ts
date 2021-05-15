import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  {
    path:'',
    component: NavComponent,
    children:[
      {
          path:'dashboard',
          component: DashboardComponent
      },

      {
         path:'account',
         loadChildren: () => import('./components/account/account.module').then(mod => mod.AccountModule)
      }
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
