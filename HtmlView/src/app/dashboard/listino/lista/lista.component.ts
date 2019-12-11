import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, DoCheck, AfterContentInit } from '@angular/core';
import { ListinoService } from '../listino.service';
import {ProdottiListaModel} from '@app/shared/models/db_tables/prodotti-lista.model';
import {DataTableDirective} from 'angular-datatables';
import Swal from 'sweetalert2';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {UtilityService} from '@app/shared/utility.service';
import { any } from 'codelyzer/util/function';
import { LanguageVariant } from 'typescript';
import { async } from 'q';
import {map} from 'rxjs/operators';

declare const $: any;

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {
    responsive: {
      details: true
    },
    autoWidth: false,
    language: {},
  };
prodotti: [ProdottiListaModel];

posBreadcrumbs;

filter = [];
filtersLocked: boolean;
listfilter = [];
categoriesFilter = ['Descrizione', 'Sku', 'Codice a barre'];

user;


constructor(
    private listinoService: ListinoService,
    private translate: TranslateService,
    private utilityService: UtilityService
  ) {
    this.translate.onLangChange
      .subscribe((event: LangChangeEvent) => {
        this.translate.get('breadcrumbs.catalog.list').subscribe((app: string) => {
          utilityService.Navigation[this.posBreadcrumbs] = {title: app, path: '/list'};
        });
      });
   }

  ngAfterViewInit() {
    this.translate.onLangChange
    .subscribe(() => {
      this.translate.get('datatables', {value: 'world'}).subscribe((x: any) => {
        this.dtOptions.language = x;
        console.log(x);
      });
    });

    const table = $('#dataTables').DataTable();

    table.ajax.reload();
  }

ngOnInit() {
    this.user =  this.utilityService.user;
    this.utilityService.Navigation = [];
    this.getListProducts();

    this.translate.get('breadcrumbs.catalog.list').subscribe((app: string) => {
      this.posBreadcrumbs = this.utilityService.Navigation.length;
      this.utilityService.Navigation.push({title: app, path: '/list'});
    });

    this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
      this.translate.get('datatables', {value: 'world'}).subscribe((x: any) => {
        this.dtOptions.language = x;
        console.log(x);
      });
    });
  }

deleteProduct(id) {
    Swal.fire({
      title: 'Sei sicuro?',
      text: 'Non sarai in grado di recuperare questo prodotto',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Elimina',
      cancelButtonText: 'Annulla'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminata!',
          'Il prodotto è stata eliminato con successo',
          'success'
        );
        this.listinoService.DeleteProducts(id).subscribe(() => {
            this.getListProducts();
          }
        );
      }
    });
  }

getListProducts() {
    this.listinoService.GetListProducts().subscribe((res: any) => {
      this.prodotti = res.data;
    } );
  }

  prova() {
    console.log("cicaiocics");
    this.translate.onLangChange
    .subscribe(() => {
      this.translate.get('datatables', {value: 'world'}).subscribe((x: any) => {
        this.dtOptions.language = x;
        console.log(x);
      });
    });
  }

  fillfilter() {

    this.listfilter.push({value: 'inserted', name: 'Cerca per stato', property: 'status'});
    this.listfilter.push({value: 'proposed_buyer', name: 'Cerca per stato', property: 'status'});
    this.listfilter.push({value: 'proposed_supplier', name: 'Cerca per stato', property: 'status'});
    this.listfilter.push({value: 'edited_buyer', name: 'Cerca per stato', property: 'status'});
    this.listfilter.push({value: 'edited_supplier', name: 'Cerca per stato', property: 'status'});
    this.listfilter.push({value: 'accepted', name: 'Cerca per stato', property: 'status'});
    this.listfilter.push({value: 'canceled', name: 'Cerca per stato', property: 'status'});
    this.listfilter.push({value: 'received', name: 'Cerca per stato', property: 'status'});

    this.listinoService.getLista().pipe(
      map(
        (r: any) => {
          r.data.forEach(
            (res) =>
              this.listfilter.push({value: res.r_sociale, name: 'Cerca per Fornitore', property: 'supplier'})
          );
        }
      )).subscribe();
  }

  emitfilter(event) {
    if (event.action !== 'delete') {
      this.filter.push({value: event.name, type: event.property});
      this.Searchwithfilter();
    }
  }

  Searchwithfilter(item?) {
    // scatenato quando si preme invio dentro al filtro
    if (item && item.action === 'string') {
      this.filter.push({value: item.name, type: item.property});
    }
    console.log(this.filter);
    // richiamare api per lista con filtro
  }

  translateType(type) {
    if (type === 'status') {
      return this.translate.get('Orders.filter.status');
    } else if (type === 'supplier') {
      return this.translate.get('Orders.filter.supplier');
    } else if (type === 'order_code') {
      return this.translate.get('Orders.filter.order_code');
    } else if (type === 'allFields') {
      return this.translate.get('Orders.filter.allFields');
    }
  }

  checkPermission(section) {
      return true;
  }

}
