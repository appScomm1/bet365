/*
 * File name: utility.service.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-05-27
 */
import {Injectable} from "@angular/core";
import {AbstractControl, FormControl, Validators} from "@angular/forms";
import {Subject} from "rxjs";

// import {UserProfile} from '@core/authentication/models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  static session: any = localStorage ;
  title;
  Navigation = [];
  recaptcharesponse = null;
  contrattoresponse = null;
  chiave: any = null;
  interval = false;
  generaContr: any = null;
  idContratto: any = null;
  // url: any = "/dashboard/aziende";
  user: any;
  idDerivante = null;


  constructor() {
  }

  standardFormControl(required: boolean = true, disable: boolean = true): FormControl {
    // inizialla i controlers delle form con value vuoto e gia disabilitati.
    // se vuoi il controler abilitato bisogna passargli false come secondo parametro.
    // Passandogli rquired true o false puoi decidere se il campo deve essere obbligatorio o meno.
    return new FormControl({
      value: '',
      disabled: disable
    }, required ? Validators.required : null);
  }

  passwordFormControl(required: boolean = true, minLength: number = 8): FormControl {
    // serve per le password che non possono avere lunghezza minore di 8
    return new FormControl({
      value: '',
      disabled: true
    }, [Validators.minLength(minLength), required ? Validators.required : null]);
  }

  passwordFormControlNotrequired(minLength: number = 8): FormControl {
    // serve per le password che non possono avere lunghezza minore di 8
    return new FormControl({
      value: '',
      disabled: true
    }, Validators.minLength(minLength));
  }

  telephoneFormControl(required: boolean = true, minLength: number = 14, prefix: string = '+39',  disable: boolean = true): FormControl {
    // serve per l'inserimento dei numeri di telefono perchè la loro lunghezza deve essere compresa tra 6 e 12 numeri
    return new FormControl({
      value: prefix,
      disabled: disable
    }, [
      required ? Validators.required : null,
      Validators.minLength(minLength),
      Validators.maxLength(14)
    ]);
  }

  emailFormControl(required: boolean = true): FormControl {
    // Controllo true se ha il formato di un email tipo "aaaa@bbbb"
    return new FormControl({
      value: '',
      disabled: true
    }, [
      required ? Validators.required : null,
      Validators.email
    ]);
  }

  standardFormClassValidator(formControl: AbstractControl) {
    // se il Controller che gli viene passato è stato clickato/toccato e  il controller è ancora invalido ritorna la classe uk-form-danger
    // uk-form-danger = Classe che rende rosso il bordo del contreller
    return {
      // "uk-form-success": formControl.valid,
      'valid invalid': formControl.touched && formControl.invalid
    };
  }
  FormClassValidator(formControl: AbstractControl,  modificata) {
    // se il Controller che gli viene passato è stato clickato/toccato e  il controller è ancora invalido ritorna la classe uk-form-danger
    // oppure ritorna uk-form-danger quando modificata è true e  il controller è ancora invalido
    // uk-form-danger = Classe che rende rosso il bordo del contreller
    return {
      // "uk-form-success": formControl.valid,
      'valid invalid': formControl.touched && formControl.invalid || modificata && formControl.invalid
    };
  }
  confimrPassFormClassValidator(Pass: AbstractControl, Confirm: AbstractControl) {
    // ritorna la classe uk-form-danger quando l'input conferma password è diverso dell'input password
    return {
      // "uk-form-success": formControl.valid,
      'valid invalid': Pass.value !== Confirm.value
    };
  }
  OrariFormClassValidator(precc: AbstractControl, Succ: AbstractControl) {
    // le fascie orario non possono essere minori delle fascie orarie prima
    return {

      'valid invalid': precc.value > Succ.value
    };
  }


}
