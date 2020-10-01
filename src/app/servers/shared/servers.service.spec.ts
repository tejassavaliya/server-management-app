import {async, TestBed, inject, getTestBed, waitForAsync} from '@angular/core/testing';

import {ServersService} from './servers.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {BrowserModule} from '@angular/platform-browser';
import {Server} from './server';

const BASE_URL = 'http://localhost:3000/api/servers';
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

describe('ServersService', () => {
  let injector: TestBed;
  let service: ServersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule, HttpClientModule, HttpClientTestingModule
      ],
      providers: [ServersService]
    });

    injector = getTestBed();
    service = injector.get(ServersService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([ServersService], (svg: ServersService) => {
    expect(svg).toBeTruthy();
  }));

  it('should get list of all servers', waitForAsync(() => {
    service
      .findAll()
      .subscribe((data: Server[]) => {
        expect(data.length).toBe(2);
        expect(data[0]).toBe(MOCK_DATA[0]);
        expect(data[1]).toBe(MOCK_DATA[1]);
      });

    const req = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA);
  }));

  it('should get server by id', async(() => {
    const id = 1;
    service
      .findById(id)
      .subscribe((response: Server) => {
        expect(response).toBe(MOCK_DATA[0]);
      });

    const req = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA[0]);
  }));

  it('should insert new Server', async(() => {
    const newServer = {
      id: 3,
      mem: '3 GB',
      state: 'stopped',
      cpu: '3 GHz',
      name: 'My Server 3'
    };
    service
      .insert(newServer)
      .subscribe((successResult) => {
        expect(successResult).toBe(newServer);
      });

    const req: TestRequest = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
    req.flush(newServer);
  }));

  it('should save updates to an existing server', async(() => {
    const server = {
      ...MOCK_DATA[1],
      name: 'Server 2 changed',
      image: 'imageChanged.jpg'
    };
    const id = server.id;
    service
      .update(server)
      .subscribe((successResult) => {
        expect(successResult).toBe(server);
      });

    const req: TestRequest = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
    req.flush(server);
  }));

  it('should delete an existing Server', async(() => {
    const data = MOCK_DATA[1];
    service
      .delete(data.id)
      .subscribe((successResult) => {
        expect(successResult).toBe(data);
      }, (errorResult) => {
        throw(errorResult);
      });

    const req: TestRequest = httpMock.expectOne(`${BASE_URL}/${data.id}`);
    expect(req.request.method).toBe('DELETE');
  }));
});
