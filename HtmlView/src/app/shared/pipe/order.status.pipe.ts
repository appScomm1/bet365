import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';


@Injectable()
@Pipe({
 name: 'status'
})
export class StatusPipe implements PipeTransform {

  stato;
  result;

  constructor(
    private translateService: TranslateService
  ) {}

 transform(status: string) {
   this.stato = 'status' + '.' + status;
   return this.stato;
 }
}
