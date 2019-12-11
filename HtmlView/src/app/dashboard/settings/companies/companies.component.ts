import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FornitoriService} from '@app/dashboard/fornitori/fornitori.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {UtilityService} from '@app/shared/utility.service';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SettingsService} from '@app/dashboard/settings/settings.service';
import {AziendaListaModel} from '@app/shared/models/db_tables/azienda-lista.model';
import Swal from "sweetalert2";
import {ResizedEvent} from 'angular-resize-event';
import {HeightTabDirective} from '@app/shared/directive/heightTab.directive';
import {addAllToArray} from '@angular/core/src/render3/util';

declare const $: any;

@Component({
  selector: 'settings-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesSettingsComponent implements OnInit, OnChanges {

  constructor( private fornitoriservice: FornitoriService,
               private translate: TranslateService,
               private utilityservice: UtilityService,
               private formBuilder: FormBuilder,
               private activatedRoute: ActivatedRoute,
               private utilityService: UtilityService,
               private settingsService: SettingsService,
               private router: Router) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {

      $('.select').formSelect();
    });

  }

  @ViewChild('div') chips: ElementRef;
  @ViewChild('cap') cap: ElementRef;
  @ViewChild(HeightTabDirective) heightDirective: HeightTabDirective;

  companiesform: FormGroup = null;
  formatform: FormGroup = null;

  company: AziendaListaModel;
  terminiconsegna;
  listaindirizzi: any = [];
  idAzienda;
  currencies = [];
  currency = {
    label: '',
    value: '',
    default: false,
  };
  customCurrencies = [];

  indirizzo = {
    via: '',
    citta: '',
    provincia: '',
    cap: null,
    paese: '',
    description: ''
  };

  modificata = false;
  Disable: boolean;

  tag = [];

  ngOnInit() {
  this.initForms();

  $('.tabs').tabs();
  $('.tooltipped').tooltip();

  this.utilityService.Navigation = [];
  this.settingsService.getCurrentCompany().subscribe((res: any) => {
    this.company = res.data;
    console.log(this.company);
    this.utilityService.Navigation.push({title: this.company.r_sociale, path: '/settings/companies'});
    this.companiesform.patchValue(this.company);
    console.log(this.company.id);
    this.idAzienda = this.company.id;
    console.log(this.idAzienda);
    this.company.attachments_exts.forEach((a: any) => {
      this.tag.push({tag: a});
    });
    console.log(this.companiesform.value);
    this.listaindirizzi = this.company.Addresses;
    console.log(this.listaindirizzi);
    this.getValute(this.company.id);
    $('select').formSelect();

    this.Disable = false;
    }
  );

  this.getTerminiConsegna();
 }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  initForms() {
    this.companiesform = this.formBuilder.group({
      response_term: this.utilityservice.standardFormControl(true, false),
      vat: this.utilityservice.standardFormControl(true, false),
      email: this.utilityservice.standardFormControl(true, false),
      tel: this.utilityservice.standardFormControl(true, false),
      fax: this.utilityservice.standardFormControl(true, false),
      url: this.utilityService.standardFormControl(true, false)
    });

    this.formatform = this.formBuilder.group({
      formats: this.utilityService.standardFormControl(true, false),
    });
  }

  validateFormControl(abstractControl: AbstractControl, modificata): object {
    return this.utilityService.FormClassValidator(abstractControl, modificata);
  }

  getListAddress() {
   console.log(this.idAzienda);
   this.settingsService.getCompanyAddress(this.idAzienda).subscribe((res: any) => {
      this.listaindirizzi = res.data;
      console.log(this.listaindirizzi);
    });
  }

  getTerminiConsegna() {
    this.fornitoriservice.GetDDlterminiConsegna().subscribe((res: any) => {
      this.terminiconsegna = res.data;
      console.log(this.terminiconsegna);
    });
  }

  getValute(id) {
    this.settingsService.getCurrencyList(id).subscribe((res: any) => {
      this.currencies = res.data;
      console.log(this.currencies);
    });
  }

  getCurrencyType(value) {
    if (value === true) {
      return 'disabled';
    }
  }

  ActivateLabel() {
    return 'active';
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

  addIndirizzo() {

    if (this.indirizzo.via !== '' && this.indirizzo.citta !== '' && this.indirizzo.provincia !== ''
      && (this.indirizzo.cap !== null && this.cap.nativeElement.value.length === 5) && this.indirizzo.paese !== '') {
      console.log(this.indirizzo);
      this.settingsService.createCompanyAddress(this.idAzienda, this.indirizzo).subscribe();
      this.getListAddress();
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
  }

  deleteIndirizzo(i, id) {
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

        this.settingsService.deleteCompanyAddress(this.idAzienda, id).subscribe((res) => {
        this.getListAddress();
      });
    }
    });
  }

  UpdateIndirizzo(indirizzo) {
    console.log(this.indirizzo);
    this.settingsService.updateCompanyAddress(this.idAzienda, indirizzo.id, indirizzo).subscribe();
    console.log(this.listaindirizzi);
  }

  addValuta() {
    if (this.currency.label !== '' && this.currency.value !== '') {
      console.log(this.currency);
      this.settingsService.addCurrency(this.idAzienda, this.currency).subscribe();
      this.getValute(this.idAzienda);
      this.currency = {
        label: '',
        value: '',
        default: false,
      };
    }
  }

  deleteValuta(id) {
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
        console.log(id);
        this.settingsService.deleteCurrency(this.idAzienda, id).subscribe();
        this.getValute(this.idAzienda);
        Swal.fire(
          'Eliminata!',
          'La voce del listino è stata eliminata con successo',
          'success'
        );
      }
    });
  }

  updateValuta(id, currency) {
    this.settingsService.updateCurrency(this.idAzienda, id, currency).subscribe();
    this.getValute(this.idAzienda);
  }

  saveSettings() {
    this.modificata = true;

    console.log(this.companiesform.value);
    console.log(this.companiesform.valid);
    if (this.companiesform.valid) {
      const chip = this.chips.nativeElement.textContent.split('close');
      chip.pop();

      const dirtyFields = {};

      for (const control in this.companiesform.controls) {
        console.log(this.companiesform.get(control));
        dirtyFields[control] = this.companiesform.get(control).value;
      }

      dirtyFields['attachments_exts'] = chip;
      console.log(dirtyFields);
      this.settingsService.updateCompany(this.idAzienda, dirtyFields).subscribe();
    }
  }

  cancel() {
    this.getListAddress();
    this.settingsService.getCurrentCompany().subscribe((res: any) => {
      this.company = res.data;
      this.companiesform.patchValue(this.company);
    });
    this.getValute(this.idAzienda);
    this.customCurrencies = [];

    $('select').formSelect();
  }

  onResize(resize: ResizedEvent) {
    console.log('ciao', resize);
    this.heightDirective.setHeight(resize.newHeight);
  }
}

