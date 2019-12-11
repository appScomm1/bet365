
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {componentFactoryResolverProviderDef} from '@angular/compiler/src/view_compiler/provider_compiler';
import {OrdiniService} from '@app/dashboard/ordini/ordini.service';
import {ProdottiListaModel} from '@app/shared/models/db_tables/prodotti-lista.model';
import * as rxjs from 'rxjs';
import { from } from 'rxjs';
import {map} from 'rxjs/operators';
import {forEach} from '@angular/router/src/utils/collection';
import {ListinoService} from "@app/dashboard/listino/listino.service";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {UtilityService} from "@app/shared/utility.service";
import * as moment from "moment";
import { DataTableDirective } from 'angular-datatables';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

declare const $: any;
declare const  M: any;

@Component({
  selector: 'DM-tablerow',
  templateUrl: './tablerow.component.html',
  styleUrls: ['./tablerow.component.scss']
})
export class TablerowComponent implements OnInit {

  @Input() data;
  @Input() disable = false;
  @Input() addordine;
  @Input() ordineId;
  @Input() ordine;
  @Input() idFornitore = null;
  @Output() onChange = new EventEmitter<void>();
  @Output() FunzioneDiPut = new EventEmitter<void>() ;
  @Output() FocusNewRow = new EventEmitter<void>();
  @Output() AddOrdine = new EventEmitter<void>();
  @Output() DeleteOrdine = new EventEmitter<number>();
  @Output() GetNewData = new EventEmitter<void>();
  @Output() PatchRaw = new EventEmitter<{value, label, id}>();
  @ViewChild('date') dataconsegna: ElementRef;
  @ViewChild('chip') chips: ElementRef;
  nuovo = false;
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  refresh = true;

