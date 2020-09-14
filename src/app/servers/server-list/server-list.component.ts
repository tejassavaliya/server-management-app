import { Component, OnInit } from '@angular/core';

import {Store} from '@ngrx/store';

import {Observable} from 'rxjs';

import {AppState} from '../../app.state';
import {getAllServers} from '../store/servers.reducers';
import * as serverActions from '../store/servers.actions';
import {Server} from '../shared/server';
import {ServersService} from '../shared/servers.service';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class ServerListComponent implements OnInit {
  title = 'List of Servers';
  servers: Observable<Server[]>;

  constructor(private serverService: ServersService,
              private store: Store<AppState>) { }

  ngOnInit(): void {

    console.log('... initializing Server list component.');

    this.servers = this.store.select(getAllServers);
  }

  /**
   * Delete the selected hero
   */
  delete(id: number): void {
    if (confirm('Are you sure do you want to delete this Server?')) {
      this.store.dispatch(new serverActions.RemoveServer(id));
    }
  }

}
