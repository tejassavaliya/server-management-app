import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerEditComponent } from './server-edit.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import * as serversReducer from '../store/servers.reducers';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Store, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ServersService} from '../shared/servers.service';

describe('ServerEditComponent', () => {
  let component: ServerEditComponent;
  let fixture: ComponentFixture<ServerEditComponent>;
  let mockStore: MockStore<{ servers: serversReducer.State }>;
  const initialState = {
    servers: {
      data: [],
      selected: {
        id: 1,
        mem: '1 GB',
        state: 'stopped',
        cpu: '7 GHz',
        name: 'My Server 1'
      },
      action: 'UPDATE_SERVER',
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
        StoreModule.forRoot([]),
        EffectsModule
      ],
      declarations: [ ServerEditComponent ],
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
    fixture = TestBed.createComponent(ServerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'Server Edition'`, () => {
    expect(component.title).toEqual('Server Edition');
  });
});
