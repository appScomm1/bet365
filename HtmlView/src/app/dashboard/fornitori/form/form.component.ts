import {
  Component,
  OnInit,
  Output,
  ElementRef,
  ViewChild,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormArrayName,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { EventEmitter } from 'events';
import { FornitoriService } from '../fornitori.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {UtilityService} from '@app/shared/utility.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FornitoriListaModel} from '@app/shared/models/db_tables/fornitori-lista.model';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {DirectiveDef} from '@angular/core/src/render3';
import {ResizedEvent} from 'angular-resize-event';
import {HeightTabDirective} from '@app/shared/directive/heightTab.directive';
import {forEach} from '@angular/router/src/utils/collection';

declare const $: any;
declare const M: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterViewInit, OnChanges {

  @Output() AddFornitori = new EventEmitter();
  @ViewChild('cap') cap: ElementRef;
  @ViewChild('tel') tel: ElementRef;
  @ViewChild('mail') email: ElementRef;
  @ViewChild('div') chips: ElementRef;
  @ViewChild('height') Heightdiv: ElementRef;
  @ViewChild('input') radioButton: ElementRef;
  @ViewChild(HeightTabDirective) heightDirective: HeightTabDirective;

  constructor( private fornitoriservice: FornitoriService,
               private translate: TranslateService,
               private utilityservice: UtilityService,
               private formBuilder: FormBuilder,
               private activatedRoute: ActivatedRoute,
               private utilityService: UtilityService,
               private router: Router) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {

      this.translate.get('breadcrumbs.suppliers.list').subscribe((app: string) => {
        utilityService.Navigation[this.basePosBreadcrumbs] = {title: app, path: '/suppliers'};
      });

      if (!this.supplierid) {
        this.translate.get('breadcrumbs.suppliers.new').subscribe((app: string) => {
          utilityService.Navigation[this.posBreadcrumbs] = {title: app, path: '/suppliers/list'};
        });
      }

      $('.select').formSelect();

      this.translate.get('Suppliers.New.currency').subscribe((app: string) => {
        this.valuta = app;
      });
    });

  }

  modificata = false;

  disableautocomplete = true;

  titleButton = 'Salva';

  fornitoriform: FormGroup = null;

  referenteform: FormGroup = null;

  comunication: string;

  supplierid: number;
  fornitore: FornitoriListaModel;

  updateindirizzi = null;
  updateconti = false;

  email2 = '';

  viewAddIndirizzo = false;
  viewAddConto = false;
  check = 'none';
  dettaglio = false;

  currencies = [];
  terminipagamento;
  terminiresa;

  fornitori = {
    referents: [],
    bank_accounts: {},
    email_type: '',
    notification_level: '',
    tag: [],
    addresses: {},
    email2: '',
    price_list: {
    }
  };

 indirizzo = {
   via: '',
   citta: '',
   provincia: '',
   cap: null,
   paese: '',
   description: ''
 };

 tagRef = [];

 conto = {
   bank_name: '',
   iban: ''
 };

 listafornitori = [];

 listaindirizzi: any = [];

 listaconti: any = [];

 modifica = false;

 app;

 Disable: boolean;

 posBreadcrumbs;
 basePosBreadcrumbs;
 valuta;

 radioButtonActivated = true;

 email2Changed = false;

 user;


  ngOnInit() {
      this.user =  this.utilityService.user;
      this.initForms();
      console.log(this.Heightdiv);
      this.comunication = 'none';

      $('.tabs').tabs();

      $('.tooltipped').tooltip();

      this.utilityService.Navigation = [];
      this.baseBreadcrumbs();

      this.activatedRoute
        .paramMap
          .subscribe(
            (paramsMap: ParamMap) => {
              // se l'url ha un id lo inserisce nelle variabile, se questo avviene vuol dire che si sta navigando nella pagina di modifica
              this.supplierid = +paramsMap.get('id');
              if (this.supplierid) {
                this.fornitoriservice.getSupplierById(this.supplierid).subscribe((res: any) => {
                  this.fornitore = res.data;
                  this.email2 = this.fornitore.email2;
                  console.log("fornitore: ", this.fornitore);
                  console.log(res.data);
                  this.utilityService.Navigation.push({title: this.fornitore.r_sociale, path: '/suppliers/' + this.fornitore.id});
                  this.fornitoriform.patchValue(this.fornitore);
                  console.log(this.fornitoriform.controls);
                  if (this.fornitore.referents.length > 0) {
                    this.referenteform.patchValue(this.fornitore.referents[0]);
                    this.fornitore.referents.forEach((ref: any) => {
                      ref.tags.forEach((tags) => {
                        this.tagRef.push({tag: tags});
                      });
                    });
                  }
                  this.listaindirizzi = this.fornitore.addresses;
                  this.listaconti = this.fornitore.bank_accounts;
                  this.check = this.fornitore.email_type;
                  console.log(this.listaindirizzi);
                  $('select').formSelect(); // da fare nella direttiva
                  this.dettaglio = true;
                  this.Disable = true;
                  this.titleButton = 'Modifica';

                  this.check = this.fornitore.email_type;
                  this.comunication = this.fornitore.notification_level;

                  console.log("check: ", this.check);
                  console.log("comunication: ", this.comunication);
                  console.log("email2: ", this.fornitore.email2);
                });



              } else {
                this.radioButtonActivated = false;
                this.translate.get('breadcrumbs.suppliers.new').subscribe((app: string) => {
                  this.posBreadcrumbs = this.utilityService.Navigation.length;
                  this.utilityService.Navigation.push({title: app, path: '/suppliers/new'});
                });

                this.fornitoriform.enable();
                this.referenteform.enable();
              }

              this.translate.get('Suppliers.New.currency').subscribe((app: string) => {
                this.valuta = app;
              });
            });


      this.fornitoriservice.GetDDlValuta().subscribe((res) => {this.currencies = res.data; console.log(this.currencies); });
      this.fornitoriservice.GetDDlterminiConsegna().subscribe((res) => {
          this.terminiresa = res.data;
          console.log(this.terminiresa);
        });
      this.fornitoriservice.GetDDlTerminiPagamento().subscribe((res) => {
          this.terminipagamento = res.data;
          console.log(this.terminipagamento);
        });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  validateFormControl(abstractControl: AbstractControl, modificata): object {
    return this.utilityService.FormClassValidator(abstractControl, modificata);
  }

  ActivateLabel(dettaglio) {
    if (dettaglio) {
      return 'active';
    }
  }

  ngAfterViewInit(): void {
    $('#autocomplete').autocomplete({
      data: {
        apple: null,
        microsfot: null,
        google: null,
      },
      onSelect: (suggestion) => {
        alert('bella');
      }
    }) ;
  }

  initForms() {
    this.fornitoriform = this.formBuilder.group({
      r_sociale: this.utilityservice.standardFormControl(),
      piva: this.utilityservice.standardFormControl(),
      indirizzo_consegna: this.utilityservice.standardFormControl(),
      tel: this.utilityservice.telephoneFormControl(true, 10, '', true),
      email: this.utilityservice.emailFormControl(),
      website: this.utilityservice.standardFormControl(),
      delivery_term: this.utilityservice.standardFormControl(),
      payment_term: this.utilityservice.standardFormControl(),
      currency: this.utilityservice.standardFormControl(),
      fax: this.utilityService.standardFormControl(false, true),
  });

    this.referenteform = this.formBuilder.group({
      first_name: this.utilityservice.standardFormControl(),
      last_name: this.utilityservice.standardFormControl(),
      email: this.utilityservice.emailFormControl(),
      tags: this.utilityservice.standardFormControl(false),
    });

  }

  checklength(maxlength) {
    console.log(this.cap.nativeElement.value.length);
    console.log(maxlength);

    if (maxlength === 5) {
      if (this.cap.nativeElement.value.length > 5) {
        this.cap.nativeElement.value = this.cap.nativeElement.value.slice(0, 5);
      }
    }
  }

  addFornitori(option) {
    this.modificata = true;

    console.log("email2: ", this.email2);
    console.log("fornitore: ", this.fornitoriform.get('email').value);
    console.log("referente: ", this.referenteform.get('email').value);

    if (this.titleButton === 'Modifica') {
      this.fornitoriform.enable();
      this.referenteform.enable();
      this.Disable = false;
      this.radioButtonActivated = false;
      const children = Array.from(this.chips.nativeElement.children);
      children.forEach( (res: any) => res.disabled = this.Disable);
      this.titleButton = 'Salva';
      $('select').formSelect();
      this.disableautocomplete = false;
      this.modifica = true;

    } else {

      if (this.fornitoriform.valid && this.comunication !== '') {

        if (this.dettaglio) {
          // modifica
          const dirtyFields = {};
          const dirtyFieldsRef = {};
          const currency = {
            currency: this.fornitoriform.controls.currency.value
          };
          if (currency.currency !== 'none') {
            dirtyFields['price_list'] = currency;
          }

          console.log(this.referenteform);
          for (const control in this.fornitoriform.controls) {
            console.log(this.fornitoriform.get(control));
            if (this.fornitoriform.get(control).dirty) {
              console.log(this.fornitoriform.get(control));
              dirtyFields[control] = this.fornitoriform.get(control).value;
            }
          }

          if (this.email2Changed) {
            dirtyFields['email_type'] = this.check;
            dirtyFields['notification_level'] = this.comunication;

            if (this.check === 'none') {
              dirtyFields['email2'] = null;
            }

            console.log("email2: ", this.fornitori.email2);

            if (this.comunication === 'secondary_mail') {
              dirtyFields['email2'] = this.email2;
            }

            if (this.comunication === 'main_mail') {
              dirtyFields['email2'] = this.fornitoriform.get('email').value;
            }

            if (this.comunication === 'referent_mail') {
              dirtyFields['email2'] = this.referenteform.get('email').value;
            }
          }

          const chip = this.chips.nativeElement.textContent.split('close');
          chip.pop();

          console.log("dirty fields: ", dirtyFields);

          for (const control in this.referenteform.controls) {
            // if (this.referenteform.get(control).dirty) {
              console.log(this.referenteform.get(control));
              dirtyFieldsRef[control] = this.referenteform.get(control).value;
            // }
          }
          console.log(dirtyFieldsRef);
          dirtyFieldsRef['tags'] = chip;
          if (Object.keys(dirtyFieldsRef).length > 0) {
            dirtyFields['referents'] = [dirtyFieldsRef];
          }

          console.log("dirty: ", dirtyFields);
          console.log(this.fornitore.referents[0].id);
          console.log(this.supplierid);
          this.fornitoriservice.UpdateReferents(dirtyFieldsRef, this.supplierid, this.fornitore.referents[0].id).subscribe();
          this.fornitoriservice.UpdateSupplier(dirtyFields, this.supplierid).subscribe((res) => {
            // this.fornitore = res.data;
            this.fornitoriform.disable();
            this.referenteform.disable();
            $('select').formSelect(); // da fare nella direttiva
            this.titleButton = 'Modifica';
            this.disableautocomplete = true;
            this.radioButtonActivated = true;

          });
        } else {

          // inserimento
          const currency = {
            currency: this.fornitoriform.controls.currency.value
          };
          this.fornitori = this.fornitoriform.value;
          this.fornitori.referents = [];
          this.fornitori.referents.push(this.referenteform.value);
          this.fornitori.bank_accounts = this.listaconti;
          this.fornitori.price_list = currency;

          const chip = this.chips.nativeElement.textContent.split('close');
          chip.pop();
          console.log("chip: ", chip);
          this.fornitori.referents[0].tags = chip;
          console.log("fornitori: ", this.fornitori);

          /*
          if (this.check !== 'none') {
            if (this.comunication !== 'none') {
              this.fornitori.email_type = this.check;
            }
            this.fornitori.notification_level = this.comunication;
            if (this.comunication === 'secondary_mail') {
              this.fornitori.email2 = this.email.nativeElement.value;
            }
          }
*/
          this.fornitori.email_type = this.check;
          this.fornitori.notification_level = this.comunication;


          if (this.check === 'none') {
              this.fornitori.email2 = null;
            }

          console.log("email2: ", this.fornitori.email2);

          if (this.comunication === 'secondary_mail') {
            this.fornitori.email2 = this.email2;
            }

          if (this.comunication === 'main_mail') {
            this.fornitori.email2 = this.fornitoriform.get('email').value;
            }

          if (this.comunication === 'referent_mail') {
            this.fornitori.email2 = this.referenteform.get('email').value;
            }


          this.fornitori.addresses = this.listaindirizzi;

          console.log(this.fornitori);
          console.log("check: ", this.fornitori.email_type);
          console.log("comunication: ", this.fornitori.notification_level);
          console.log("email2: ", this.fornitori.email2);
          console.log("referenteMail: ", this.referenteform.controls.email.value);
          console.log("fornitoriMail: ", this.fornitoriform.controls.email.value);

          if (this.referenteform.controls.email.value !== '') {
            if (this.referenteform.controls.email.valid) {
              if (option === 'nuovo') {
                this.clean();
                this.fornitoriservice.CreateSupplier(this.fornitori).subscribe((res) => {
                  this.router.navigate(['/dashboard/suppliers']);
                  this.radioButtonActivated = true;
                });
              } else {
                this.fornitoriservice.CreateSupplier(this.fornitori).subscribe((res) => {
                  this.router.navigate(['/dashboard/suppliers']);
                  this.radioButtonActivated = true;
                });
              }
            } else {
              M.toast({html: 'Email referente non valida'});
            }
          } else {
            if (option === 'nuovo') {
              this.clean();
              this.fornitoriservice.CreateSupplier(this.fornitori).subscribe((res) => {
                this.router.navigate(['/dashboard/suppliers']);
                this.radioButtonActivated = true;
              });
            } else {
              this.fornitoriservice.CreateSupplier(this.fornitori).subscribe((res) => {
                this.router.navigate(['/dashboard/suppliers']);
                this.radioButtonActivated = true;
              });
            }
          }
        }

      } else {
        M.toast({html: 'Compila tutti i campi'});
      }

      this.fornitori = {
        referents: [],
        bank_accounts: {},
        email_type: '',
        notification_level: '',
        tag: [],
        addresses: {},
        email2: '',
        price_list: {
        }
      };


    }
  }

  AnnullaModifche() {
    this.fornitoriservice.getSupplierById(this.supplierid).subscribe((res: any) => {
      this.listaindirizzi = res.data.addresses;
    });
    this.fornitoriservice.getSupplierById(this.supplierid).subscribe((res: any) => {
      this.listaconti = res.data.bank_accounts;
    });
    this.fornitoriservice.getSupplierById(this.supplierid).subscribe((res: any) => {
      this.check = res.data.email_type;
    });

    const children = Array.from(this.chips.nativeElement.children);

    console.log(this.fornitore);
    this.fornitoriform.patchValue(this.fornitore);
    console.log(this.fornitore.referents[0]);
    this.referenteform.patchValue(this.fornitore.referents[0]);

    for (const control in children) {
      if (this.chips.nativeElement.children[control].tagName === 'INPUT') {
        this.chips.nativeElement.children[control].value = null;
      }
    }

    this.tagRef = [];
    this.fornitore.referents.forEach((ref: any) => {
      ref.tags.forEach((tags) => {
        this.tagRef.push({tag: tags});
      });
      console.log(this.tagRef);
    });

    this.titleButton = 'Modifica';
    this.disableautocomplete = true;
    this.Disable = true;

    children.forEach( (res: any) => res.disabled = this.Disable);
    console.log(this.Disable);
    this.modifica = false;
    this.fornitoriform.disable();
    this.referenteform.disable();
    $('select').formSelect();

    this.radioButtonActivated = true;
  }

  clean() {
    $('select').formSelect();
    this.fornitoriform.reset();
    this.referenteform.reset();
    this.listaconti = [];
    this.listaindirizzi = [];
    this.check = 'none';

    const children = {} = Array.from(this.chips.nativeElement.children);
    console.log(this.chips.nativeElement.childNodes);
    console.log(children);
    for ( const control in children) {
      if (this.chips.nativeElement.children[control].tagName === 'INPUT') {
        this.chips.nativeElement.children[control].value = null;
      }
    }

    this.tagRef = [];
    // $('.chips').chips();
    this.check = 'none';
  }

  addIndirizzo() {

    if (this.indirizzo.via !== '' && this.indirizzo.citta !== '' && this.indirizzo.provincia !== ''
      && (this.indirizzo.cap !== null && this.cap.nativeElement.value.length === 5) && this.indirizzo.paese !== '') {
      if (this.dettaglio) {
        this.fornitoriservice.CreateAddress(this.indirizzo, this.supplierid).subscribe((res) => {
          this.getListAddres();
        });
      } else {
        this.listaindirizzi.push(this.indirizzo);
      }
      console.log(this.listaindirizzi);

      this.indirizzo = {
        via: '',
        citta: '',
        provincia: '',
        cap: null,
        paese: '',
        description: ''
      };

      this.viewAddIndirizzo = false;
    } else {
      console.log('enafcvladskm');
    }
  }

  deleteIndirizzo(i, id) {

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

        this.fornitoriservice.DeleteAddress(this.supplierid, id).subscribe((res) => {
          this.getListAddres();
        });
      }
      });
  }

  UpdateIndirizzo(indirizzo) {
    this.fornitoriservice.UpdateAddress(indirizzo, this.supplierid, indirizzo.id).subscribe((res) => {});
  }

  getListAddres() {
    this.fornitoriservice.GetListAddress(this.supplierid).subscribe((ris) => {
      this.listaindirizzi = ris.data;
    });
  }

  addConto() {
    if (this.conto.bank_name !== '' && this.conto.iban !== '' ) {
      if (this.dettaglio) {
        this.fornitoriservice.CreateBank(this.conto, this.supplierid).subscribe((res) => {
          this.getListBank();
        });
      } else {
        this.listaconti.push(this.conto);
      }

      this.conto = {
        iban: '',
        bank_name: ''
      };

      this.viewAddConto = false;
    }
  }

  deleteConto(id) {

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

        this.fornitoriservice.DeleteBank(this.supplierid, id).subscribe((res) => {
          this.getListBank();
        });
      }
    });
  }

  UpdateConto(Conto) {
    this.fornitoriservice.Updatebank(Conto, this.supplierid, Conto.id).subscribe((res) => {
      this.getListBank();
      this.updateconti = false;
    });
  }

  getListBank() {
    this.fornitoriservice.GetListBank(this.supplierid).subscribe((ris) => {
      this.listaconti = ris.data;
    });
  }

// Funzione per autocomplete
  Termini(event, type) {
    if (type === 'currency') {
      this.fornitoriform.controls.currency.setValue(event.value);
      console.log('ciao', event);
    }
  }

  buttonActivation() {
    if (this.dettaglio) {
      if (!this.modifica) {
        return 'disabled';
      }
    }
  }

  onResize(resize: ResizedEvent) {
    console.log('ciao', resize);
    this.heightDirective.setHeight(resize.newHeight);
  }

  baseBreadcrumbs() {
    this.translate.get('breadcrumbs.suppliers.list').subscribe((app: string) => {
      this.basePosBreadcrumbs = this.utilityService.Navigation.length;
      this.utilityService.Navigation.push({title: app, path: '/suppliers'});
    });
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

  titleButtonControl() {
    if (this.titleButton === 'Modifica' && this.checkPermission('suppliers:update')) {
      return true;
    }
    if (this.titleButton === 'Salva' && this.checkPermission('suppliers:update')) {
      return true;
    }

    return false;
  }
}
