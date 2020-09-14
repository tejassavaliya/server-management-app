import {InMemoryDbService} from 'angular-in-memory-web-api';

export class AppInMemoryApi implements InMemoryDbService{
  createDb(): any {
    return {
      servers: [{
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
      }, {
        id: 3,
        mem: '3 GB',
        state: 'stopped',
        cpu: '3 GHz',
        name: 'My Server 3'
      }, {
        id: 4,
        mem: '4 GB',
        state: 'running',
        cpu: '4 GHz',
        name: 'My Server 4'
      }, {
        id: 5,
        mem: '5 GB',
        state: 'running',
        cpu: '5 GHz',
        name: 'My Server 5'
      }, {
        id: 6,
        mem: '6 GB',
        state: 'stopped',
        cpu: '6 GHz',
        name: 'My Server 6'
      }, {
        id: 7,
        mem: '7 GB',
        state: 'running',
        cpu: '7 GHz',
        name: 'My Server 7'
      }, {
        id: 8,
        mem: '8 GB',
        state: 'stopped',
        cpu: '8 GHz',
        name: 'My Server 8'
      }, {
        id: 9,
        mem: '9 GB',
        state: 'running',
        cpu: '9 GHz',
        name: 'My Server 9'
      }, {
        id: 10,
        mem: '10 GB',
        state: 'running',
        cpu: '10 GHz',
        name: 'My Server 10'
      }, {
        id: 11,
        mem: '11 GB',
        state: 'running',
        cpu: '11 GHz',
        name: 'My Server 11'
      }]
    };
  }
}
