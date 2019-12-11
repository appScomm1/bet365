import {Injectable} from '@angular/core';
import {BaseService} from '@app/base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServerBaseResponse} from '@app/shared/models/server-base-response';
import {environment} from '../../../environments/environment';
import {AziendaListaModel} from '@app/shared/models/db_tables/azienda-lista.model';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  getCurrentCompany(): Observable<ServerBaseResponse<AziendaListaModel>> {
    return this.httpClient
      .get <ServerBaseResponse<AziendaListaModel>>( environment.apiUrl + '/companies/current', {withCredentials: true} );
  }

  getCompanyList(): Observable<ServerBaseResponse<AziendaListaModel>> {
    return this.httpClient
      .get <ServerBaseResponse<AziendaListaModel>>(environment.apiUrl + '/companies', {withCredentials: true} );
  }

  selectCurrentCompany(idCompany): Observable<ServerBaseResponse<AziendaListaModel>> {
    return this.httpClient
      .get <ServerBaseResponse<AziendaListaModel>>(environment.apiUrl + '/companies/set-current/' + idCompany, {withCredentials: true} );
  }

  updateCompany(idCompany, company): Observable<ServerBaseResponse<AziendaListaModel>> {
    return this.httpClient
      .patch <ServerBaseResponse<AziendaListaModel>>(environment.apiUrl + '/companies/' + idCompany, company, {withCredentials: true});
  }

  getCompanyAddress(idCompany, filters?): Observable<ServerBaseResponse<any>> {
   return this.httpClient
     .post <ServerBaseResponse<any>>( environment.apiUrl + '/companies/' + idCompany + '/addresses', filters, {withCredentials: true});
  }

  createCompanyAddress(idCompany, address): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .post <ServerBaseResponse<any>>(environment.apiUrl + '/companies/' + idCompany + '/addresses/new', address, {withCredentials: true});
  }

  updateCompanyAddress(idCompany, idAddress, address): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .patch <ServerBaseResponse<any>>(environment.apiUrl + '/companies/' + idCompany + '/addresses/' + idAddress,
        address, {withCredentials: true});
  }

  deleteCompanyAddress(idCompany, idAddress): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .delete <ServerBaseResponse<any>>( environment.apiUrl + '/companies/' + idCompany + '/addresses/' + idAddress, {withCredentials: true});
  }

  getCurrencyList(idCompany): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .post <ServerBaseResponse<any>>(environment.apiUrl + '/companies/' + idCompany + '/currencies', {withCredentials: true});
  }

  addCurrency(idCompany, currency): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .post <ServerBaseResponse<any>>(environment.apiUrl + '/companies/' + idCompany + '/currencies/new', currency, {withCredentials: true});
  }

  updateCurrency(idCompany, idCurrency, currency): Observable<ServerBaseResponse<any>> {
    return  this.httpClient
      .patch <ServerBaseResponse<any>>(environment.apiUrl + '/companies/' + idCompany + '/currencies/' + idCurrency, currency, {withCredentials: true});
  }

  deleteCurrency(idCompany, idCurrency): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .delete <ServerBaseResponse<any>>(environment.apiUrl + '/companies/' + idCompany + '/currencies/' + idCurrency, {withCredentials: true});
  }
}
