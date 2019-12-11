import { Injectable } from '@angular/core';
import { BaseService } from '@app/base.service';
import { map } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ServerBaseResponse} from "@app/shared/models/server-base-response";
import {environment} from "../../../environments/environment";

declare const moment: any;

@Injectable({
  providedIn: 'root'
})
export class UtentiService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  GetUsersList(filter?): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .post <ServerBaseResponse<any>> (environment.apiUrl + '/users', filter , {withCredentials: true});
  }

  DeleteUser(id): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .delete <ServerBaseResponse<any>> (environment.apiUrl + '/users/' + id , {withCredentials: true});
  }

  NewUser(data): Observable<ServerBaseResponse<any>> {
    return this.httpClient
    .post <ServerBaseResponse<any>> (environment.apiUrl + '/users/new', data, {withCredentials: true});
  }

  GetUser(id): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .post <ServerBaseResponse<any>> (environment.apiUrl + '/users/' + id , {withCredentials: true});
  }

  UpdateUser(id, order): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .patch <ServerBaseResponse<any>>(environment.apiUrl + '/users/' + id, order, {withCredentials: true});
  }

  DDLLingue(): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .get <ServerBaseResponse<any>>(environment.apiUrl + '/ddls/languages', {withCredentials: true});
  }

  DDLPermissions(): Observable<ServerBaseResponse<any>> {
    return this.httpClient
    .get <ServerBaseResponse<any>>(environment.apiUrl + '/ddls/permissions', {withCredentials: true});
  }

  ResetMail(mail): Observable<ServerBaseResponse<any>> {
    return this.httpClient.get <ServerBaseResponse<any>>
    (environment.baseUrl + '/public/reset-password/' + mail, {withCredentials: true});
  }
}
