import {Component, OnInit, ViewChild, ElementRef, NgZone, OnChanges, SimpleChanges} from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute, RouterStateSnapshot, ParamMap} from '@angular/router';
import {UtilityService} from '@app/shared/utility.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import {UtentiService} from '@app/dashboard/utenti/utenti.service';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { validate } from 'email-validator';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ChecklistModule } from 'angular-checklist';

declare const  M: any; // usata per i toast
declare const $: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild('dropzone') drop: ElementRef;

  dettaglio = false;
  modifica = false;
  modificata = false;
  passCorretta = false;

  password = {
    pass: '',
    conf_pass: ''
  };

  utenteForm: FormGroup = null;
  passForm: FormGroup = null;

  userId;
  appUtente;
  posBreadcrumbs;
  basePosBradcrumbs;
  utente;
  img;
  languages;

  permissionGroup;
  userPermission = [];
  label = false;

  options =  {
    onCloseEnd: () => {
      console.log(this.utenteForm.get('password').value);
      if (this.passForm.get('oldPass').value !== this.passForm.get('pass').value && this.passForm.valid) {
        this.utenteForm.controls.password.setValue(this.passForm.get('pass').value);
      } else {
        M.toast({html: 'Password non valida'});
      }
      console.log(this.utenteForm.value);
    }
  };

  user;

  constructor(private formBuilder: FormBuilder,
              private utilityservice: UtilityService,
              private utentiService: UtentiService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private translate: TranslateService,
              private ngxDropZone: NgxDropzoneModule,
              private checkListModule: ChecklistModule) {
                this.translate.onLangChange
                .subscribe((event: LangChangeEvent) => {
                  this.translate.get('breadcrumbs.users.list').subscribe((app: string) => {
                    utilityservice.Navigation[this.basePosBradcrumbs] = {title: app, path: '/users'};
                  });
                  if (!this.userId) {
                    this.translate.get('breadcrumbs.users.form').subscribe((app: string) => {
                      utilityservice.Navigation[this.posBreadcrumbs] = {title: app, path: '/users/new'};
                    });
                  }
                });
              }

  ngOnInit(): void {
    this.user =  this.utilityservice.user;

    this.utentiService.DDLPermissions().subscribe((res: any) => {
              console.log('res: ', res);
              this.permissionGroup = res.data;
            });


    $('select').formSelect();

    this.utilityservice.Navigation = [];
    this.translate.get('breadcrumbs.users.list').subscribe((app: string) => {
      this.basePosBradcrumbs = this.utilityservice.Navigation.length;
      this.utilityservice.Navigation.push({title: app, path: '/users'});
    });



    this.activatedRoute.paramMap.subscribe(
      (paramsMap: ParamMap) => {
        // se l’url ha un id lo inserisce nelle variabile, se questo avviene vuol dire che si sta navigando nella pagina di modifica
        this.userId = +paramsMap.get('id');
        if (this.userId) {
          this.dettaglio = true;
          this.InitForms();
          this.utentiService.GetUser(this.userId).subscribe((res: any) => {
            this.utenteForm.patchValue(res.data);
            this.utenteForm.disable();
            this.label = true;
            const app = this.utenteForm.controls.first_name.value + ' ' + this.utenteForm.controls.last_name.value;
            this.utilityservice.Navigation.push({title: app, path: '/users/' + this.userId});
            this.selectActivation();
            this.utente = res.data;
            this.userPermission = this.utente.permissions;
          });
         } else {
          this.InitForms();
          this.translate.get('breadcrumbs.users.form').subscribe((app: string) => {
            this.posBreadcrumbs = this.utilityservice.Navigation.length;
            this.utilityservice.Navigation.push({title: app, path: '/users/new'});
          });
        }
      });

    this.utentiService.DDLLingue().subscribe((l: any) => {
      console.log(l);
      this.languages = l;
      console.log(this.languages);
    });
  }

  InitForms() {
    if (!this.dettaglio) {
    this.utenteForm = this.formBuilder.group({
      first_name: this.utilityservice.standardFormControl(true, false),
      last_name: this.utilityservice.standardFormControl(true, false),
      group: this.utilityservice.standardFormControl(true, false),
      email: this.utilityservice.standardFormControl(true, false),
      lang: this.utilityservice.standardFormControl(true, false),
      password: this.utilityservice.standardFormControl(true, false),
      confPass: this.utilityservice.standardFormControl(true, false),
      permissions: this.utilityservice.standardFormControl(true, false)
    });
    } else  {
      this.utenteForm = this.formBuilder.group({
        first_name: this.utilityservice.standardFormControl(true, false),
        last_name: this.utilityservice.standardFormControl(true, false),
        group: this.utilityservice.standardFormControl(true, false),
        email: this.utilityservice.standardFormControl(true, false),
        lang: this.utilityservice.standardFormControl(true, false),
        password: this.utilityservice.standardFormControl(true, false),
        confPass: this.utilityservice.standardFormControl(false, false),
        permissions: this.utilityservice.standardFormControl(false, false)
      });
    }

    this.passForm = this.formBuilder.group({
      oldPass: this.utilityservice.standardFormControl(true, false),
      pass: this.utilityservice.standardFormControl(true, false),
      confPass: this.utilityservice.standardFormControl(true, false),
    });
  }

  invio() {
    console.log("valori: ", this.utenteForm.value);
    console.log("PassCorretta: ", this.passCorretta);
    console.log("password: ", this.password.pass);

    this.utenteForm.controls.permissions.setValue(this.userPermission);

    if (this.utenteForm.valid) {

      this.utentiService.NewUser(this.utenteForm.value).subscribe((res: any) => {
          console.log(this.utenteForm.value);
          this.router.navigate(['/dashboard/users']);

          this.utenteForm.reset();
          this.selectActivation();
        });
    } else {
      console.log('PassCorretta: ', this.passCorretta);
      console.log('INvalid ', this.utenteForm);
      M.toast({html: 'Inserisci tutti i campi del utente'});
    }
  }

  modificaUtente() {
    this.modifica = true;
    this.utenteForm.enable();
    this.selectActivation();
  }

  cancel() {
    this.modifica = false;
    this.utenteForm.reset(this.utente);
    this.selectActivation();
    this.utenteForm.disable();
    this.activateLabel();
  }

  patchSend() {

    console.log("valori: ", this.utenteForm.value);
    console.log(this.utenteForm.valid);
    if (this.utenteForm.valid) {

      console.log(this.utenteForm);
      const dirtyValues = {};

      for (const control in this.utenteForm.controls) {
      if (this.utenteForm.get(control).dirty) {
        dirtyValues[control] = this.utenteForm.get(control).value;
      }
    }

      dirtyValues["permissions"] = this.userPermission;

      console.log("dirtyValues: ", dirtyValues);

      //const formData = new FormData();
      //formData.append('file', this.img);

      //this.utentiService.UploadProfilePic(this.userId, formData).subscribe();

      this.utentiService.UpdateUser(this.userId, dirtyValues).subscribe((res: any) => {
      this.router.navigate(['/dashboard/users/' + this.userId]);

      this.modifica = false;
      this.utenteForm.disable();
      this.selectActivation();
    });
    } else {
      console.log('PassCorretta: ', this.passCorretta);
      console.log('INvalid ', this.utenteForm);
      M.toast({html: 'Inserisci tutti i campi del utente'});
    }
  }

  formDataControl(pass, modificata) {
    return  this.utilityservice.FormClassValidator(pass, modificata);
  }

  PassControl(abstractControl: AbstractControl, conf: AbstractControl) {
    return this.utilityservice.confimrPassFormClassValidator(abstractControl, conf);
    /*
    if (abstractControl.touched && conf.touched) {
      if (app2['valid invalid'] === true || abstractControl.value.length < 8) {
      return 'invalid';
      this.passCorretta = false;
      } else {
        this.passCorretta = true;
      }
    } else {
      this.passCorretta = false;
    }
    */
  }

  activateLabel() {
    if (this.label) {
      return 'active';
    }
  }

  clear() {
    this.utenteForm.reset();
    this.selectActivation();
    this.userPermission = [];
    $('select').formSelect();
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

  onSelect(event) {
    console.log('aaaaaaaaaaaaaaaaa');
    console.log(event);
    this.img = event.addedFiles;
    console.log(this.img);
  }

  onRemove(event) {
    console.log('elemento rimossso');
    this.img.splice(this.img.indexOf(event), 1);
  }

  ShowModalUpload() {
    $('#PassModal').modal('open');
  }

  ShowModalPerm() {
    $('#permissionModal').modal('open');
  }
  DismissPerm() {
    $('#permissionModal').modal('close');
  }

  addDependencies(perm) {
    console.log('perm: ', perm);

    const checked = this.userPermission.find((element) => {
      return element === perm.value;
    });

    if (!checked) {
      perm.dependencies.forEach(element => {

      const exist = this.userPermission.find((el) => {
        return el === element;
      });

      if (exist === undefined) {
        this.userPermission.push(element);
      }
    });
    }
    console.log(this.userPermission);
  }


  selectAll() {
    const arrayApp = [];
    this.userPermission = [];

    this.permissionGroup.forEach(element => {
      element.permissions.forEach(elem => {
          arrayApp.push(elem.value);
      });
    });

    this.userPermission = arrayApp;
  }

  unselectAll() {
    this.userPermission = [];
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

  resetPassword() {

      this.utentiService.ResetMail(this.utenteForm.controls.email.value)
        .subscribe((res: any) => {}, (err) => {
          M.toast({html: err.error.errors});
      });
    }
}
