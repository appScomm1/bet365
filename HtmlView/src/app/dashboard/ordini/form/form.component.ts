import {Component, OnInit, ViewChild, ElementRef, NgZone, OnChanges, SimpleChanges} from '@angular/core';
import { FornitoriService } from '@app/dashboard/fornitori/fornitori.service';
import {FormGroup, FormControl, Validators, AbstractControl, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute, RouterStateSnapshot, ParamMap} from '@angular/router';
import {OrdiniService} from '@app/dashboard/ordini/ordini.service';
import {UtilityService} from '@app/shared/utility.service';
import {ResizedEvent} from 'angular-resize-event';
import {HeightTabDirective} from '@app/shared/directive/heightTab.directive';
import * as moment from 'moment';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import {OrdiniListaModel} from '@app/shared/models/db_tables/ordini-lista.model';
import { DatePipe } from '@angular/common';
import { any } from 'codelyzer/util/function';
import Swal from "sweetalert2";
import {SettingsService} from '@app/dashboard/settings/settings.service';

declare const $: any;
declare const  M: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {

  constructor( private fornitoriservice: FornitoriService,
               private router: Router,
               private ordersService: OrdiniService,
               private utilityService: UtilityService,
               private ngZone: NgZone,
               private activatedRoute: ActivatedRoute,
               private settingsService: SettingsService,
               private formBuilder: FormBuilder,
               private translate: TranslateService, ) {
                this.translate.onLangChange
                .subscribe((event: LangChangeEvent) => {
                  this.translate.use(event.lang);
                  this.translate.get('datatables', {value: 'world'}).subscribe((x: any) => {
                    console.log('ciao subscribe', x);
                    this.dtOptions = {
                      responsive: true,
                      autoWidth: false,
                      language: x,
                    };
                    this.dtOptionsLogTable = {
                      responsive: true,
                      autoWidth: false,
                      language: x,
                    };
                    this.refresh = false;
                  });
                  setTimeout(() => {
                    this.refresh = true;
                  }, 0);

                  this.translate.get('breadcrumbs.orders.list').subscribe((app: string) => {
                      utilityService.Navigation[this.basePosBreadcrumbs] = {title: app, path: '/orders'};
                    });

                  if (this.orderid) {
                    this.translate.get('breadcrumbs.orders.details').subscribe((app: string) => {
                      utilityService.Navigation[this.posBreadcrumbs] = {title: app, path: '/orders/' + this.orderid};
                    });
                  } else {
                    this.translate.get('breadcrumbs.orders.new').subscribe((app: string) => {
                      utilityService.Navigation[this.posBreadcrumbs] = {title: app, path: '/orders/new'};
                    });
                  }

                  this.translate.get('Orders.common.supplier').subscribe((app: string) => {
                    this.translations.fornitore = app;
                  });

                  this.translate.get('Orders.common.type').subscribe((app: string) => {
                    this.translations.tipo = app;
                  });

                  this.translate.get('Orders.common.currency').subscribe((app: string) => {
                    this.translations.valuta = app;
                  });
                });
               }

  @ViewChild('fornitorinput') autocompletefornitori: ElementRef;
  @ViewChild('date') dataemissione: ElementRef;
  @ViewChild('supplier') Supplier;
  @ViewChild('Currency') Currency;
  @ViewChild('ordertype') ordertype;
  @ViewChild(HeightTabDirective) heightDirective: HeightTabDirective;

  datatableElement: DataTableDirective;
  dtOptions: any = {};

  dtOptionsLogTable: any = {};
  fornitori: any;
  prova = [];
  app: any;
  data = { righe: []};
  fornitoriform: FormGroup = null;
  modificata = false;
  terminiresa;
  terminipagamento;
  addresses: any;
  refresh = true;
  rowData = [];
  rows = {
    righe: []
  };

  terminiConsegna;
  terminiPagamento;
  fornitoreId;
  addordine = {
    productsId: null,
    sku: '',
    qty: null,
    price: null,
    descr: '',
    delivery_date: '',
  };

  referenti = [];

  fornitore;

  supplierId = -1;

  currencies = [];
  currency: any = '';

  type = [];

  listafornitori = [];
  filename = [];
  file = [];
  idAllegato;
  commentoRev;
  checkRevisione = false;


  orderid = null;

  dettaglio = false;

  order: OrdiniListaModel;

  reverseOrders = [];

  stato = '';

  ordini = [];


  intestazione: string;

  posBreadcrumbs;
  basePosBreadcrumbs;

  translations = {
    fornitore: '',
    tipo: '',
    valuta: '',
  };

  ordiniform = new FormGroup({
    suppliersId: this.utilityService.standardFormControl(true, false),
    emit_date: this.utilityService.standardFormControl(false, false),
    delivery_address: this.utilityService.standardFormControl(true, false),
    delivery_term: this.utilityService.standardFormControl(true, false),
    payment_term: this.utilityService.standardFormControl(true, false),
    packaging: this.utilityService.standardFormControl(false, false),
    currency: this.utilityService.standardFormControl(true, false),
    referentsId: this.utilityService.standardFormControl(false, false),
    orderType: this.utilityService.standardFormControl(true, false),
    rows: this.utilityService.standardFormControl(true, false)

  });


ngOnInit() {
  this.utilityService.Navigation = [];
  this.translate.get('breadcrumbs.orders.list').subscribe((app: string) => {
    this.basePosBreadcrumbs = this.utilityService.Navigation.length;
    this.utilityService.Navigation.push({title: app, path: '/orders'});
  });
  this.activatedRoute
      .paramMap
      .subscribe((paramsMap: ParamMap) => {
        // se l'url ha un id lo inserisce nelle variabile, se questo avviene vuol dire che si sta navigando nella pagina di modifica
        this.orderid = +paramsMap.get('id');
        console.log(this.orderid);
        if (this.orderid) {

         this.getOrder();

        } else {
          this.translate.get('breadcrumbs.orders.new').subscribe((app: string) => {
            this.posBreadcrumbs = this.utilityService.Navigation.length;
            this.utilityService.Navigation.push({title: app, path: '/orders/new'});
          });

           // setto la data emissione ad oggi
          this.ordiniform.controls.emit_date.setValue(moment().format('YYYY-MM-DD'));
          this.dettaglio = false;
          this.intestazione = 'Nuovo Prodotto';
        }

        this.translate.get('Orders.common.supplier').subscribe((app: string) => {
          this.translations.fornitore = app;
        });

        this.translate.get('Orders.common.type').subscribe((app: string) => {
          this.translations.tipo = app;
        });

        this.translate.get('Orders.common.currency').subscribe((app: string) => {
          this.translations.valuta = app;
        });

        this.stato = 'Draft';
      });

  this.getDDl();

  this.getSuppliers();

  $('.tabs').tabs();
  $('.tooltipped').tooltip();

  this.setPrint();
  this.disableButtons(this.stato);
  }

  getDDl() {
  // prende i valori per le select e gli autocomplete
    this.ordersService.GetCurrentCompanies().subscribe((res: any) => {
      console.log("res: ", res);
      this.addresses = res.data.Addresses;
      console.log("addresses: ", this.addresses);
    });
    this.initForms();

    this.ordersService.GetDDlterminiConsegna().subscribe((res: any) => {
      this.terminiConsegna = res.data;
    });
    this.ordersService.GetDDlTerminiPagamento().subscribe((res: any) => {
      this.terminiPagamento = res.data;
    });

    this.settingsService.getCurrentCompany().subscribe((res: any) => {
      this.settingsService.getCurrencyList(res.data.id).subscribe((val: any) => {
        this.currencies = val.data;
      });
    });

    this.ordersService.GetType().subscribe((res: any) => {
      this.type = res.data;
    });
  }

  getOrder() {
    this.ordersService.getOrdine(this.orderid).subscribe((res: any) => {
      this.order = res.data;
      this.order.emit_date = this.order.emit_date.slice(0, 10);
      console.log(this.order.emit_date);
      this.rowData = this.order.rows;
      this.rows.righe = this.rowData;
      this.stato = res.data.status;

      this.translate.get('breadcrumbs.orders.details').subscribe((app: string) => {
        this.posBreadcrumbs = this.utilityService.Navigation.length;
        this.utilityService.Navigation.push({title: app, path: '/orders/' + this.orderid});
      });

      this.ordiniform.patchValue(this.order);
      console.log(this.ordiniform.controls);
      this.GetReverseOrder();
      this.dettaglio = true;
    });
  }

  DataPicker() {
  // funzione per settere value datapicker
    this.ordiniform.controls.emit_date.setValue(this.dataemissione.nativeElement.value);
    this.ordiniform.controls.emit_date.markAsDirty();
  }

  getSuppliers() {
  // riceve lista fornitori ma struttura l'array in modo tale che venga acccettato dall'autocomlpete
    this.fornitoriservice.getListaTable().subscribe((x: any) => {
      x.data.map(
        (y: any) => (
          this.app = {label: y.r_sociale, value: y.id},
            this.prova.push(this.app)
        )
      );

      console.log(x.data);
      this.listafornitori = x.data;
      console.log(this.listafornitori);
      x.data.map(
        (y: any) => (
          this.app = {id: y.id, referents: y.referents},
            this.referenti.push(this.app)
        )
      );
    });
  }

  GetReverseOrder() {
  // prende tutto lo storico delle modifiche dell'ordine
    this.ordersService.getReverseOrders(this.orderid).subscribe((res: any) => {
      this.reverseOrders = res.data;
    });
  }

  infoFornitore(type, id) {
    if (type === 'add') {
      // se il fornitore che selezioniamo ha gia settati termini di pagamento e di consegna vengono direttamente settati anche essi
      this.fornitoriservice.getSupplierById(id).subscribe((res: any) => {
        this.fornitori = res.data;
        this.ordiniform.controls.suppliersId.setValue(this.fornitori.id);
        this.ordiniform.controls.suppliersId.markAsDirty();
        this.currency = this.fornitori.price_list.currency;
        this.ordiniform.controls.delivery_term.setValue(this.fornitori.delivery_term);
        this.ordiniform.controls.payment_term.setValue(this.fornitori.payment_term);
        $('select').formSelect();

        console.log(this.ordiniform.value);
        console.log(this.dataemissione);
      });
    }
    if (type === 'delete') {
      // this.ordiniform.controls.term_resa.reset();
      // this.ordiniform.controls.term_pagamento.reset();
    }
  }


 /* setStatus(stato) {
    if (stato = '') {
>>>>>>> 8a5955d5e418f20379af8694a6de48d4fa98f0c7
      return 'Bozza';
    } else {
      return stato;
    }
  }*/

  Fornitore(event) {
    this.fornitoreId = event.value;
    this.infoFornitore(event.action, event.value);
    // foreach per cercare il supplierID per select fornitori
    this.supplierId = this.referenti.findIndex(x => x.id === event.value);

    if (this.supplierId === -1) {
      $('.referenti').prop('disabled', true);
    } else {
      $('.referenti').removeAttr('disabled');
    }
    setTimeout(() => {
      $('select').formSelect();
    }, 10);
    console.log(this.ordiniform.value);
  }

  /*
  Termini(event, type) {
    console.log('termini');

    if (type === 'delivery') {
      this.ordiniform.controls.delivery_term.setValue(event.name);
    }

    if (type === 'payment') {
      this.ordiniform.controls.payment_term.setValue(event.name);
    }
  }
*/
  Termini(event, type) {
    // funzione per prendere il valore della currency dall'autocomplete
    if (type === 'currency') {
      this.ordiniform.controls.currency.setValue(event.value);
      this.ordiniform.controls.currency.markAsDirty();
    } else if (type === 'currency supplier') {
      this.fornitoriform.controls.currency.setValue(event.value);
      this.ordiniform.controls.currency.markAsDirty();
    }
  }

  Type(event, type) {
    if (type === 'type') {
      this.ordiniform.controls.orderType.setValue(event.value);
    }
  }


  SaveOrdine() {
    if (this.dettaglio) {
      // modifica ordine
      console.log('dettaglio');
      this.UpdateOrdine();
    } else {
      // Crea nuovo Ordine
      this.CreateOrder();
    }
  }

  CreateOrder() {

    this.ordiniform.controls.rows.setValue(this.data.righe);
    //  this.ordiniform.controls.currency.setValue('EUR');

    if (this.ordiniform.valid) {
      this.ordersService.CreateOrders(this.ordiniform.value).subscribe((res) => {
        this.router.navigate(['/dashboard/orders']);
        this.clear();
      });
    } else {
      alert('compila tutti i campi');
    }
  }

  UpdateOrdine() {
    // Modifica ordine
    const dirtyFields = {};
    for (const control in this.ordiniform.controls) {
      if (this.ordiniform.get(control).dirty) {
        console.log(this.ordiniform.get(control));
        dirtyFields[control] = this.ordiniform.get(control).value;
      }
    }
    console.log(dirtyFields);
    if (this.ordiniform.valid) {

      this.ordersService.UpdateOrders(this.orderid, dirtyFields).subscribe((res) => {
        this.router.navigate(['/dashboard/orders']);
      });
      this.stato = 'Aperto';

    } else {
      console.log('invalid', this.ordiniform.controls);
      alert('compila tutti i campi');
    }
  }

  sendOrdine() {
    this.ordersService.CreateOrders(this.ordini).subscribe();
    this.clear();
    this.stato = 'Send';
    console.log(this.stato);
  }

  clear() {
    this.ordiniform.reset();
    $('select').formSelect();
    this.Currency.clear();
    this.Supplier.clear();
    this.ordiniform.controls.emit_date.setValue(moment().format('YYYY-MM-DD'));
  }

  AddOrdine() {
    // crea una riga d'ordine se siamo in dettaglio la invia al server.
    // In fase di creazione non viene creata tramite server ma viene messe in un oggetto che poi sarà inviato insieme alla creazione dell'intero ordine.
    if (this.dettaglio) {
      this.ordersService.CreateRows(this.orderid, this.addordine).subscribe((res) => {
        this.getOrder();
        this.addordine = {
          productsId: null,
          sku: '',
          qty: null,
          price: null,
          descr: '',
          delivery_date: ''
        };
      });
    } else {
      let id = null;
      // ricavo id per nuova riga
      console.log(this.data);
      if (this.data !== undefined) {
        this.data.righe.forEach((riga) => {
          id = riga.id + 1;
        });
      } else {
        id = 0;
      }
      // this.addordine.sku = id;
      // carico il nuovo ordine
      console.log('aggiungtariga', this.addordine);
      this.data.righe.push(this.addordine);
      console.log(this.data);
      this.addordine = {
        productsId: null,
        sku: '',
        qty: null,
        price: null,
        descr: '',
        delivery_date: '',
      };
    }
  }

  deleteOrdine(id) {
    // cancella una riga d'ordine
    console.log(id);


    Swal.fire({
      title: 'Sei sicuro?',
      text: 'Non sarai in grado di recuperare questa voce del listino',
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
          'La voce del listino è stata eliminata con successo',
          'success'
        );

        this.ordersService.DeleteRows(this.orderid, id).subscribe(() => {
          this.getOrder();
        });
      }
    });
  }

  patchRow(data) {
    // Modifica di una riga chiamata dal tablerowcomponent
    const patch = {};
    patch[data.label] = data.value;
    this.ordersService.UpdateRows(this.orderid, data.id, patch).subscribe((res) => {
      console.log(res);
    });
  }

  onResize(resize: ResizedEvent) {
    // funzione per settare altezza card con la Tab piu alta
    console.log('ciao', resize);
    this.heightDirective.setHeight(resize.newHeight);
  }

  validateFormControl(abstractControl: AbstractControl, modificata): object {
    return this.utilityService.FormClassValidator(abstractControl, modificata);
  }

  initForms() {
    // inizializzazione Form
    this.fornitoriform = this.formBuilder.group({
      r_sociale: this.utilityService.standardFormControl(),
      piva: this.utilityService.standardFormControl(),
      indirizzo_consegna: this.utilityService.standardFormControl(),
      tel: this.utilityService.telephoneFormControl(true, 10, '', true),
      email: this.utilityService.emailFormControl(),
      website: this.utilityService.standardFormControl(),
      delivery_term: this.utilityService.standardFormControl(),
      payment_term: this.utilityService.standardFormControl(),
      currency: this.utilityService.standardFormControl(),
    });
  }

  showModal(command) {
    if (command === 'Lista') {
      $('#fornitoriModal').modal('open');
    } else {
    this.fornitoriform.enable();
    this.fornitoriservice.GetDDlterminiConsegna().subscribe((res) => {
      this.terminiresa = res.data;
      console.log(this.terminiresa);
    });
    this.fornitoriservice.GetDDlTerminiPagamento().subscribe((res) => {
      this.terminipagamento = res.data;
      console.log(this.terminipagamento);
    });
    this.fornitoriform.controls.r_sociale.setValue( command.value);
    $('#modalFornitore').modal('open');
  }
  }

  SaveFornitore() {
    // creazione fornitore tramite Modal
    this.modificata = true;
    // inserimento
    const currency = {
      currency: this.fornitoriform.controls.currency.value
    };
    this.fornitori = this.fornitoriform.value;
    this.fornitori.price_list = currency;
    this.fornitoriservice.CreateSupplier(this.fornitori).subscribe((res) => {
      $('#modalFornitore').modal('close');
      this.getSuppliers();
    });
  }

  onFilesAdded(files: File[], type) {
    console.log(files);
    if (type === 'add') {
      files.forEach(file => {
        this.file.push({name: file.name, last_update: file.lastModified, descr: null, revisioni: {}});
        this.filename.push(file.name);
      });
    } else {
      files.forEach(file => {
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

   ShowModalUpload(name?) {
    if (name) {
      this.idAllegato = name;
    }
    $('#ModalUpAllegati').modal('open');
  }

  discardFile(i) {
    this.file.splice(i, 1);

    console.log(this.file);
  }

  Showdescription() {
    setTimeout(() => { M.textareaAutoResize($('#textareaDescription')); }, 10);
  }

  ShowAllegati(type, idrow?) {
    if (type === 'allegati') {
      // api per allegati
    } else {
      // api per revisioni
    }
    $('#AllegatiModal').modal('open');
  }


  /* annulla() {
>>>>>>> 8a5955d5e418f20379af8694a6de48d4fa98f0c7
    console.log(this.order);
    this.ordiniform.patchValue(this.order);
    $('select').formSelect();
    console.log(this.ordiniform.value);
  } */

  printOrdine() {
    // Stampa Order
  }

  deleteOrder() {
    this.ordersService.DeleteOrders(this.order.id).subscribe();
    this.router.navigate(['/dashboard/orders']);
    this.clear();
  }

  ActivateLabel(dettaglio) {
    if (dettaglio) {
      return 'active';
    }
  }


  // da cambiare quando vediamo a simo e decidiamo i buttoni
  ngOnChanges(changes: SimpleChanges) {
    if (changes.stato.currentValue !== changes.stato.previousValue) {
      this.setPrint();
      this.disableButtons(this.stato);
    }
  }

  disableButtons(stato) {
    if (stato === 'Draft' || stato === 'Confirmed') {
      $('.bottoni').prop('disabled', true);
    } else {
      $('.bottoni').removeAttr('disabled');
    }
  }

  setPrint() {
    if (this.stato === 'Draft') {
      $('.stampa').prop('disabled', true);
    } else {
      $('.stampa').removeAttr('disabled');
    }
  }
}
