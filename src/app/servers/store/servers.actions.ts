import {Action} from '@ngrx/store';
import {Server} from '../shared/server';

export const GET_SERVERS = '[ALL] Servers';
export const GET_SERVERS_SUCCESS = '[ALL] Servers Success';
export const GET_SERVERS_ERROR = '[ALL] Servers Error';

export const GET_SERVER = '[GET] Server';
export const GET_SERVER_SUCCESS = '[GET] Servers Success';
export const GET_SERVER_ERROR = '[GET] Servers Error';

export const CREATE_SERVER = '[CREATE] Server';
export const CREATE_SERVER_SUCCESS = '[CREATE] Server Success';
export const CREATE_SERVER_ERROR = '[CREATE] Server Error';

export const DELETE_SERVER = '[DELETE] Server';
export const DELETE_SERVER_SUCCESS = '[DELETE] Server Success';
export const DELETE_SERVER_ERROR = '[DELETE] Server Error';

export const UPDATE_SERVER = '[UPDATE] Server';
export const UPDATE_SERVER_SUCCESS = '[UPDATE] Server Success';
export const UPDATE_SERVER_ERROR = '[UPDATE] Server Error';

/****************************************
 * GET all the servers
 ****************************************/
export class GetAllServers implements Action {
  readonly type = GET_SERVERS;
}

export class GetAllServersSuccess implements Action {
  readonly type = GET_SERVERS_SUCCESS;

  constructor(public payload: Server[]) {
  }
}

export class GetAllServersError implements Action {
  readonly type = GET_SERVERS_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * GET server by id
 ****************************************/
export class GetServer implements Action {
  readonly type = GET_SERVER;

  constructor(public payload: number) {
  }
}

export class GetServerSuccess implements Action {
  readonly type = GET_SERVER_SUCCESS;

  constructor(public payload: Server) {
  }
}

export class GetServerError implements Action {
  readonly type = GET_SERVER_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * ADD new server
 ****************************************/
export class AddServer implements Action {
  readonly type = CREATE_SERVER;

  constructor(public payload: Server) {
  }
}

export class AddServerSuccess implements Action {
  readonly type = CREATE_SERVER_SUCCESS;

  constructor(public payload: number) {
  }
}

export class AddServerError implements Action {
  readonly type = CREATE_SERVER_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * REMOVE a server by id
 ****************************************/
export class RemoveServer implements Action {
  readonly type = DELETE_SERVER;

  constructor(public payload: number) {
  }
}

export class RemoveServerSuccess implements Action {
  readonly type = DELETE_SERVER_SUCCESS;

  constructor(public payload: Server) {
  }
}

export class RemoveServerError implements Action {
  readonly type = DELETE_SERVER_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * UPDATE server by id
 ****************************************/
export class UpdateServer implements Action {
  readonly type = UPDATE_SERVER;

  constructor(public payload: Server) {
  }
}

export class UpdateServerSuccess implements Action {
  readonly type = UPDATE_SERVER_SUCCESS;
}

export class UpdateServerError implements Action {
  readonly type = UPDATE_SERVER_ERROR;

  constructor(public payload: Error) {
  }
}
