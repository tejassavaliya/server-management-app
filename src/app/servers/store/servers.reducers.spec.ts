import {State, reducer} from './servers.reducers';
import {
    GET_SERVERS,
    GetAllServers,
    GetAllServersSuccess,
    GET_SERVERS_ERROR,
    GetAllServersError,
    GetServer,
    GET_SERVER,
    GetServerSuccess,
    GetServerError,
    CREATE_SERVER,
    CREATE_SERVER_ERROR,
    AddServerSuccess,
    AddServerError,
    AddServer,
    UPDATE_SERVER,
    UpdateServer,
    UpdateServerSuccess,
    UpdateServerError,
    DELETE_SERVER,
    RemoveServer,
    RemoveServerSuccess,
    RemoveServerError
} from './servers.actions';
import {Server} from '../shared/server';

const MOCK_DATA: Server[] = [
  {
    id: 1,
    mem: '1 GB',
    state: 'stopped',
    cpu: '7 GHz',
    name: 'My Server 1 mock'
  }, {
    id: 2,
    mem: '2 GB',
    state: 'running',
    cpu: '6 GHz',
    name: 'My Server 2 mock'
  }
];

let state: State = {
    data: [],
    selected: null,
    action: null,
    done: false,
    error: null
};

describe('Load all Servers REDUCER', () => {
    it('should reduce the action GET_SERVERS', () => {
        const action = new GetAllServers();
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            action: GET_SERVERS,
            done: false
        });
        state = newState;
    });
    it('should reduce the action GET_SERVERS_SUCCESS', () => {
        const payload = [...MOCK_DATA];
        const action = new GetAllServersSuccess(payload);
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            data: payload,
            done: true
        });
        state = newState;
    });
    it('should reduce the action GET_SERVERS_ERROR', () => {
        const payload = new Error('Error loading all servers');
        const action = new GetAllServersError(payload);
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            done: true,
            error: action.payload
        });
    });
});

describe('GET Server by id REDUCER', () => {
    it('should reduce the action GET_SERVER', () => {
        const payload = MOCK_DATA[0].id;
        const action = new GetServer(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            action: GET_SERVER,
            done: false
        });
        state = newState;
    });
    it('should reduce the action GET_SERVER_SUCCESS', () => {
        const payload = MOCK_DATA[0];
        const action = new GetServerSuccess(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: payload,
            done: true
        });
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action GET_SERVER_ERROR', () => {
        const payload = new Error('Error loading the server');
        const action = new GetServerError(payload);
        const newState = reducer(state, action);
        expect({...newState }).toEqual({
            ...state,
            done: true,
            error: action.payload
        });
    });
});

describe('Create new server REDUCER', () => {
    it('should reduce the action CREATE_SERVER', () => {
        const payload = {
          id: 4,
          mem: '4 GB',
          state: 'stopped',
          cpu: '4 GHz',
          name: 'My Server 4'
        };
        const action = new AddServer(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: payload,
            action: CREATE_SERVER,
            done: false
        });
        state = newState;
    });
    it('should reduce the action CREATE_SERVER_SUCCESS', () => {
        const payload = 3;
        const action = new AddServerSuccess(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            data: [
                ...state.data,
                {
                    ...state.selected,
                    id: payload
                }
            ],
            selected: null,
            done: true
        });
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action CREATE_SERVER_ERROR', () => {
        const payload = new Error('Error creating the server');
        const action = new AddServerError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: null,
            done: true,
            error: payload
        });
    });
});

describe('Update existing server REDUCER', () => {
    it('should reduce the action UPDATE_SERVER', () => {
        const payload = {...MOCK_DATA[0], name: 'Name of Server 1 edited'};
        const action = new UpdateServer(payload);
        const newState = reducer(state, action);
        expect({ ...newState}).toEqual({
            ...state,
            selected: payload,
            action: UPDATE_SERVER,
            done: false
        });
        state = newState;
    });
    it('should reduce the action UPDATE_SERVER_SUCCESS', () => {
        const index = 0;
        const data = [
            ...state.data.slice(0, index),
            state.selected,
            ...state.data.slice(index + 1)
        ];
        const action = new UpdateServerSuccess();
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, data, done: true, selected: null, error: null});
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action UPDATE_SERVER_ERROR', () => {
        const payload = new Error('Error updating the server');
        const action = new UpdateServerError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, done: true, error: payload});
    });
});

describe('Deleting existing server REDUCER', () => {
    it('should reduce the action DELETE_SERVER', () => {
        const selected = MOCK_DATA[0];
        const payload = selected.id;
        const action = new RemoveServer(payload);
        const newState = reducer(state, action);

        expect({ ...newState}).toEqual({
            ...state,
            selected,
            action: DELETE_SERVER,
            done: false
        });
        state = newState;
    });
    it('should reduce the action DELETE_SERVER_SUCCESS', () => {
        const payload = MOCK_DATA[0];
        const action = new RemoveServerSuccess(payload);
        const data = state.data.filter(h => h.id !== state.selected.id);
        const newState = reducer(state, action);
        expect({...newState}).toEqual( {...state, data, selected: null, done: true});
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action DELETE_SERVER_ERROR', () => {
        const payload = new Error('Error while deleting the server');
        const action = new RemoveServerError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, done: true, error: payload});
    });
});
