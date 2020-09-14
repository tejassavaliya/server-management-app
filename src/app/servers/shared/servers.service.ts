import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Server} from './server';

@Injectable()
export class ServersService {
  protected URL = 'http://localhost:3000/api/servers';

  constructor(protected http: HttpClient) {
  }

  /**
   * Find an object by its identifier
   * @param id the object identifier
   * @returns gets the object found
   */
  public findById(id: any): Observable<Server> {
    return this.http.get<Server>(this.URL + '/' + id);
  }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Server[]> {
    return this.http.get<Server[]>(this.URL, {params});
  }

  /**
   * Delete an object by its identifier field
   * @param id the object identifier
   * @returns gets the response
   */
  public delete(id): Observable<Server> {
    return this.http.delete<Server>(this.URL + '/' + id);
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
  public insert(data: Server): Observable<Server> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post<Server>(this.URL, data, {headers});
  }

  /**
   * Update specific object into DB
   * @param server the object to be updated
   * @returns gets the response
   */
  public update(server: Server): Observable<Server> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put<Server>(this.URL + '/' + server.id, server, {headers});
  }
}
