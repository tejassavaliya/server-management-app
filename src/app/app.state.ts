import * as fromServers from './servers/store/servers.reducers';

export interface AppState {
  servers: fromServers.State;
}
