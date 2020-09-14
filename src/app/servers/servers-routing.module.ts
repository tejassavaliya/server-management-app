import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServersComponent} from './servers.component';
import {ServerListComponent} from './server-list/server-list.component';
import {ServerEditComponent} from './server-edit/server-edit.component';
import {ServerCreateComponent} from './server-create/server-create.component';

const routes: Routes = [{
  path: '',
  component: ServersComponent,
  children: [
    { path: '', component: ServerListComponent},
    { path: 'create', component: ServerCreateComponent},
    { path: 'edit/:id', component: ServerEditComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServersRoutingModule { }
