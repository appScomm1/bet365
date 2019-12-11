import {Injectable, Input} from '@angular/core';
import { BaseService } from '@app/base.service';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServerBaseResponse} from '@app/shared/models/server-base-response';
import {environment} from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  constructor(translate: TranslateService,
              private httpClient: HttpClient, ) {
    super();
  }

  ResetMail(mail): Observable<ServerBaseResponse<any>> {
    return this.httpClient.get <ServerBaseResponse<any>>
    (environment.baseUrl + '/public/reset-password/' + mail, {withCredentials: true});
  }

  Login(dati?): Observable<ServerBaseResponse<any>> {
    return this.httpClient.post <ServerBaseResponse<any>>(environment.baseUrl + '/public/login', dati, {withCredentials: true});
  }
  GetUserLoggato() {
    return this.httpClient.get<ServerBaseResponse<any>>(environment.apiUrl + '/auth/logged', {withCredentials: true});
  }

  UserInfo(token, data?) {
    return this.httpClient.post<ServerBaseResponse<any>>(environment.baseUrl + '/public/reset-password/' + token, data, {withCredentials: true});
  }

  LogOut() {
    return this.httpClient.get<ServerBaseResponse<any>>(environment.apiUrl + '/auth/logout', {withCredentials: true});
  }
}