  constructor(private ele: ElementRef,
              private formBuilder: FormBuilder,
              private ordiniService: OrdiniService,
              private prodottoService: ListinoService,
              private utilityService: UtilityService,
              private translate: TranslateService,) {
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
          this.refresh = false;
        });
        setTimeout(() => {
          this.refresh = true;
        }, 0);
      });
  }

  prodottoForm: FormGroup = null;

  idAllegato;

  commentoRev;

  prodotto;

  modificata = false;

  patchrow: any;

  prodotti = [];

  listaIva: {
    value: string,
    label: string
  } [] = [];

  costi = [];
  tot = 0;

  costiNoImp = [];
  totNoImp = 0;

  modified = [];

  listaprodotti = [];

  file = [];

  filename = [];


  ngOnInit() {
    this.initForms();
    $('.tooltipped').tooltip();
    this.getProducts();

    console.log(this.data);

    this.ordiniService.getListaIva().subscribe((res: any) => {
      this.listaIva = res.data;
      setTimeout(() => {
        $('select').formSelect();
      }, 10);
    });
  }

  getProducts() {
    this.ordiniService.getProducts().subscribe((res: any) => {
      console.log(res.data);
      this.listaprodotti = res.data;
      for (const prodotti of res.data) {
        this.prodotti.push({label: prodotti.internal_sku, value: prodotti.id});
      }
    });
  }

  OnChange() {
    this.onChange.emit();
  }

  funzioneDiPut(data) {
   this.PatchRaw.emit();
  }

  focusNewRow() {
    this.FocusNewRow.emit();
  }

  addOrdine() {
    console.log(this.data);
    if (this.addordine.productsId !== '' &&
      this.addordine.descr !== '' &&
      this.addordine.delivery_date !== '' &&
      this.addordine.price !== null &&
      this.addordine.price !== 0 &&
      this.addordine.qty !== null &&
      this.addordine.qty !== 0 ) {
      this.AddOrdine.emit();
      this.nuovo = false;
      setTimeout(() => {
        $('select').formSelect();
        $('.tooltipped').tooltip();
      }, 1);
    } else {
      M.toast({html: 'Inserisci tutti i campi'});
    }
  }

  ViewAddORdine() {
    this.nuovo = true;
  }

  deleteOrdine(num, i) {
    if (num === undefined) {
      this.tot = this.tot - this.costi[i];
      this.totNoImp = this.totNoImp - this.costiNoImp[i];
      this.costi.splice(i, 1);
      this.costiNoImp.splice(i, 1);
      this.data.righe.splice(this.data.righe.indexOf(e => e.id === num), 1);
    } else {
      this.DeleteOrdine.emit(num);
    }
  }

  Prodotto(event, action) {
    if (action === 'add') {
      let insertPrice = false;
      this.prodotto = event.name;
      this.addordine.productsId = event.value;
      this.addordine.sku = event.name;
      this.addordine.delivery_date = moment().format('YYYY-MM-DD');
      this.prodottoService.GetProductsById(event.value).subscribe((res: any) => {
        this.addordine.descr = res.data.description;
        this.addordine.qty = 1;
        if (this.idFornitore !== null && this.idFornitore !== undefined) {
          if (res.data.suppliers_price_lists.length > 0) {
            res.data.suppliers_price_lists.forEach((listino) => {
              if (listino.PriceList && listino.PriceList.suppliersId === this.idFornitore) {
                this.addordine.price = listino.price.toFixed(2);
                insertPrice = true;
              }
            });
          } else {
            console.log('else');
            this.addordine.price = res.data.price.toFixed(2);
            insertPrice = true;
          }
        } else {
          console.log('else idfornitore');
          this.addordine.price = res.data.price.toFixed(2);
          insertPrice = true;
        }
        if (insertPrice === false) {
          this.addordine.price = res.data.price.toFixed(2);
        }
        this.addOrdine();
      });
    } else if (action === 'patch') {
      this.patchrow = {sku: event.name, productsId: event.value};
    }
  }


  patchOrdine( id, label, value, i) {
    console.log(this.data);
    this.PatchRaw.emit({value, label, id});

    this.modified[i] = false;
  }

  // funzioni grafiche o per calcoli

  DataPicker() {
    this.addordine.delivery_date = $('#data_cons').val();
  }

  infoProdotto() {
    return this.prodotti;
  }

  totaleParz(qty, price, imposte) {
    const calcolo =  qty * price + qty * price * (imposte / 100);
    return +calcolo.toFixed(2);
  }

  Ins() {
    return +(this.addordine.qty * this.addordine.price).toFixed(2);
  }

  autoIns(riga) {
    return +(this.data.righe[riga].qty * this.data.righe[riga].price).toFixed(2);
  }

  InsNoImp() {
    return +(this.addordine.qty * this.addordine.price).toFixed(2);
  }

  totaleNetto() {
    this.costiNoImp = [];
    this.totNoImp = 0;
    this.data.righe.forEach(x => {
      const calc = x.qty * x.price;
      this.costiNoImp.push(calc.toFixed(2));
      this.totNoImp += calc;
    });
    this.totNoImp += this.InsNoImp();
    return this.totNoImp.toFixed(2);
  }

  totaleLordo() {
    this.costi = [];
    this.tot = 0;
    this.data.righe.forEach(x => {
      const calcolo =  x.qty * x.price;
      this.costi.push(calcolo.toFixed(2));
      this.tot += calcolo;
    });

   this.tot += this.Ins();

    return this.tot.toFixed(2);
  }

  changed(i) {
    this.modified[i] = true;
    $('.tooltipped').tooltip();
  }

  formControlName(abstractControl: AbstractControl, modificata) {
    return  this.utilityService.FormClassValidator(abstractControl, modificata);
  }

  initForms() {
    this.prodottoForm = this.formBuilder.group({
      description: this.utilityService.standardFormControl(true, false),
      internal_sku: this.utilityService.standardFormControl(true, false),
      barcode: this.utilityService.standardFormControl(true, false),
      type: this.utilityService.standardFormControl(true, false),
      price: this.utilityService.standardFormControl(true, false),
      categories: this.utilityService.standardFormControl(true, false)
    });
  }


  buttonSeparation(id) {
    if (id === undefined) {
      return 'col s6';
    } else {
      return 'col s4';
    }
  }

  discardFile(i) {
    this.file.splice(i, 1);

    console.log(this.file);
  }

  // funzioni dei modal

  addProdotto() {
    this.modificata = true;
    const chip = this.chips.nativeElement.textContent.split('close');
    chip.pop();
    this.prodottoForm.controls.categories.setValue(chip);

    if (this.prodottoForm.valid) {
      this.prodottoService.postOrdine(this.prodottoForm.value).subscribe((res: any) => {
        $('#modalProdotto').modal('close');
        this.modificata = false;
        this.getProducts();
      });
    } else {
      M.toast({html: 'Inserisci tutti i campi del prodotto'});
    }
  }

  showModalProdotto(command) {
    this.prodottoForm.enable();
    console.log(command);
    if (command === 'Lista') {
      $('#prodottiModal').modal('open');
      $('#prodottiModal').height($('#tableprodotti').height());
    } else {
      this.prodottoForm.controls.internal_sku.setValue(command.value);
      $('#modalProdotto').modal('open');
    }
  }

  closeModal() {
    $('#prodottiModal').modal('close');
  }

  blurInserimento() {
    console.log('delivery_date', this.addordine.delivery_date);
    console.log('descr', this.addordine.descr);
    console.log('price', this.addordine.price);
    console.log('productsId', this.addordine.productsId);
    console.log('qty', this.addordine.qty);
    console.log('sku', this.addordine.sku);
   if (this.addordine.delivery_date === '' &&
    this.addordine.descr === '' &&
    this.addordine.price === null &&
    this.addordine.productsId === '' &&
    this.addordine.qty === null &&
    this.addordine.sku === '' ) {
     console.log('dentro if');
     this.nuovo = false;
   }
  }

  colorStatus(stato, fields) {
    if ((stato === 'proposed_buyer' || stato === 'edited_buyer')
        && fields) {
      return '#ffff0070 ';
    }

  }
  ShowAllegati(type, idrow?) {
    $('#AllegatiModal').modal('open');
  }


  ShowModalUpload(name) {
    this.idAllegato = name;
    $('#UploadModal').modal('open');
  }

  onFilesAdded(files, type) {
    console.log(files);
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
  onRemove(event) {
    console.log('elemento rimossso');
    this.file.splice(this.file.indexOf(event), 1);
  }
}
