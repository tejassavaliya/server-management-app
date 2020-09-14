import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {AddServer} from '../store/servers.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {Server} from '../shared/server';


@Component({
  selector: 'app-server-create',
  templateUrl: './server-create.component.html',
  styleUrls: ['./server-create.component.css']
})
export class ServerCreateComponent implements OnInit {
  title = 'Create new server';
  server: Server;
  serverForm: FormGroup;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.loadFormControl();
  }
  loadFormControl(): void {
    this.serverForm = this.fb.group({
      name: [null, [Validators.required]],
      cpu: [null, [Validators.required]],
      mem: [null, [Validators.required]],
      state: [null, [Validators.required]],
    });
  }
  createServer(): void {
    this.store.dispatch(new AddServer(this.serverForm.value));
  }

}
