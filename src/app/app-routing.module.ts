import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/servers',
    pathMatch: 'full'
  }, {
    path: 'servers',
    loadChildren: () => import('./servers/servers.module').then(m => m.ServersModule)
  }, {
    path: '**',
    redirectTo: '/servers'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
