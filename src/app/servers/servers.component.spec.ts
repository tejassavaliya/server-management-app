import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServersComponent } from './servers.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import * as serversReducer from './store/servers.reducers';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {ServersService} from './shared/servers.service';
import {Store} from '@ngrx/store';

describe('ServersComponent', () => {
  let component: ServersComponent;
  let fixture: ComponentFixture<ServersComponent>;
  let mockStore: MockStore<{ servers: serversReducer.State }>;
  const initialState = {
    servers: {
      data: [{
        id: 1,
        mem: '1 GB',
        state: 'stopped',
        cpu: '7 GHz',
        name: 'My Server 1'
      },{
        id: 2,
        mem: '2 GB',
        state: 'stopped',
        cpu: '6 GHz',
        name: 'My Server 2'
      }],
      selected: null,
      action: 'GET_SERVERS',
      done: true
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        EffectsModule
      ],
      declarations: [ ServersComponent ],
      providers: [
        ServersService,
        {provide: APP_BASE_HREF, useValue: '/'},
        provideMockStore({initialState})
      ]
    })
    .compileComponents();

    mockStore = TestBed.inject(Store) as MockStore<any>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
