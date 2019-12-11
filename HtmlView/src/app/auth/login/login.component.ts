import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '@app/auth/login/login.service';
import {Router} from '@angular/router';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import { TranslateModule } from "@ngx-translate/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormArrayName,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import {UtilityService} from "@app/shared/utility.service";

declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email;
  password;
  suppliers;
  dati = { password: '', email: '', session: false};

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private translate: TranslateService,
              private formBuilder: FormBuilder,
              private translateModule: TranslateModule,
              private utilityService: UtilityService) {
                translate.onLangChange.subscribe((event: LangChangeEvent) => {
                  this.translate.use(event.lang);
                  $('.select').formSelect();
                });
               }

  ngOnInit() {
  }
  loginDataSend() {
    this.dati.email = this.email;
    this.dati.password = this.password;

    console.log(this.dati);
    this.authenticationService.Login(this.dati).subscribe((res: any) => {
      console.log("loggato");
      console.log("login: ", res);
      this.suppliers = res;
      this.utilityService.user = res;
      this.router.navigate(['/dashboard/statistics']);
    });
  }

  changeKeepLogin() {
    this.dati.session = this.dati.session === false;
  }
}

