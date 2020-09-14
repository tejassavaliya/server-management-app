import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as serverActions from './servers.actions';
import {
  AddServer,
  AddServerError,
  AddServerSuccess,
  GetAllServersError,
  GetAllServersSuccess,
  GetServer,
  GetServerError,
  GetServerSuccess,
  RemoveServer,
  RemoveServerError,
  RemoveServerSuccess,
  UpdateServer,
  UpdateServerError,
  UpdateServerSuccess
} from './servers.actions';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {ServersService} from '../shared/servers.service';
import {Server} from '../shared/server';
import {catchError, map, switchMap} from 'rxjs/operators';

@Injectable()
export class ServerEffects {
  constructor(private actions$: Actions,
              private svc: ServersService) {
  }

  @Effect()
  getAllServers$: Observable<Action> = this.actions$.pipe(
    ofType(serverActions.GET_SERVERS),
    switchMap(() => this.svc.findAll()),
    map(servers => new GetAllServersSuccess(servers)),
    catchError((err) => [new GetAllServersError(err)])
  );

  @Effect()
  getServer$ = this.actions$.pipe(
    ofType(serverActions.GET_SERVER),
    map((action: GetServer) => action.payload),
    switchMap(id => this.svc.findById(id)),
    map(server => new GetServerSuccess(server)),
    catchError((err) => [new GetServerError(err)])
  );


  @Effect()
  updateServer$ = this.actions$.pipe(
    ofType(serverActions.UPDATE_SERVER),
    map((action: UpdateServer) => action.payload),
    switchMap(server => this.svc.update(server)),
    map(() => new UpdateServerSuccess()),
    catchError((err) => [new UpdateServerError(err)])
  );

  @Effect()
  createServer$ = this.actions$.pipe(
    ofType(serverActions.CREATE_SERVER),
    map((action: AddServer) => action.payload),
    switchMap(newServer => this.svc.insert(newServer)),
    map((response) => new AddServerSuccess(response.id)),
    catchError((err) => [new AddServerError(err)])
  );

  @Effect()
  removeServer$ = this.actions$.pipe(
    ofType(serverActions.DELETE_SERVER),
    map((action: RemoveServer) => action.payload),
    switchMap(id => this.svc.delete(id)),
    map((server: Server) => new RemoveServerSuccess(server)),
    catchError((err) => [new RemoveServerError(err)])
  );
}
