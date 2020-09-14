import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServersRoutingModule } from './servers-routing.module';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import * as serverReducer from './store/servers.reducers';
import {SharedModule} from '../shared/shared.module';
import { ServerCreateComponent } from './server-create/server-create.component';
import { ServerEditComponent } from './server-edit/server-edit.component';
import { ServerListComponent } from './server-list/server-list.component';
import { EffectsModule } from '@ngrx/effects';

import {ServersComponent} from './servers.component';
import {ServerEffects} from './store/servers.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {ServersService} from './shared/servers.service';

export const reducers: ActionReducerMap<any> = {
  servers: serverReducer.reducer
};

@NgModule({
  declarations: [
    ServersComponent,
    ServerListComponent,
    ServerCreateComponent,
    ServerEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ServersRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ServerEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    ServersService
  ]
})
export class ServersModule { }
