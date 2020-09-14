import {
    GetAllServers,
    GET_SERVERS,
    GET_SERVERS_SUCCESS,
    GetAllServersSuccess,
    GetAllServersError,
    GET_SERVERS_ERROR,
    GetServer,
    GET_SERVER,
    GetServerSuccess,
    GET_SERVER_SUCCESS,
    GetServerError,
    GET_SERVER_ERROR,
    AddServer,
    CREATE_SERVER,
    AddServerSuccess,
    CREATE_SERVER_SUCCESS,
    CREATE_SERVER_ERROR,
    AddServerError,
    RemoveServer,
    DELETE_SERVER,
    RemoveServerSuccess,
    DELETE_SERVER_SUCCESS,
    DELETE_SERVER_ERROR,
    RemoveServerError,
    UpdateServer,
    UPDATE_SERVER,
    UpdateServerSuccess,
    UPDATE_SERVER_ERROR,
    UpdateServerError,
    UPDATE_SERVER_SUCCESS
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
/****************************************
 * GET all the servers
 ****************************************/
describe('Load All Servers ACTION', () => {
    it('should create the action GET_SERVERS', () => {
        const action = new GetAllServers();
        expect({...action}).toEqual({type: GET_SERVERS});
    });
    it('should create the action GET_SERVERS_SUCCESS', () => {
        const payload = [...MOCK_DATA];
        const action = new GetAllServersSuccess(payload);
        expect({...action}).toEqual({type: GET_SERVERS_SUCCESS, payload});
    });
    it('should create the action GET_SERVERS_ERROR', () => {
        const payload = new Error('Error loading all servers');
        const action = new GetAllServersError(payload);
        expect({...action}).toEqual({
            type: GET_SERVERS_ERROR, payload
        });
    });
});
/****************************************
 * GET server by id
 ****************************************/
describe('Load specific Server ACTION', () => {
    it('should create the action GET_SERVER', () => {
        const payload = MOCK_DATA[0].id;
        const action = new GetServer(payload);
        expect({...action}).toEqual({ type: GET_SERVER, payload });
    });
    it('should create the action GET_SERVER_SUCCESS', () => {
        const payload = MOCK_DATA[0];
        const action = new GetServerSuccess(payload);
        expect({...action}).toEqual({ type: GET_SERVER_SUCCESS, payload });
    });
    it('should create the action GET_SERVER_ERROR', () => {
        const payload = new Error('Error loading the server');
        const action = new GetServerError(payload);
        expect({...action}).toEqual({
            type: GET_SERVER_ERROR, payload
        });
    });
});

/****************************************
 * ADD new server
 ****************************************/
describe('Create new Server ACTION', () => {
    it('should create the action CREATE_SERVER', () => {
        const payload = MOCK_DATA[1];
        const action = new AddServer(payload);
        expect({...action}).toEqual({
            type: CREATE_SERVER, payload
        });
    });
    it('should create the action CREATE_SERVER_SUCCESS', () => {
        const payload = MOCK_DATA[1].id;
        const action = new AddServerSuccess(payload);
        expect({...action}).toEqual({ type: CREATE_SERVER_SUCCESS, payload });
    });
    it('should create the action CREATE_SERVER_ERROR', () => {
        const payload = new Error('Error while adding a new server');
        const action = new AddServerError(payload);
        expect({...action}).toEqual({ type: CREATE_SERVER_ERROR, payload });
    });
});
/****************************************
 * REMOVE a server by id
 ****************************************/
describe('Remove a Server ACTION', () => {
    it('should create the action DELETE_SERVER', () => {
        const payload = MOCK_DATA[1].id;
        const action = new RemoveServer(payload);
        expect({...action}).toEqual({ type: DELETE_SERVER, payload });
    });
    it('should create the action DELETE_SERVER_SUCCESS', () => {
        const payload = MOCK_DATA[1];
        const action = new RemoveServerSuccess(payload);
        expect({...action}).toEqual({ type: DELETE_SERVER_SUCCESS, payload });
    });
    it('should create the action DELETE_SERVER_ERROR', () => {
        const payload = new Error('Error removing server.');
        const action = new RemoveServerError(payload);
        expect({...action}).toEqual({ type: DELETE_SERVER_ERROR, payload });
    });
});
/****************************************
 * UPDATE server by id
 ****************************************/
describe('Update a Server ACTION', () => {
    it('should create the action UPDATE_SERVER', () => {
        const payload = MOCK_DATA[0];
        const action = new UpdateServer(payload);
        expect({...action}).toEqual({ type: UPDATE_SERVER, payload });
    });
    it('should create the action UPDATE_SERVER_SUCCESS', () => {
        const action = new UpdateServerSuccess();
        expect({...action}).toEqual({type: UPDATE_SERVER_SUCCESS});
    });
    it('should create the action UPDATE_SERVER_ERROR', () => {
        const payload = new Error('Error updating server.');
        const action = new UpdateServerError(payload);
        expect({...action}).toEqual({
            type: UPDATE_SERVER_ERROR, payload
        });
    });
});
