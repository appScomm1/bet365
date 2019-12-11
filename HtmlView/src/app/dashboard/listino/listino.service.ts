import { Injectable } from '@angular/core';
import { BaseService } from '@app/base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {ServerBaseResponse} from "@app/shared/models/server-base-response";
import {environment} from "../../../environments/environment";
import {any} from "codelyzer/util/function";
import {ProdottiListaModel} from "@app/shared/models/db_tables/prodotti-lista.model";
import {SuppliersPriceListModel} from "@app/shared/models/db_tables/.suppliers-price-list.model";

@Injectable({
  providedIn: 'root'
})
export class ListinoService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  GetListProducts(filter?): Observable<ServerBaseResponse<ProdottiListaModel>> {
    return this.httpClient
      .post <ServerBaseResponse<ProdottiListaModel>> (environment.apiUrl + '/products', filter , {withCredentials: true});
  }
  GetProductsById(id, filter?): Observable<ServerBaseResponse<ProdottiListaModel>> {
    return this.httpClient
      .post <ServerBaseResponse<ProdottiListaModel>> (environment.apiUrl + '/products/' + id, filter , {withCredentials: true});
  }

  CreateProducts(product): Observable<ServerBaseResponse<ProdottiListaModel>> {
    return this.httpClient
      .post <ServerBaseResponse<ProdottiListaModel>> (environment.apiUrl + '/products/new', product , {withCredentials: true});
  }

  UpdateProducts(product, id): Observable<ServerBaseResponse<ProdottiListaModel>> {
    return this.httpClient
      .post <ServerBaseResponse<ProdottiListaModel>> (environment.apiUrl + '/products/' + id, product , {withCredentials: true});
  }
  DeleteProducts(id): Observable<ServerBaseResponse<ProdottiListaModel>> {
    return this.httpClient
      .delete <ServerBaseResponse<ProdottiListaModel>> (environment.apiUrl + '/products/' + id , {withCredentials: true});
  }

  getLista() {
    return this.mockService({
        data: [{
        nome: 'Ikea S.p.a.'
      }]
    });
  }

  postOrdine(test?): Observable<ServerBaseResponse<any>> {
  return this.httpClient.post <ServerBaseResponse<any>>(environment.apiUrl + '/products/new', test, {withCredentials: true});
  }

  patchOrdine(id, test?): Observable<ServerBaseResponse<ProdottiListaModel>> {
    return this.httpClient.patch<ServerBaseResponse<ProdottiListaModel>>(environment.apiUrl + '/products/' + id, test, {withCredentials: true});
  }

  putOrdine() {

  }

  deleteOrdine() {

  }

  companiesRequest(test?): Observable<ServerBaseResponse<any>> {
    return this.httpClient.post <ServerBaseResponse<any>>(environment.apiUrl + '/suppliers', test, {withCredentials: true});
  }

  deleteListino(idProdotto, idListino): Observable<ServerBaseResponse<any>> {
    return this.httpClient.delete <ServerBaseResponse<any>>(environment.apiUrl + '/products/' + idProdotto + '/price-lists/' + idListino, {withCredentials: true});
  }

  addListino(data, idProdotto): Observable<ServerBaseResponse<any>> {
    return this.httpClient.post<ServerBaseResponse<any>>(environment.apiUrl + '/products/' + idProdotto + '/price-lists/new', data, {withCredentials: true});
  }

  patchListino(data, idProdotto, idListino): Observable<ServerBaseResponse<any>> {
    return this.httpClient.patch<ServerBaseResponse<any>>(environment.apiUrl + '/products/' + idProdotto + '/price-lists/' + idListino, data, {withCredentials: true});
  }
}
