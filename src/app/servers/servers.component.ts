import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import {Router} from '@angular/router';
import {AppState} from '../app.state';
import {GetAllServers} from './store/servers.actions';
import {getCreateError, getDeleteError, getServersError, getUpdateError, isCreated, isDeleted, isUpdated} from './store/servers.reducers';
@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor(private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    console.log('... Initializing Servers component');
    this.store.dispatch(new GetAllServers());

    // subscriptions when success or error action
    this.store.select(getServersError).subscribe((error) => this.loadingError(error));
    this.store.select(isDeleted).subscribe((done) => {
      this.actionSuccess(done, 'The server was deleted successfully!!!');
    });
    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'Error while deleting the server');
    });
    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done, 'The server was updated successfully!!!');
    });
    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'Error while updating the server');
    });
    this.store.select(isCreated).subscribe((done) => {
      this.actionSuccess(done, 'The server was created successfully!!!');
    });
    this.store.select(getCreateError).subscribe((error) => {
      this.actionError(error, 'Error while creating the server');
    });
  }

  /**
   * Display error message if load of servers fails
   */
  loadingError(error): void {
    if (error) {
      alert('Error while loading the list of servers');
    }
  }

  /**
   * Display success message after execute specific action over the server
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string): void {
    if (done) {
      alert(message);
      this.router.navigate(['/servers']);
    }
  }

  /**
   * Display error message is execution of action fails
   * @param error the error thrown
   * @param message the message to be displayed
   */
  actionError(error, message: string): void {
    if (error) {
      alert(message);
    }
  }

}
