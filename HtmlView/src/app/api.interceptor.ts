import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpHeaders
} from '@angular/common/http';


import { BaseService } from './base.service';
import {ServerBaseResponse} from "@app/shared/models/server-base-response";
import {catchError, finalize, tap} from "rxjs/operators";

declare const M: any;

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(public auth: BaseService) {}
  count = 0;


  intercept(req: HttpRequest<ServerBaseResponse<any>>, next: HttpHandler): Observable<HttpEvent<ServerBaseResponse<any>>> {
    console.log(req);
    if (req.headers.get('X-META-NOLOADER') !== 'true' && this.count === 0) {
      // Lascio la possibilità di specificare questo header per poter fare chiamate senza loader
      // modal loading show
      console.log('apri modal');
      $('#modal1').modal('open');
    }
    if (req.headers.get('X-META-NOLOADER') !== 'true') {
      this.count++;
    }
    const updatedValues = {
      headers: new HttpHeaders(),
      // withCredentials: true
    };

    if (!req.headers.has('Content-Type')) {
      updatedValues.headers = updatedValues.headers.append('Content-Type', 'application/json');
    }

    if (!req.headers.has('Accept')) {
      updatedValues.headers = updatedValues.headers.append('Accept', 'application/json');
    }

    return next
      .handle(req.clone(updatedValues))
      .pipe(  catchError(err => throwError(err)),
        tap(
          (event: HttpEvent<ServerBaseResponse<any>>) => {
            if (event instanceof HttpResponse) {
              if (event.headers.get('content-type').indexOf( 'application/json') !== -1 ) {
                if (event.body.errors && event.body.errors.length > 0) {
                  for (let index = 0; index < event.body.errors.length; index++) {
                   // notifica errore in alto a destra
                    M.toast({html:  event.body.errors[index].message});
                  }
                } else if (event.body.message !== '' && event.body.message) {
                    // notifica messaggio buon fine
                    M.toast({html:  event.body.message});
                  }
              }
            }

            /*if (event.body.header.errors.length > 0) {
              // this.errorHandler.errors = event.body.errors;
            }*/
          }
        ),
        finalize(() => {
          if ( req.headers.get('X-META-NOLOADER') !== 'true' ) {
            this.count--;
            if (this.count === 0) {
              if ($('#loading-modal').hasClass('open') === true) {
               // modal di loading hide
                console.log('chiudi modal');
                $('#modal1').modal('close');
              } else {
                  // modal di loading hide
                  console.log('chiudi modal');
                  $('#modal1').modal('close');
              }
            }
          }
        })
      );
  }
}
