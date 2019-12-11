import {Component, OnInit, ViewChild, ElementRef, NgZone, OnChanges, SimpleChanges} from '@angular/core';
import { Template } from '@app/template.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {selectValueAccessor} from '@angular/forms/src/directives/shared';
import * as moment from 'moment';
import {ServerBaseResponse} from '@app/shared/models/server-base-response';
import {lifecycleHooksMethods} from 'codelyzer/noLifeCycleCallRule';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import set = Reflect.set;
import {UtilityService} from '@app/shared/utility.service';
import {del} from 'selenium-webdriver/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UtentiService} from '@app/dashboard/utenti/utenti.service';
import {DataTableDirective} from 'angular-datatables';
import { AutocompleteComponent } from '@app/shared/autocomplete/autocomplete.component';
import {UtenteAutenticatoModel} from '@app/shared/models/db_tables/utente-autenticato.model';

@Component({
  selector: 'app-list',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {
    language: {},
  };

  users: [UtenteAutenticatoModel];

  refresh = true;

  posBreadcrumbs;

  user;

constructor(
    private utentiService: UtentiService,
    private translate: TranslateService,
    private utilityService: UtilityService,
    private dropzone: ElementRef) {

      this.translate.onLangChange
                .subscribe((event: LangChangeEvent) => {
                    this.translate.get('breadcrumbs.users.list').subscribe((app: string) => {
                      utilityService.Navigation[this.posBreadcrumbs] = {title: app, path: '/users/'};
                    });
                    this.translate.get('datatables', {value: 'world'}).subscribe((x: any) => {
                      this.dtOptions.language = x;
                    });
                });
  }

ngOnInit() {
    this.user =  this.utilityService.user;
    this.getUsersList();
    this.translate.get('datatables', {value: 'world'}).subscribe((x: any) => {
        this.dtOptions.language = x;

    });

    this.translate.get('breadcrumbs.users.list').subscribe((app: string) => {
      this.utilityService.Navigation = [];
      this.posBreadcrumbs = this.utilityService.Navigation.length;
      this.utilityService.Navigation.push({title: app, path: '/users'});
    });
  }

deleteUser(id) {
    Swal.fire({
      title: 'Sei sicuro?',
      text: 'Non sarai in grado di recuperare questo utente',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Elimina',
      cancelButtonText: 'Annulla'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminato!',
          "L'utente è stata eliminato con successo",
          'success'
        );
        this.utentiService.DeleteUser(id).subscribe(() => {
          this.getUsersList();
        }
      );
      }
    });
  }

getUsersList() {
    this.utentiService.GetUsersList().subscribe((res: any) => {
      this.users = res.data;
      console.log(res.data);
    } );
  }

  checkPermission(section) {
    const exist = this.user.permissions.find((element) => {
      return element === section;
    });

    if (exist) {
      return true;
    } else {
      return false;
    }
  }
}
