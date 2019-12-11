import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FornitoriService } from '../fornitori.service';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {DataTableDirective} from "angular-datatables";
import Swal from "sweetalert2";
import {UtilityService} from "@app/shared/utility.service";
import {map} from 'rxjs/operators';
declare const $: any;
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {
    responsive: {
      details: true
    },
    autoWidth: false,
    language: {},
  };
  fornitori = [];
  tipoFornitori = [];
  raggruppa = null;
  new;
  importa;
  refresh = true;

  posBreadcrumbs;

  filter = [];
  filtersLocked: boolean;
  listfilter = [];
  categoriesFilter = ['Nome', 'email', 'P. iva'];

  user;

  constructor(
    private fornitoriService: FornitoriService,
    private translate: TranslateService,
    private utilityService: UtilityService
  ) {
    this.translate.onLangChange
      .subscribe((event: LangChangeEvent) => {

        this.translate.get('breadcrumbs.suppliers.list').subscribe((app: string) => {
          utilityService.Navigation[this.posBreadcrumbs] = {title: app, path: '/suppliers'};
        });


        this.translate.use(event.lang);
        this.translate.get('Suppliers.List.Button.new', {value: 'world'}).subscribe((x: string) => this.new = x);
        this.translate.get('Suppliers.List.Button.import', {value: 'world'}).subscribe((x: string) => this.importa = x);
        this.translate.get('datatables', {value: 'world'}).subscribe((x: any) => {
          console.log('ciao subscribe', x);
          this.dtOptions = {
            responsive: true,
            autoWidth: false,
            language: x,
          };
          this.refresh = false;
        });
        setTimeout(() => {
          this.refresh = true;
        }, 0);
      });
  }

  ngOnInit() {
    this.user =  this.utilityService.user;
    this.utilityService.Navigation = [];

    this.translate.get('breadcrumbs.suppliers.list').subscribe((app: string) => {
      this.posBreadcrumbs = this.utilityService.Navigation.length;
      this.utilityService.Navigation.push({title: app, path: '/suppliers'});
    });

    this.fornitoriService.getListaTable()
      .subscribe((res: any) => {
        this.fornitori = res.data;
      });

    this.translate.get('Suppliers.List.Button.new', {value: 'world'}).subscribe((x: string) => this.new = x);
    this.translate.get('Suppliers.List.Button.import', {value: 'world'}).subscribe((x: string) => this.importa = x);
  }

  getList() {
    this.fornitoriService.getListaTable()
      .subscribe((res: any) => {
        this.fornitori = res.data;
      });
  }

  onChange() {
    console.log(this.raggruppa);
  }

  deleteById(id) {
    Swal.fire({
      title: 'Sei sicuro?',
      text: 'Non sarai in grado di recuperare questo fornitori',
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
          'Il fornitore è stata eliminata con successo',
          'success'
        );
        this.fornitoriService.deleteSupplierByid(id).subscribe((res) => {
          this.getList();
        });
      }
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

    this.fornitoriService.getLista().pipe(
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
