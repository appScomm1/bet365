import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component, ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {UtilityService} from '@app/shared/utility.service';
import {FormGroup, FormControl, Validators, FormArray, FormArrayName, FormBuilder, AbstractControl} from '@angular/forms';
import {ListinoService} from '@app/dashboard/listino/listino.service';
import {any} from 'codelyzer/util/function';
import {forEach} from '@angular/router/src/utils/collection';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {invalid} from 'moment';
import {debugOutputAstAsTypeScript} from '@angular/compiler';
import {privateEntriesToIndex} from '@angular/compiler-cli/src/metadata/index_writer';
import {ProdottiListaModel} from '@app/shared/models/db_tables/prodotti-lista.model';
import {SuppliersPriceListModel} from '@app/shared/models/db_tables/.suppliers-price-list.model';
import Swal from 'sweetalert2';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {ListiniListaModel} from '@app/shared/models/db_tables/listini-lista.model';

declare const $: any;
declare const  M: any; // usata per i toast

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild('chip') chips: ElementRef;
  @ViewChild('select') select: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private utilityservice: UtilityService,
              private listinoService: ListinoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private utilityService: UtilityService,
              private translate: TranslateService) {
                this.translate.onLangChange
                .subscribe((event: LangChangeEvent) => {
                  this.translate.get('breadcrumbs.catalog.list').subscribe((app: string) => {
                    utilityService.Navigation[this.basePosBreadcrumbs] = {title: app, path: '/list'};
                  });

                  if (!this.prodottoid) {
                    this.translate.get('breadcrumbs.catalog.new').subscribe((app: string) => {
                      utilityService.Navigation[this.posBreadcrumbs] = {title: app, path: '/list/new'};
                    });

                  }
                });
               }

  prodottoForm: FormGroup = null;

  prodotto: ProdottiListaModel; // form di base del prodotto
  appProdotto: ProdottiListaModel;
  modifica = false;
  dettaglio = false;

  appFornitori = [];

  // oggetto per inserimento nuovo listino
  listino = {
    suppliersId: null,
    PriceList: {suppliersId: null},
    min_qty: null,
    price: '',
    lead_time: null
  };

  // id del prodotto
  prodottoid = null;

  categories = [];

  modificata = false;
  modListino = false;
  aziende;
  aggiunto = false;

  InsSupplier = false;
  InsPrice = false;
  InsQty = false;
  InsLead = false;

  validSupp = false;
  validPrice = false;
  validQty = false;
  validLead = false;

  listaListino = [];


  Disable = true;

  posBreadcrumbs;
  basePosBreadcrumbs;

  user;


  ngOnInit() {
    this.user =  this.utilityService.user;
    this.utilityService.Navigation = [];
    this.initForms();
    this.SuppliersList();

    this.translate.get('breadcrumbs.catalog.list').subscribe((app: string) => {
      this.basePosBreadcrumbs = this.utilityService.Navigation.length;
      this.utilityService.Navigation.push({title: app, path: '/list'});
    });

    this.activatedRoute.paramMap.subscribe(
        (paramsMap: ParamMap) => {
          // se l’url ha un id lo inserisce nelle variabile, se questo avviene vuol dire che si sta navigando nella pagina di modifica
          this.prodottoid = +paramsMap.get('id');
          if (this.prodottoid) {
            this.listinoService.GetProductsById(this.prodottoid).subscribe((res: any) => {
              this.prodotto = $.extend(true, {}, res.data);
              this.appProdotto = $.extend(true, {}, this.prodotto);
              this.prodottoForm.patchValue(this.appProdotto);
              this.prodottoForm.disable();

              this.utilityService.Navigation.push({title: res.data.internal_sku, path: '/list/' + res.data.id});

              this.dettaglio = true;
              this.prodotto.categories.forEach((tag: any) => {
                this.categories.push({tag: tag.label});
                console.log(this.prodotto);
              });

              console.log(this.chips.nativeElement.chldren);
              console.log(this.prodottoForm.controls.suppliers_price_lists.value);
              this.listaListino = this.prodottoForm.controls.suppliers_price_lists.value;
              console.log(this.listaListino);
              this.aggiunto = true;
              this.appFornitori = this.listaListino;

              setTimeout(() => {this.selectActivation(); }, 1);
            });
           } else {

            this.translate.get('breadcrumbs.catalog.new').subscribe((app: string) => {
              this.posBreadcrumbs = this.utilityService.Navigation.length;
              this.utilityService.Navigation.push({title: app, path: '/list/new'});
            });
          }
        });
  }

  // lista dei fornitori per la select
  SuppliersList() {
    this.listinoService.companiesRequest().subscribe((res: any) => {
      this.aziende = res.data;
    });
  }

  initForms() {
    this.prodottoForm = this.formBuilder.group({
      description: this.utilityservice.standardFormControl(true, false),
      internal_sku: this.utilityservice.standardFormControl(true, false),
      barcode: this.utilityservice.standardFormControl(false, false),
      type: this.utilityservice.standardFormControl(true, false),
      price: this.utilityservice.standardFormControl(true, false),
      categories: this.utilityservice.standardFormControl(false, false),
      suppliers_price_lists: this.utilityservice.standardFormControl(false, false)
    });
  }

  invio() {
    this.modificata = true;

    this.prodottoForm.controls.suppliers_price_lists.setValue(this.listaListino);
    const chip = this.chips.nativeElement.textContent.split('close');
    chip.pop();
    this.prodottoForm.controls.categories.setValue(chip);

    console.log(this.prodottoForm);


    if (this.prodottoForm.valid) {
        this.listinoService.postOrdine(this.prodottoForm.value).subscribe((res: any) => {
          console.log(this.prodottoForm.value);
          this.router.navigate(['/dashboard/list']);

          this.prodottoForm.reset();
          //this.listaListino = [];

          this.listino = {
            suppliersId: null,
            price: null,
            min_qty: null,
            lead_time: null,
            PriceList: {suppliersId: null}
          };

          this.modificata = false;
          this.modListino = false;
          this.aggiunto = false;

          this.InsSupplier = false;
          this.InsPrice = false;
          this.InsQty = false;
          this.InsLead = false;

          this.validSupp = false;
          this.validPrice = false;
          this.validQty = false;
          this.validLead = false;

          console.log(this.prodottoForm);
        });
    } else {
      if (!this.aggiunto) {
        this.modListino = true;
      }
      M.toast({html: 'Inserisci tutti i campi del prodotto'});
    }
  }

  onChange(supplierID) {
    console.log(supplierID);
    this.listino.PriceList.suppliersId = this.select.nativeElement.options[this.select.nativeElement.selectedIndex].value;
    console.log(this.listino.PriceList.suppliersId);
    $('select').formSelect();
  }

  // controlli sugli input
  formControlName(abstractControl: AbstractControl, modificata) {
    return  this.utilityservice.FormClassValidator(abstractControl, modificata);
  }

  inputControlPrice(data, modListino) {
    if (this.InsPrice) {
      if (data !== 0 && data !== '') {
        this.validPrice = true;
      } else {
        this.validPrice = false;
        return 'valid invalid';
      }
    }
    if (modListino === true && (data === 0 || data === '')) {
      this.validPrice = false;
      return 'valid invalid';
    }
  }

  inputControlQty(data, modListino) {
    if (this.InsQty) {
      if (data !== 0 && data !== '' && data !== null) {
        this.validQty = true;
      } else {
        this.validQty = false;
        return 'valid invalid';
      }
    }
    if (modListino === true && (data === 0 || data === '')) {
      this.validQty = false;
      return 'valid invalid';
    }
  }
  inputControlLead(data, modListino) {
    if (this.InsLead) {
      if (data !== 0 && data !== '' && data !== null) {
        this.validLead = true;
      } else {
        this.validLead = false;
        return 'valid invalid';
      }
    }
    if (modListino === true && (data === 0 || data === '')) {
      this.validLead = false;
      return 'valid invalid';
    }
  }

  inputControlSupp(data, modListino) {
    if (this.InsSupplier) {
      if (data !== '') {
        this.validSupp = true;
      } else {
        this.validSupp = false;
        return 'valid invalid';
      }
    }
    if (modListino === true && (data === 0 || data === '')) {
      this.validSupp = false;
      return 'valid invalid';
    }
  }

  cambio(zone) {
    if (zone === 'supplier') {this.InsSupplier = true; }
    if (zone === 'price') {this.InsPrice = true; }
    if (zone === 'quantity') {this.InsQty = true; }
    if (zone === 'lead_time') {this.InsLead = true; }
  }



  // attivazione e disattivazione parti html
  activateLabel() {
    if (this.dettaglio) {
      return 'active';
    }
  }

  selectActivation() {
  if (this.dettaglio) {
      if (!this.modifica) {
        $('select').prop('disabled', true);
        $('select').formSelect();
      } else {
        $('select').removeAttr('disabled');
        $('select').formSelect();
      }
    }
  }

  buttonActivation() {
    if (this.dettaglio && !this.modifica) {
        return 'disabled';
    }
  }


  // gestione prodotto
  modificaProdotto() {
    this.modifica = true;
    this.Disable = false;
    this.prodottoForm.enable();

    const children = Array.from(this.chips.nativeElement.children);
    console.log(this.chips.nativeElement.children);
    console.log(children);
    children.forEach( (res: any) => { res.disabled = this.Disable; console.log(res.disabled); });
    this.selectActivation();
  }

  patchSend() {
    const chip = this.chips.nativeElement.textContent.split('close');
    chip.pop();
    this.prodottoForm.controls.categories.setValue(chip);
    this.prodottoForm.controls.categories.markAsDirty();
    this.prodottoForm.controls.suppliers_price_lists.setValue(this.listaListino);
    this.prodottoForm.controls.suppliers_price_lists.markAsDirty();
    if (this.prodottoForm.valid && this.aggiunto) {
        const dirtyFields = {};
        for (const control in this.prodottoForm.controls) {
          if (this.prodottoForm.get(control).dirty) {
            dirtyFields[control] = this.prodottoForm.get(control).value;
          }
        }
        this.listinoService.patchOrdine(this.prodottoid, dirtyFields).subscribe((res: any) => {
          this.router.navigate(['/dashboard/list']);
          this.modifica = false;
          this.selectActivation();
          this.prodottoForm.disable();
          this.dettaglio = true;
        });
      } else {
        M.toast({html: 'Inserisci tutti i campi del prodotto'});
      }
  }

  cancel() {
    this.appProdotto = $.extend(true, {}, this.prodotto);
    this.prodottoForm.reset(this.appProdotto);
    this.prodottoForm.disable();

    this.categories = [];
    for (const control in this.chips.nativeElement.children) {
      if (this.chips.nativeElement.children[control].tagName === 'INPUT') {
        this.chips.nativeElement.children[control].value = null;
      }
    }

    this.listinoService.GetProductsById(this.prodottoid).subscribe((res: any) => {
      res.data.categories.forEach((tag: any) => {
        this.categories.push({tag: tag.label});
        console.log(this.categories);
      });
    });

    this.listaListino = this.prodottoForm.controls.suppliers_price_lists.value;
    this.modifica = false;
    this.Disable = true;
    const children = Array.from(this.chips.nativeElement.children);
    children.forEach( (res: any) => res.disabled = this.Disable);
    console.log(this.Disable);
    setTimeout(() => {this.selectActivation(); }, 1);
  }

  clear() {
    this.prodottoForm.reset();
    this.listaListino = [];
    this.listino = {
      suppliersId: null,
      min_qty: null,
      price: '',
      lead_time: null,
      PriceList: {suppliersId: null}
    };

    this.categories = [];
    for (const control in this.chips.nativeElement.children) {
      if (this.chips.nativeElement.children[control].tagName === 'INPUT') {
        this.chips.nativeElement.children[control].value = null;
      }
    }

    this.listinoService.GetProductsById(this.prodottoid).subscribe((res: any) => {
      res.data.categories.forEach((tag: any) => {
        this.categories.push({tag: tag.label});
        console.log(this.categories);
      });
    });
  }

  // gestione listino
  addListino() {
    this.modListino = true;

    console.log(this.listino);
    console.log(this.validSupp);
    console.log(this.validPrice);
    console.log(this.validQty);
    console.log(this.validLead);

    if (this.validSupp === true && this.validQty === true && this.validPrice === true && this.validLead === true) {
      this.listaListino.push(this.listino);
      console.log(this.listaListino);
      this.listino = {
        suppliersId: null,
        price: null,
        min_qty: null,
        lead_time: null,
        PriceList: {suppliersId: null}
      };

      this.InsSupplier = false;
      this.InsPrice = false;
      this.InsQty = false;
      this.InsLead = false;

      this.validSupp = false;
      this.validPrice = false;
      this.validQty = false;
      this.validLead = false;

      $('select').formSelect();

     // this.selectActivation();

      this.aggiunto = true;
    } else {
      M.toast({html: 'Inserisci tutti i campi del listino'});
    }
    this.modListino = false;
  }

  deleteListino(i) {
    if (this.listaListino.length === 1) {
    this.aggiunto = false;
  }
    this.listaListino.splice(i, 1);
  }

  callDeleteListino(i) {
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
        this.listinoService.deleteListino(this.prodottoid, this.listaListino[i].id).subscribe((res: any) => {
          this.listaListino.splice(i, 1);
          if (this.listaListino.length === 0) {
            this.aggiunto = false;
          }
        });
      }
    });
  }

  callAddListino() {
    if (this.validSupp === true && this.validQty === true && this.validPrice === true && this.validLead === true) {
      this.listino.suppliersId = parseInt(this.listino.suppliersId, 10);

      this.validSupp = false;
      this.validPrice = false;
      this.validQty = false;
      this.validLead = false;

      this.listinoService.addListino(this.listino, this.prodottoid).subscribe((res: any) => {
        console.log(this.listino);
        this.listaListino.push(this.listino);

        this.aggiunto = true;

        this.listino = {
          suppliersId: null,
          price: null,
          min_qty: null,
          lead_time: null,
          PriceList: {suppliersId: null},
        };
      });
    } else {
      M.toast({html: 'Inserisci tutti i campi del listino'});
    }
  }

  listinoPatch(i) {
    if (this.listaListino[i].price !== 0 &&
    this.listaListino[i] !== null &&
    this.listaListino[i].min_qty !== 0 &&
    this.listaListino[i].min_qty !== null &&
    this.listaListino[i].supplierId !== null &&
    this.listaListino[i].lead_time !== 0 &&
    this.listaListino[i].lead_time !== null ) {
      this.listinoService.patchListino(this.listaListino[i], this.prodottoid, this.listaListino[i].id).subscribe((res: any) => {
      });
    } else {
      M.toast({html: 'Inserisci tutti i campi del listino'});
    }
  }
  parseValue(id) {
    return parseInt(id, 10);
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
