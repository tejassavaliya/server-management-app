import * as serverActions from './servers.actions';
import {AppAction} from '../../app.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Server} from '../shared/server';

export interface State {
  data: Server[];
  selected: Server;
  action: string;
  done: boolean;
  error?: Error;
}

const initialState: State = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null
};

export function reducer(state = initialState, action: AppAction): State {
  // ...state create immutable state object
  switch (action.type) {
      /*************************
     * GET all servers actions
     ************************/
    case serverActions.GET_SERVERS:
      return {
        ...state,
        action: serverActions.GET_SERVERS,
        done: false,
        selected: null,
        error: null
      };
    case serverActions.GET_SERVERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        done: true,
        selected: null,
        error: null
      };
    case serverActions.GET_SERVERS_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

      /*************************
     * GET server by id actions
     ************************/
    case serverActions.GET_SERVER:
      return {
        ...state,
        action: serverActions.GET_SERVER,
        done: false,
        selected: null,
        error: null
      };
    case serverActions.GET_SERVER_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null
      };
    case serverActions.GET_SERVER_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

      /*************************
     * CREATE server actions
     ************************/
    case serverActions.CREATE_SERVER:
      return {
        ...state,
        selected: action.payload,
        action: serverActions.CREATE_SERVER,
        done: false,
        error: null
      };
    case serverActions.CREATE_SERVER_SUCCESS:
      {
        const newServer = {
          ...state.selected,
          id: action.payload
        };
        const data = [
          ...state.data,
          newServer
        ];
        return {
          ...state,
          data,
          selected: null,
          error: null,
          done: true
        };
      }
    case serverActions.CREATE_SERVER_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

      /*************************
     * UPDATE server actions
     ************************/
    case serverActions.UPDATE_SERVER:
      return {
        ...state,
        selected: action.payload,
        action: serverActions.UPDATE_SERVER,
        done: false,
        error: null
      };
    case serverActions.UPDATE_SERVER_SUCCESS:
      {
        const index = state
          .data
          .findIndex(h => h.id === state.selected.id);
        if (index >= 0) {
          const data = [
            ...state.data.slice(0, index),
            state.selected,
            ...state.data.slice(index + 1)
          ];
          return {
            ...state,
            data,
            done: true,
            selected: null,
            error: null
          };
        }
        return state;
      }
    case serverActions.UPDATE_SERVER_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

      /*************************
     * DELETE server actions
     ************************/
    case serverActions.DELETE_SERVER:
      {
        const selected = state.data.find(h => h.id === action.payload);
        return {
          ...state,
          selected,
          action: serverActions.DELETE_SERVER,
          done: false,
          error: null
        };
      }
    case serverActions.DELETE_SERVER_SUCCESS:
      {
        const data = state.data.filter(h => h.id !== state.selected.id);
        return {
          ...state,
          data,
          selected: null,
          error: null,
          done: true
        };
      }
    case serverActions.DELETE_SERVER_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };
  }
  return state;
}

/*************************
 * SELECTORS
 ************************/
export const getServersState = createFeatureSelector < State > ('servers');
export const getAllServers = createSelector(getServersState, (state: State) => {
  return state.data;
});
export const getServer = createSelector(getServersState, (state: State) => {
  if (state.action === serverActions.GET_SERVER && state.done) {
    return state.selected;
  } else {
    return null;
  }

});
export const isDeleted = createSelector(getServersState, (state: State) =>
  state.action === serverActions.DELETE_SERVER && state.done && !state.error);
export const isCreated = createSelector(getServersState, (state: State) =>
 state.action === serverActions.CREATE_SERVER && state.done && !state.error);
export const isUpdated = createSelector(getServersState, (state: State) =>
 state.action === serverActions.UPDATE_SERVER && state.done && !state.error);

export const getDeleteError = createSelector(getServersState, (state: State) => {
  return state.action === serverActions.DELETE_SERVER
    ? state.error
   : null;
});
export const getCreateError = createSelector(getServersState, (state: State) => {
  return state.action === serverActions.CREATE_SERVER
    ? state.error
   : null;
});
export const getUpdateError = createSelector(getServersState, (state: State) => {
  return state.action === serverActions.UPDATE_SERVER
    ? state.error
   : null;
});
export const getServersError = createSelector(getServersState, (state: State) => {
  return state.action === serverActions.GET_SERVERS
    ? state.error
   : null;
});
export const getServerError = createSelector(getServersState, (state: State) => {
  return state.action === serverActions.GET_SERVER
    ? state.error
   : null;
});
