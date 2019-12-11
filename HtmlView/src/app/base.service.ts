import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor() {}

  public mockService(data: any) {
    let observable = new Observable((observer: any) => {
        observer.next(data);
        observer.complete();
    });
    return observable;
}
}
