import { Injectable } from '@angular/core';
import { BaseService } from '@app/base.service';
import { map } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerBaseResponse} from "@app/shared/models/server-base-response";
import {environment} from "../../../environments/environment";
import {OrdiniRigheListaModel} from "@app/shared/models/db_tables/ordini-righe-lista.model";
import {OrdiniListaModel} from "@app/shared/models/db_tables/ordini-lista.model";
import {any} from 'codelyzer/util/function';

declare const moment: any;

@Injectable({
  providedIn: 'root'
})
export class OrdiniService extends BaseService {


  constructor(private httpClient: HttpClient) {
    super();
  }

  getCurrentCompaniens(): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .get <ServerBaseResponse<any>>( environment.apiUrl + '/companies/current', {withCredentials: true} );
  }


  GetListOrders(filters?): Observable<ServerBaseResponse<OrdiniListaModel>> {
    return this.httpClient
      .post <ServerBaseResponse<OrdiniListaModel>>(environment.apiUrl + '/orders', filters , {withCredentials: true});
  }

  GetListRows(loader, filters?): Observable<ServerBaseResponse<OrdiniRigheListaModel>> {
    console.log("in chiamata: ", loader);
    return this.httpClient
      .post <ServerBaseResponse<OrdiniRigheListaModel>>(environment.apiUrl + '/orders?view=rows', filters, {withCredentials: true, headers: new HttpHeaders({'X-META-NOLOADER': loader})});
  }

  CreateOrders(order): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .post <ServerBaseResponse<any>>(environment.apiUrl + '/orders/new', order, {withCredentials: true});
  }

  UpdateOrders(id, order): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .patch <ServerBaseResponse<any>>(environment.apiUrl + '/orders/' + id, order, {withCredentials: true});
  }

  DeleteOrders(id): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .delete <ServerBaseResponse<any>> (environment.apiUrl + '/orders/' + id , {withCredentials: true});
  }

  GetCronologiaOrder(id): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .get <ServerBaseResponse<any>> (environment.apiUrl + '/orders/' + id + '/history', {withCredentials: true});
  }

  UpdateRows(idOrders, idRow, row): Observable<ServerBaseResponse<any>> {
      return this.httpClient
        .patch <ServerBaseResponse<any>> (environment.apiUrl + '/orders/' + idOrders + '/rows/' + idRow, row, {withCredentials: true, headers: new HttpHeaders({'X-META-NOLOADER': 'true'})});
  }

  DeleteRows(idOrders, idRow): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .delete <ServerBaseResponse<any>> (environment.apiUrl + '/orders/' + idOrders + '/rows/' + idRow, {withCredentials: true});
  }

  CreateRows(idOrders, row): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .post <ServerBaseResponse<any>> (environment.apiUrl + '/orders/' + idOrders + '/rows/new', row, {withCredentials: true, headers: new HttpHeaders({'X-META-NOLOADER': 'true'})});
  }

  GetCronologiaRow(idOrders, idRow): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .patch <ServerBaseResponse<any>> (environment.apiUrl + '/orders/' + idOrders + '/rows/' + idRow + 'history', {withCredentials: true});
  }

  UpdateStatusOrder(ids, status) {
    return this.httpClient
      .patch <ServerBaseResponse<any>>(environment.apiUrl + '/orders/status/' + status, ids, {withCredentials: true});
  }

  getProducts(test?): Observable<ServerBaseResponse<any>> {
    return this.httpClient.post<ServerBaseResponse<any>>(environment.apiUrl + '/products/', test, {withCredentials: true});
  }

  getListaIva(): Observable<ServerBaseResponse<any>> {
    return this.httpClient.get <ServerBaseResponse<any>>( environment.apiUrl + '/ddls/vats', {withCredentials: true});
  }

  getOrdine(id, filter?): Observable <ServerBaseResponse<any>> {
    return this.httpClient
      .post<ServerBaseResponse<any>>(environment.apiUrl + '/orders/' + id, filter , {withCredentials: true});
  }

  GetDDlTerminiPagamento(): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .get <ServerBaseResponse<any>>( environment.apiUrl + '/ddls/payment-terms', {withCredentials: true});
  }

  GetDDlterminiConsegna(): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .get <ServerBaseResponse<any>>( environment.apiUrl + '/ddls/delivery-terms', {withCredentials: true});
  }

  GetDDlValuta(): Observable<ServerBaseResponse<any>> {
    return this.httpClient
      .get <ServerBaseResponse<any>>( environment.apiUrl + '/ddls/currencies', {withCredentials: true});
  }

  GetType(): Observable<ServerBaseResponse<any>> {
    return this.httpClient.get<ServerBaseResponse<any>>(environment.apiUrl + '/ddls/order-types', {withCredentials: true});
  }

  GetUserLoggato() {
    return this.httpClient.get<ServerBaseResponse<any>>(environment.apiUrl + '/auth/logged', {withCredentials: true});
  }

  getRows() {
    return this.mockService({
      data: [
        { id: 1,
          fornitore: 'Ikea S.p.a',
          tipo: 'M',
          codordine: '1122a',
          stato: 'modificato dal fornitore',
          data_consegna: '2019-01-04',
          descr: 'ciao',
          qta: 12,
          prezzo: 11,
          modificata: false,
          visualizzata: false,
          email_send_status: false,
          response_term: 3,
          emit_date: '2019-06-08'
        },
        { id: 2,
          fornitore: 'Ikea S.p.a',
          tipo: 'M',
          idordine: 1,
          codordine: '1122a',
          stato: 'confermato',
          data_consegna: '2019-11-04',
          descr: 'ciao',
          qta: 12,
          prezzo: 11,
          modificata: false,
          visualizzata: true,
          email_send_status: true,
          response_term: 1,
          emit_date: '2019-06-06 6:00 PM'
        },
        { id: 3,
          fornitore: 'Ikea S.p.a',
          tipo: 'M',
          idordine: 2,
          codordine: '1122a',
          stato: 'proposto',
          data_consegna: '2019-11-04',
          descr: 'ciao',
          qta: 12,
          prezzo: 11,
          modificata: false,
          visualizzata: false,
          email_send_status: false,
          response_term: 3,
          emit_date: '2019-06-04'
        },
      ]
    });
  }

  getReverseOrders(id): Observable <ServerBaseResponse<any>> {
   return this.httpClient.get<ServerBaseResponse<any>>(environment.apiUrl + '/orders/' + id + '/history', {withCredentials: true});
  }
  getReverseOrdersRows(id, idRows): Observable <ServerBaseResponse<any>> {
   return this.httpClient.get<ServerBaseResponse<any>>(environment.apiUrl + '/orders/' + id + '/rows/' + idRows + '/history', {withCredentials: true});
  }


  postOrdine() {

  }

  putOrdine(row, orderId): Observable <ServerBaseResponse<any>> {
    return this.httpClient.post<ServerBaseResponse<any>>(environment.apiUrl + '/orders/' + orderId + '/rows/new', row, {withCredentials: true});
  }

  deleteOrdine() {

  }

  GetCurrentCompanies(): Observable <ServerBaseResponse<any>> {
    return this.httpClient.get<ServerBaseResponse<any>>(environment.apiUrl + '/companies/current', {withCredentials: true});
  }
}
