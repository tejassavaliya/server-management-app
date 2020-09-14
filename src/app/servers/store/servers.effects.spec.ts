import {TestBed} from '@angular/core/testing';
import {Actions} from '@ngrx/effects';
import {ServerEffects} from './servers.effects';
import {cold} from 'jasmine-marbles';

import {of, throwError} from 'rxjs';
import {
  AddServerError,
  AddServerSuccess,
  CREATE_SERVER,
  DELETE_SERVER,
  GET_SERVER,
  GET_SERVERS,
  GetAllServersError,
  GetAllServersSuccess,
  GetServerError,
  GetServerSuccess,
  RemoveServerError,
  RemoveServerSuccess,
  UPDATE_SERVER,
  UpdateServerError,
  UpdateServerSuccess
} from './servers.actions';
import {Server} from '../shared/server';

const MOCK_DATA: Server[] = [
  {
    id: 1,
    mem: '1 GB',
    state: 'stopped',
    cpu: '7 GHz',
    name: 'My Server 1'
  }, {
    id: 2,
    mem: '2 GB',
    state: 'stopped',
    cpu: '6 GHz',
    name: 'My Server 2'
  }
];

describe('ServerEffects', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServerEffects
      ]
    });
    service = jasmine.createSpyObj('svc', ['findAll', 'findById', 'update', 'insert', 'delete']);
  });

  describe('getAllServers$', () => {
    it('should return a GET_SERVERS_SUCCESS action, with the servers, on success', () => {
      service.findAll.and.returnValue(of(MOCK_DATA));
      const source = cold('a', {a: {type: GET_SERVERS}});
      const effects = new ServerEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetAllServersSuccess(MOCK_DATA)});

      expect(effects.getAllServers$).toBeObservable(expected);
    });

    it('should return a GET_SERVERS_ERROR action, with the error', () => {
      const error = new Error('Error loading servers');
      service.findAll.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: GET_SERVERS}});
      const effects = new ServerEffects(new Actions(source), service);

      effects.getAllServers$.subscribe(result => {
        expect(result).toEqual(new GetAllServersError(error));
      });
    });
  });

  describe('getServer$', () => {
    it('should return a GET_SERVER_SUCCESS action, with the server found, on success', () => {
      const data = MOCK_DATA[0];
      service.findById.and.returnValue(of(data));
      const source = cold('a', {a: {type: GET_SERVER}});
      const effects = new ServerEffects(new Actions(source), service);
      const expected = cold('a', {a: new GetServerSuccess(data)});

      expect(effects.getServer$).toBeObservable(expected);
    });

    it('should return a GET_SERVER_ERROR action, with the error', () => {
      const data = MOCK_DATA[0];
      const error = new Error(`Error loading the server with id ${data.id}`);
      service.findById.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: GET_SERVER}});
      const effects = new ServerEffects(new Actions(source), service);

      effects.getServer$.subscribe(result => {
        expect(result).toEqual(new GetServerError(error));
      });
    });
  });

  describe('updateServer$', () => {
    it('should return a UPDATE_SERVER_SUCCESS action, without any data', () => {
      const data = {...MOCK_DATA[0], name: 'Server Name updated'};
      service.update.and.returnValue(of(data));
      const source = cold('a', {a: {type: UPDATE_SERVER}});
      const effects = new ServerEffects(new Actions(source), service);
      const expected = cold('a', {a: new UpdateServerSuccess()});

      expect(effects.updateServer$).toBeObservable(expected);
    });

    it('should return a UPDATE_SERVER_ERROR action, with the error', () => {
      const data = {...MOCK_DATA[0], name: 'Server updated'};
      const error = new Error(`Error updating the server with id ${data.id}`);
      service.update.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: UPDATE_SERVER}});
      const effects = new ServerEffects(new Actions(source), service);

      effects.updateServer$.subscribe(result => {
        expect(result).toEqual(new UpdateServerError(error));
      });
    });
  });

  describe('createServer$', () => {
    it('should return a CREATE_SERVER_SUCCESS action, with the server inserted, on success', () => {
      const data = {
        id: 3,
        mem: '3 GB',
        state: 'stopped',
        cpu: '3 GHz',
        name: 'My Server 3'
      };
      service.insert.and.returnValue(of(data));
      const source = cold('a', {a: {type: CREATE_SERVER}});
      const effects = new ServerEffects(new Actions(source), service);
      const expected = cold('a', {a: new AddServerSuccess(data.id)});

      expect(effects.createServer$).toBeObservable(expected);
    });

    it('should return a CREATE_SERVER_ERROR action, with the error', () => {
      const data = {
        id: 3,
        mem: '3 GB',
        state: 'stopped',
        cpu: '3 GHz',
        name: 'My Server 3'
      };
      const error = new Error(`Error adding new server with id ${data.id}`);
      service.insert.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: CREATE_SERVER}});
      const effects = new ServerEffects(new Actions(source), service);

      effects.createServer$.subscribe(result => {
        expect(result).toEqual(new AddServerError(error));
      });
    });
  });

  describe('removeServer$', () => {
    it('should return a DELETE_SERVER_SUCCESS action, with the server deleted, on success', () => {
      const data = MOCK_DATA[1];
      service.delete.and.returnValue(of(data));
      const source = cold('a', {a: {type: DELETE_SERVER}});
      const effects = new ServerEffects(new Actions(source), service);
      const expected = cold('a', {a: new RemoveServerSuccess(data)});

      expect(effects.removeServer$).toBeObservable(expected);
    });

    it('should return a DELETE_SERVER_ERROR action, with the error', () => {
      const data = MOCK_DATA[1];
      const error = new Error(`Error removing the server with id ${data.id}`);
      service.delete.and.returnValue(throwError(error));

      const source = cold('a', {a: {type: DELETE_SERVER}});
      const effects = new ServerEffects(new Actions(source), service);

      effects.removeServer$.subscribe(result => {
        expect(result).toEqual(new RemoveServerError(error));
      });
    });
  });
});
