import {ErrorHandler, Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";


declare const M: any;

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  constructor() { }

  passato = false;

  handleError(error: Error | HttpErrorResponse): void {

    let lastError = '';

    if (error instanceof HttpErrorResponse) {
      const serverErr = error.error;
      console.log('errorHAndler' , serverErr);
      console.log(typeof serverErr.errors);
      if (typeof serverErr.errors === 'object') {
        for (let index = 0; index < serverErr.errors.length; index++) {
          M.toast({html: serverErr.errors[index].message} );
          }
      } else {
        if (!this.passato && (lastError !== serverErr.errors)) {
          this.passato = true;
          setTimeout(() => {
            this.passato = false; }, 500);

          if (this.passato) {
            lastError = serverErr.errors;
            M.toast({html: serverErr.errors} );

          }
        }

      }

       /* for (let index = 0; index < serverErr.errors.length; index++) {
        }
       }
      if (error.status === 401) {
        window.location.href = "/authentication";
      } */
    } else if (error instanceof Error) {
      console.error(error);
    } else {
      console.warn('Hai sbagliato caso.');
    }
  }
}
