import {Injectable, Input} from '@angular/core';
import { BaseService } from '@app/base.service';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServerBaseResponse} from '@app/shared/models/server-base-response';
import {environment} from '../../../environments/environment';
import {FornitoriListaModel} from "@app/shared/models/db_tables/fornitori-lista.model";
import {IndirizziModel} from "@app/shared/models/db_tables/.indirizzi.model";
import {ContiBancariModel} from "@app/shared/models/db_tables/.conti-bancari.model";
import { ReferentsModel } from '@app/shared/models/db_tables/.referents.model';

@Injectable({
  providedIn: 'root'
})
export class FornitoriService extends BaseService {

  constructor(translate: TranslateService,
              private httpClient: HttpClient, ) {
    super();
  }

  getLista(): Observable<ServerBaseResponse<FornitoriListaModel>> {
    return this.httpClient
      .get <ServerBaseResponse<any>>( environment.apiUrl + '/suppliers', {withCredentials: true});
  }

  deleteSupplierByid(id: number): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .delete <ServerBaseResponse<any>>(environment.apiUrl + '/suppliers/' + id, {withCredentials: true});
  }

  CreateSupplier(fornitore): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .post <ServerBaseResponse<any>>( environment.apiUrl + '/suppliers/new', fornitore , {withCredentials: true});
  }

  getListaTable(datatableparams?): Observable<ServerBaseResponse<FornitoriListaModel>> {

    return this.httpClient
      .post <ServerBaseResponse<any>>( environment.apiUrl + '/suppliers', datatableparams, { withCredentials: true});
  }

  getSupplierById(id, datatableparams?): Observable<ServerBaseResponse<FornitoriListaModel>> {

    return this.httpClient
      .post <ServerBaseResponse<any>>( environment.apiUrl + '/suppliers/' + id, datatableparams, { withCredentials: true});
  }

  UpdateSupplier(fornitore, id): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .patch <ServerBaseResponse<any>>( environment.apiUrl + '/suppliers/' + id, fornitore , { withCredentials: true});
  }

  UpdateReferents(referents, idSuppliers, idRef): Observable<ServerBaseResponse<ReferentsModel>> {
    return this.httpClient
      .patch <ServerBaseResponse<ReferentsModel>>( environment.apiUrl + '/suppliers/' + idSuppliers + '/referents/' + idRef,
        referents , { withCredentials: true});
  }

  CreateAddress(indirizzo, id): Observable<ServerBaseResponse<IndirizziModel>> {

    return this.httpClient
      .post <ServerBaseResponse<IndirizziModel>>( environment.apiUrl + '/suppliers/' + id + '/addresses/new',
      indirizzo, { withCredentials: true});
  }

  GetListAddress(id, filters?): Observable<ServerBaseResponse<IndirizziModel>> {
    return this.httpClient
      .post <ServerBaseResponse<IndirizziModel>>(environment.apiUrl + '/suppliers/' + id + '/addresses', filters, {withCredentials: true});
  }


  UpdateAddress(address, idSuppliers, idAddres): Observable<ServerBaseResponse<IndirizziModel>> {
    return this.httpClient
      .patch <ServerBaseResponse<IndirizziModel>>( environment.apiUrl + '/suppliers/' + idSuppliers + '/addresses/' + idAddres,
        address , { withCredentials: true});
  }

  DeleteAddress(idSuppliers, idAddres): Observable<ServerBaseResponse<IndirizziModel>> {
    return this.httpClient
      .delete <ServerBaseResponse<IndirizziModel>>( environment.apiUrl + '/suppliers/' + idSuppliers + '/addresses/' + idAddres,
        { withCredentials: true});
  }

  CreateBank(bankAccount, id): Observable<ServerBaseResponse<ContiBancariModel>> {

    return this.httpClient
      .post <ServerBaseResponse<ContiBancariModel>>( environment.apiUrl + '/suppliers/' + id + '/bank-accounts/new',
        bankAccount, { withCredentials: true});
  }

  GetListBank(id, filters?): Observable<ServerBaseResponse<ContiBancariModel>> {
    return this.httpClient
      .post <ServerBaseResponse<ContiBancariModel>>( environment.apiUrl + '/suppliers/' + id + '/bank-accounts', filters , { withCredentials: true});
  }

  Updatebank(bankAccount, idSuppliers, idBank): Observable<ServerBaseResponse<ContiBancariModel>> {
    return this.httpClient
      .patch <ServerBaseResponse<ContiBancariModel>>( environment.apiUrl + '/suppliers/' + idSuppliers + '/bank-accounts/' + idBank,
        bankAccount , { withCredentials: true});
  }

  DeleteBank(idSuppliers, idBank): Observable<ServerBaseResponse<ContiBancariModel>> {
    return this.httpClient
      .delete <ServerBaseResponse<ContiBancariModel>>( environment.apiUrl + '/suppliers/' + idSuppliers + '/bank-accounts/' + idBank,
        { withCredentials: true});
  }

  GetDDlValuta(): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .get <ServerBaseResponse<any>>( environment.apiUrl + '/ddls/currencies', {withCredentials: true});
  }

  GetDDlTerminiPagamento(): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .get <ServerBaseResponse<any>>( environment.apiUrl + '/ddls/payment-terms', {withCredentials: true});
  }

  GetDDlterminiConsegna(): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .get <ServerBaseResponse<any>>( environment.apiUrl + '/ddls/delivery-terms', {withCredentials: true});
  }

  postOrdine() {

  }

  putOrdine() {

  }

  deleteOrdine() {

  }
}
