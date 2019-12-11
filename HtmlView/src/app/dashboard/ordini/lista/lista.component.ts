import {AfterViewInit, ApplicationRef, Component, ElementRef, HostListener, NgZone, OnInit, Type, ViewChild} from '@angular/core';
import { OrdiniService} from '../ordini.service';
import {DataTableDirective} from 'angular-datatables';
import { Template } from '@app/template.service';

import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {selectValueAccessor} from   '@angular/forms/src/directives/shared';
import * as moment from 'moment';
import {OrdiniRigheListaModel} from '@app/shared/models/db_tables/ordini-righe-lista.model';
import {ServerBaseResponse} from '@app/shared/models/server-base-response';
import {OrdiniListaModel} from '@app/shared/models/db_tables/ordini-lista.model';
import {lifecycleHooksMethods} from 'codelyzer/noLifeCycleCallRule';
import {FornitoriService} from '@app/dashboard/fornitori/fornitori.service';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import set = Reflect.set;
import {UtilityService} from '@app/shared/utility.service';
import {del} from 'selenium-webdriver/http';
import {OrderModel} from '@app/shared/models/db_tables/.order.model';
import {FormBuilder, FormGroup} from '@angular/forms';

declare const $: any;
declare const M: any;

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  tabRighe = $('righe').DataTable({
    deferRender: true
  });
  // dtTriggerRows: Subject<any> = new Subject();

  // dtTrigger: Subject<any> = new Subject();
  OrderForm: FormGroup = null;
  CodeOrderDetail;
  icontext = 'list';
  propertySearch;
  filter = [];
  select = false;
  moment = moment;
  dtOptions: any = {};
  dtOptionsLogTable: any = {};
  dtOptionsrighe: any = {};
  ordini: [OrdiniListaModel];
  modifica = false;
  filtersLocked: boolean;
  visualizza = 'righe';
  rows: [OrdiniRigheListaModel];
  checkrow = false;
  new;
  ShowDescription = false;
  checkRevisione = false;
  note;
  filename = [];
  storicorev;
  commentoRev;
  idAllegato;
  idSaveupdate = { row: null, order: null };
  reverseOrdersRow: any;
  idmodifica;
  response_term;
  terminiresa;
  terminipagamento;
  importa;
  refresh = true;
  hourResponseTerm;
  prova = '/13';
  iconVisibility;
  selected = [];
  listfilter = [];
  categoriesFilter = ['Fornitore', 'Stato', 'Codice prodotto'];
  file = [];

  posBreadcrumbs;
  updateRow = {orderid: null, rowId: null};

  user;

  rowLoaders = [];

  constructor(
    private ordiniservice: OrdiniService,
    private translate: TranslateService,
    private fornitoriService: FornitoriService,
    private appref: ApplicationRef,
    private utilityService: UtilityService,
    private dropzone: ElementRef,
    private formBuilder: FormBuilder,
    private fornitoriservice: FornitoriService,
  ) {
    this.translate.onLangChange
      .subscribe((event: LangChangeEvent) => {
        this.translate.use(event.lang);
        this.translate.get('Orders.List.Button.new', {value: 'world'}).subscribe((x: string) => {
          this.new = x;
          console.log('ciao dddd');
        });
        this.translate.get('Orders.List.Button.import', {value: 'world'}).subscribe((x: string) => this.importa = x);
        this.translate.get('datatables', {value: 'world'}).subscribe((x: any) => {
          console.log('ciao subscribe', x);
          this.dtOptions = {
            responsive: {
              details: true
            },
            autoWidth: false,
            language: x,
          };
          this.dtOptionsLogTable = {
            responsive: true,
            autoWidth: false,
            language: x,
          };
          this.refresh = false;

          this.translate.get('breadcrumbs.orders.list').subscribe((app: string) => {
            this.utilityService.Navigation[this.posBreadcrumbs] = {title: app, path: '/orders'};
          });
        });
        setTimeout(() => {
          this.refresh = true;
        }, 0);
      });
  }

  ngOnInit(): void {
    this.user =  this.utilityService.user;
    console.log('Utenteeeeeee', this.utilityService.user);
    this.initFormDetail();
    $('.collapsible').collapsible();
    this.ordiniservice.getCurrentCompaniens().subscribe((res: any) => {
      console.log(res);
      this.response_term = res.data.response_term;
    });
    this.utilityService.Navigation = [];

    this.translate.get('breadcrumbs.orders.list').subscribe((app: string) => {
      this.posBreadcrumbs = this.utilityService.Navigation.length;
      this.utilityService.Navigation.push({title: app, path: '/orders'});
    });


    this.getListRows('false');
    this.getListOrders();
    this.fillfilter();

    this.translate.get('Orders.List.Button.new', {value: 'world'}).subscribe((x: string) => this.new = x);
    this.translate.get('Orders.List.Button.import', {value: 'world'}).subscribe((x: string) => this.importa = x);

  }

  initFormDetail() {
    this.OrderForm = this.formBuilder.group({
      emit_date: this.utilityService.standardFormControl(false, false),
      delivery_address: this.utilityService.standardFormControl(true, false),
      delivery_term: this.utilityService.standardFormControl(true, false),
      payment_term: this.utilityService.standardFormControl(true, false),
      packaging: this.utilityService.standardFormControl(false, false),
      currency: this.utilityService.standardFormControl(true, false),
      fornitore: this.utilityService.standardFormControl(false, false),
      orderType: this.utilityService.standardFormControl(true, false),
      referent_name:  this.utilityService.standardFormControl(true, false),
      referent_surname:  this.utilityService.standardFormControl(true, false),
    });
    this.fornitoriservice.GetDDlterminiConsegna().subscribe((res) => {
      this.terminiresa = res.data;
      console.log(this.terminiresa);
    });
    this.fornitoriservice.GetDDlTerminiPagamento().subscribe((res) => {
      this.terminipagamento = res.data;
      console.log(this.terminipagamento);
    });
  }

  textdelay(date) {
    const delay = moment().diff(moment(date), 'days');
    return delay;
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

    this.fornitoriService.getListaTable().pipe(
      map(
        (r: any) => {
          r.data.forEach(
            (res) =>
              this.listfilter.push({value: res.r_sociale, name: 'Cerca per Fornitore', property: 'supplier'})
          );
        }
      )).subscribe();
  }


  getListRows(loader) {
    console.log("loader getListRows: ", loader);
    this.ordiniservice.GetListRows(loader).subscribe((res: any) => {
      this.rows = res.data;
      console.log(this.rows);
    });
  }

  getListOrders() {
    this.ordiniservice.GetListOrders()
      .subscribe((res: any) => {
        this.ordini = res.data;
        res.data.map((r) => {
          this.listfilter.push({value: r.code.toString(), name: 'Cerca per codice ordine', property: 'code_order'});
        });
        console.log("ordini: ", this.ordini);
      });
  }

  //  funzione per prove
  ciao(id) {
    console.log(this.rows);
    console.log(this.prova);
    this.select = true;
  }

  ngAfterViewInit(): void {
  }

  saveUpdate(event, row) {
    // funzione per salvattagio modifiche di una singola riga
    this.idSaveupdate.row = row.id;
    this.idSaveupdate.order = row.ordersId;
    this.rowLoaders[row] = true;
    this.ordiniservice.UpdateRows(row.ordersId, row.id, row).subscribe((res: ServerBaseResponse<OrdiniRigheListaModel>) => {
      console.log(res);
      this.getListRows('false');
      setTimeout(() => {
        this.rowLoaders[row] = false;
      }, 500);
    //  this.showNoteModal();
    });
    //  this.modifica = false;
    $(event.path[3]).removeClass('color-update'); // 3 perchè mi serve prendere il terzo padre(tr)
  }

  patchRow( idrow, idorder, label, value, note) {
    console.log(value);
    console.log("dai sususususussusu");
    const patch = {};
    patch[label] = value;
    this.note = note;
    this.idSaveupdate.row = idrow;
    this.idSaveupdate.order = idorder;
    this.rowLoaders[idrow] = true;
    this.ordiniservice.UpdateRows(idorder, idrow, patch).subscribe((res: ServerBaseResponse<OrdiniRigheListaModel>) => {
      console.log(res);
      this.getListRows('true');
      setTimeout(() => {
        this.rowLoaders[idrow] = false;
      }, 500);
    /*  if (label !== 'notes') {
        this.showNoteModal();
      }*/
    });
    //  this.modifica = false;
  //  $(event.path[3]).removeClass('color-update'); // 3 perchè mi serve prendere il terzo padre(tr)
  }

  saveNote() {
    console.log('ciao');
    const objupdate = {notes: this.note};
    this.rowLoaders[this.updateRow.rowId] = true;
    this.ordiniservice.UpdateRows( this.updateRow.orderid, this.updateRow.rowId, objupdate).subscribe(
      (res: ServerBaseResponse<OrdiniRigheListaModel>) => {
      console.log(res);
      this.getListRows('true');
      setTimeout(() => {
        this.rowLoaders[this.updateRow.rowId] = false;
      }, 500);
    });
    $('#NoteModal').modal('close');
  }

  dismissNote() {
    $('#NoteModal').modal('close');
  }


  checkBoxChange(input, idrow) {
    // funzione per cambiare backgorund alla riga selezionata
    if (input.target.checked) {
      this.selected.push(idrow);
      $(input.path[3]).addClass('selected-table');
      this.select = true;
      console.log(this.selected);
    } else {
      const index = this.selected.indexOf(idrow);
      console.log(index);
      this.selected.splice(index, 1);
      console.log(this.selected);
      $(input.path[3]).removeClass('selected-table');
      if ($('tbody').find('.selected-table').length === 0) {
        this.select = false;
      }
    }
  }

  changeAllCheckBox() {
    // funzione per cambiare background quando selezione tutte le rgihe
    this.checkrow = !this.checkrow;
    if (this.checkrow) {
      this.selected = [];
      this.rows.forEach((row) => {
        this.selected.push(row.id);
      });
      $('tbody').find('tr').addClass('selected-table');
      this.select = true;
      console.log(this.selected);
    } else {
      this.selected = [];
      $('tbody').find('tr').removeClass('selected-table');
      this.select = false;
      console.log(this.selected);
    }
  }

  deleteRow(idRow, idOrder) {
    Swal.fire({
      title: 'Sei sicuro?',
      text: 'Non sarai in grado di recuperare questa riga',
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
          'La riga è stata eliminata con successo',
          'success'
        );
        this.ordiniservice.DeleteRows(idOrder, idRow).subscribe((res) => {
          this.getListRows('false');
        });
      }
    });
  }

  /* funzione per cambiare colore al value del datepicker
    datapickerStyle(input) {
      console.log(input.target.value);
      console.log(moment().format('YYYY-MM-DD'));
      if (moment(input.target.value).diff(moment().format('YYYY-MM-DD'), 'days') >= 0 ) {
        console.log('blcak');
        $(input.path[0]).removeClass('red-text');
        $(input.path[0]).addClass('black-text');
      } else {
        console.log('red');
        $(input.path[0]).removeClass('black-text');
        $(input.path[0]).addClass('red-text');
      }

    }
    */

  controlloView(date, view) {
    const ore = this.response_term * 24;
    const oreperc = (ore * 70) / 100;

    if (view) {
      this.iconVisibility = 'visibility';
    } else {
      this.iconVisibility = 'visibility_off';
    }

    if (moment(date).add(oreperc, 'hour').diff(moment(), 'hours') >= 0) {
      return '#2196f3';
    } else if (moment().diff(moment(date).add(this.response_term, 'days'), 'hours') <= 0) {
      return '#ffd908';
    } else {
      return '#9e1010';
    }

  }

  deleteRows() {
  }

  updateStatusOrders(status) {
    const ids = {
      ids: this.selected
    };
    console.log(ids);
    this.ordiniservice.UpdateStatusOrder(ids, status).subscribe((res) => {
      this.getListRows('true');
      this.selected = [];
      this.select = false;
    });
  }

  updateStatusRow(id, status) {
    console.log('ciaomodal');
    const ids = {
      ids: [id]
    };
    this.ordiniservice.UpdateStatusOrder(ids, status).subscribe((res) => {
      this.getListRows('true');
      this.selected = [];
      this.select = false;
   //   this.showNoteModal();
    });
  }

  annullaModifiche() {
    // api per annullamento
  }

  deleteOrder(id) {
    Swal.fire({
      title: 'Sei sicuro?',
      text: 'Non sarai in grado di recuperare quest ordine',
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
          'L ordine è stata eliminato con successo',
          'success'
        );
        this.ordiniservice.DeleteOrders(id).subscribe(() => {
          this.getListOrders();
        });
      }
    });
  }

  acceptRows() {
  }

  tooltipView(date, icon) {
    let text = 'ciao';
    const ore = this.response_term * 24;
    const oreperc = (ore * 70) / 100;
    if (icon === 'visibility') {
      text = 'visualizzato, ';
    } else {
      text = 'non visualizzato, ';
    }

    if (moment(date).add(oreperc, 'hour').diff(moment(), 'hours') >= 0) {
      return text += 'dentro i tempi di risposta';
    } else if (moment().diff(moment(date).add(this.response_term, 'days'), 'hours') <= 0) {
      return text += 'tempi di risposta quasi scaduti';
    } else {
      return text += 'tempo di risposta non rispettato';
    }

  }

  ColorStatus(stato) {
    if (stato === 'accepted') {

      return 'status-accepted';

    } else if (stato === 'canceled') {

      return 'status-canceled';

    } else if (stato === 'inserted') {

      return 'status-inserted';

    } else if (stato === 'proposed_buyer') {

      return 'status-proposed_buyer';

    } else if (stato === 'edited_buyer') {

      return 'status-edited_buyer';

    } else if (stato === 'proposed_supplier') {

      return 'status-edited_supplier';

    } else if (stato === 'received') {

      return 'status-received';

    }
  }

  RowColor(stato) {
    if (stato === 'accepted') {

      return 'row-accepted';

    } else if (stato === 'canceled') {

      return 'row-canceled';

    } else if (stato === 'inserted') {

      return 'row-inserted';

    } else if (stato === 'proposed_buyer') {

      return 'row-proposed_buyer';

    } else if (stato === 'edited_buyer') {

      return 'row-edited_buyer';

    } else if (stato === 'edited_supplier') {

      return 'row-edited_supplier';

    } else if (stato === 'received') {

      return 'row-received';

    }
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

  translatebutton() {
    this.translate.get('Orders.List.Button.new').subscribe((x: string) => this.new = x);
    this.translate.get('Orders.List.Button.import').subscribe((x: string) => this.importa = x);
  }

  private lockFilters() {
    this.filtersLocked = !this.filtersLocked;
    localStorage.setItem('filtersLocked', this.filtersLocked.toString());
  }

  showStorico(idorder, idrow?) {
    console.log(idorder);
    console.log(idrow);
    if (idrow) {
      this.ordiniservice.getReverseOrdersRows(idorder, idrow).subscribe((res) => {
        this.reverseOrdersRow = res.data;
        $('#StoricoModal').modal('open');
      });
    } else {
      console.log('ordini');
    }
  }

  ShowAllegati(type, idrow?) {
    if (type === 'allegati') {
      // api per allegati
    } else {
      // api per revisioni
    }
    $('#AllegatiModal').modal('open');
  }

  ShowModalOrder(order) {
    this.CodeOrderDetail = order.code;
    this.OrderForm.patchValue(order);
    this.OrderForm.controls.referent_name.setValue(order.referent.first_name);
    this.OrderForm.controls.referent_surname.setValue(order.referent.last_name);
    this.OrderForm.controls.fornitore.setValue(order.supplier.r_sociale);
    this.OrderForm.controls.emit_date.setValue(order.emit_date.substring(0, 10));
    this.OrderForm.disable();
    $('select').formSelect(); // da fare nella direttiva
    $('#DetailOrderModal').modal('open');
  }

  showNoteModal(row) {
    this.updateRow.orderid = row.ordersId;
    this.updateRow.rowId = row.id;
    this.note = row.notes;
    $('#NoteModal').modal({
      dismissible: false,
    }
  );
    $('#NoteModal').modal('open');
  }
  ShowModalUpload(name) {
    this.idAllegato = name;
    $('#UploadModal').modal('open');
  }

  ShowModalAllegatoStorico(filerev) {
    this.storicorev = filerev.revisioni;
    $('#StoricoAllegati').modal('open');
  }

  Showdescription() {
    setTimeout(() => { M.textareaAutoResize($('#textareaDescription')); }, 10);
  }

  onFilesAdded(files, type) {
    console.log('Qui', files);
    if (type === 'add') {
      files.addedFiles.forEach(file => {
        this.file.push({name: file.name, last_update: file.lastModified, descr: null, revisioni: {}});
        this.filename.push(file.name);
      });
    } else {
      files.addedFiles.forEach(file => {
        this.file.forEach( f => {
          if (this.idAllegato === f.name) {
            f.revisioni = {name: file.name, commento: this.commentoRev, last_update: file.lastModified};
          }
        });
      });
    }

    console.log(this.file);
  }

  SaveFile() {
   // chiamata api per Salvare
    this.filename = [];
    console.log(this.checkRevisione);
  }

  saveRevision() {

  }

  discardFile(i) {
    this.file.splice(i, 1);

    console.log(this.file);
  }

  onRemove(event) {
    console.log('elemento rimossso');
    this.file.splice(this.file.indexOf(event), 1);
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

