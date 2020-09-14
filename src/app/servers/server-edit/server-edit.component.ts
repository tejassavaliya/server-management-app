import { Component, OnInit } from '@angular/core';
import {Server} from '../shared/server';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {GetServer, UpdateServer} from '../store/servers.actions';
import {getServer} from '../store/servers.reducers';
import * as serverActions from '../store/servers.actions';

@Component({
  selector: 'app-server-edit',
  templateUrl: './server-edit.component.html',
  styleUrls: ['./server-edit.component.css']
})
export class ServerEditComponent implements OnInit {

  title = 'Server Edition';
  server: Server;
  serverForm: FormGroup;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetServer(+params.id));
    });

    this.store.select(getServer).subscribe(server => {
      if (server != null) {
        this.server = server;
        this.loadFormControl();
      }
    });
  }
  loadFormControl(): void {
    this.serverForm = this.fb.group({
      name: [this.server ? this.server.name : null, [Validators.required]],
      cpu: [this.server ? this.server.cpu : null, [Validators.required]],
      mem: [this.server ? this.server.mem : null, [Validators.required]],
      state: [this.server ? this.server.state : null, [Validators.required]],
    });
  }
  updateServer(): void {
    this.store.dispatch(new UpdateServer({ ...this.server, ...this.serverForm.value }));
  }
  deleteServer(id: number): void {
    if (confirm('Are you sure do you want to delete this Server?')) {
      this.store.dispatch(new serverActions.RemoveServer(id));
    }
  }
}
