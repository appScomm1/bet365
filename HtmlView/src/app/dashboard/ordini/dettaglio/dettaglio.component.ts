import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { OrdiniService } from '../ordini.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { MzTooltipModule } from 'ngx-materialize';
import {AbstractControl, FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {UtilityService} from '@app/shared/utility.service';
import Swal from "sweetalert2";

declare const $: any;
declare const M: any;

@Component({
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.component.html',
  styleUrls: ['./dettaglio.component.scss']
})
export class DettaglioComponent implements OnInit {
  // in alcune input vengono cambiate le opzioni del ngmodel ( [ngModelOptions]="{updateOn: 'blur'}" tramite questa riga),
  // questa opzione serve per far si che l'ngmodel viene aggiornato solo quando si esce dal focus dell'input
  // l'evento ngModalChange viene richiamato quando l'ngmodel viene cambiato

  data;
  rowData = [];
  rows = {
    righe: []
  };

  ordineDetail: FormGroup = null;
  disable = true;
  pendingrow = false; // boolean per salvataggio di una nuova riga, true se la nuova riga non è salvata
  isPublic = false; // false se è cliente, true se fornitore
  addordine = {
    id: null,
    ordersId: null,
    productsId: null,
    sku: '',
    qty: null,
    price: null,
    descr: '',
    delivery_date: '',
    vat: null
  };
  reverseOrders = [];
  ordineId = null;
  icon = 'check';
  text = 'nessuna modifica in corso';

  app;

  constructor(
    private router: Router,
    private ordiniService: OrdiniService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
  ) { }
  ngOnInit() {

    this.initForm();

    $('.tooltipped').tooltip();

    this.rowData = [];
    this.data = null;
    this. rows = {
      righe: []
    };

    this.activatedRoute.paramMap.subscribe(
      (paramsMap: ParamMap) => {
        this.ordineId = +paramsMap.get('id');

        this.getRowsData();

        this.GetReverseOrder();
      });

    this.isPublic = this.router.url.indexOf('public') !== -1;

  }

  GetReverseOrder() {
    this.ordiniService.getReverseOrders(this.ordineId).subscribe((res: any) => {
      this.reverseOrders = res.data;
    });
  }

  initForm() {
    this.ordineDetail = this.formBuilder.group({
      code: this.utilityService.standardFormControl(),
      supplier: this.utilityService.standardFormControl(),
      emit_date: this.utilityService.standardFormControl(),
    });
  }

  modifica() {
    this.disable = false;
    this.elementsActivation();
  }

  AddOrdine() {
    // salvataggio da questo component
    this.ordiniService.CreateRows(this.ordineId, this.addordine).subscribe((res) => {
      this.getRowsData();
      this.addordine = {
        id: null,
        ordersId: null,
        productsId: null,
        sku: '',
        qty: null,
        price: null,
        descr: '',
        delivery_date: '',
        vat: null
      };
    });
  }


   focusNewRow() {
    // cambio icon al buttone di salvataggio
    this.pendingrow = true;
    this.icon = 'warning';
    this.text = 'modifiche non salvate';
  }

  OnChange() {
    this.icon = 'warning';
    this.text = 'modifiche non salvate';
  }

  funzioneDiPut() {

    this.icon = 'load';
    this.text = 'modifiche in aggiornamento';

    this.ordiniService.putOrdine(this.addordine, this.ordineId).subscribe(() => {
        setTimeout(() => {
        if (this.icon === 'load') {
          this.icon = 'check';
          this.text = 'nessuna modifica in corso';
        }
      }, 2000);
      });


  }
 Save() {
    if (this.pendingrow === true) {
      this.AddOrdine();
    } else {
      this.funzioneDiPut();
    }
 }
 Salva() {
    this.disable = true;
    this.ordineDetail.disable();
    this.elementsActivation();

    console.log(this.ordineDetail.dirty);
    if (this.ordineDetail.dirty) {
     this.ordiniService.UpdateOrders(this.ordineId, this.ordineDetail.value).subscribe(() => {});
   }
 }
 back() {
    window.history.back();
 }

  validateFormControl(abstractControl: AbstractControl): object {
    return this.utilityService.standardFormClassValidator(abstractControl);
  }

  elementsActivation() {
    if (this.disable) {
        $('select').prop('disabled', true);
        $('select').formSelect();
        $('.datepicker').prop('disabled', true);
      } else {
        $('select').removeAttr('disabled');
        $('select').formSelect();
        $('.datepicker').removeAttr('disabled');
      }
  }

  deleteOrdine(id) {
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

        this.ordiniService.DeleteRows(this.ordineId, id).subscribe(() => {
          setTimeout(() => {
            if (this.icon === 'load') {
              this.icon = 'check';
              this.text = 'nessuna modifica in corso';
            }
          }, 3000);
          this.getRowsData();
        });
      }
    });
  }

  getRowsData() {

    this.ordiniService.getOrdine(this.ordineId)
      .subscribe((res: any) => {
        this.data = res.data;
        // this.ordineDetail.patchValue(res.data);
        this.ordineDetail.controls.supplier.setValue(this.data.supplier.r_sociale);
        this.ordineDetail.controls.code.setValue(this.data.code);
        this.ordineDetail.controls.emit_date.setValue(this.data.emit_date.substring(0, 10));
        this.rowData = this.data.rows;
        this.rows.righe = this.rowData;
        M.updateTextFields();
        this.utilityService.Navigation.push({title: this.data.code, path: '/orders/' + this.data.id});
        setTimeout(() => {this.elementsActivation(); }, 1);
      });
  }

  DataPicker() {
    // prende il valore del datapicker
    this.ordineDetail.controls.emit_date.setValue($('#data').val());
    this.ordineDetail.markAsDirty();
  }

  patchRow(data) {
    // Modifica di una riga chiamata dal tablerowcomponent
    const patch = {};
    patch[data.label] = data.value;
    this.ordiniService.UpdateRows(this.ordineId, data.id, patch).subscribe((res) => {
      console.log(res);
      /* per bottone interrativo commentato
      setTimeout(() => {
      if (this.icon === 'load') {
        this.icon = 'check';
        this.text = 'nessuna modifica in corso';
      }
    }, 3000);*/
    });
  }
}
