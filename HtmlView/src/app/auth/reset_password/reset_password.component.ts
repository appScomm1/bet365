import { Component, OnInit, ErrorHandler } from '@angular/core';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import * as EmailValidator from 'email-validator';
import {_document, errorHandler} from '@angular/platform-browser/src/browser';
import {astToTypescript} from '@angular/compiler-cli/src/ngtsc/typecheck/src/expression';
import {AuthenticationService} from '@app/auth/login/login.service';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {promise} from 'selenium-webdriver';
import when = promise.when;
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UtilityService} from '@app/shared/utility.service';
import {TranslateService} from '@ngx-translate/core';
declare const  M: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset_password.component.html',
  styleUrls: ['./reset_password.component.scss'],
})


// tslint:disable-next-line:class-name
export class Reset_passwordComponent implements OnInit {
  continua = false;
  mail;
  suppliers = null;
  loading = false;
  completato = false;
  error = false;

  token;
  nuovaPass = false;

  start;
  end;

  info = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  };

  confPass;

  constructor(private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private utilityService: UtilityService,
              private router: Router,
              private translate: TranslateService ) { }

  ngOnInit() {
    $('.generic-ddl').dropdown({inDuration: 300,
      outDuration: 225,
      constrainWidth: true,
      hover: false,
      gutter: 0,
      // coverTrigger: false,
      alignment: 'left'
    });

    this.activatedRoute
    .paramMap
      .subscribe(
        (paramsMap: ParamMap) => {
          this.token = paramsMap.get('token');
          console.log(this.token);
          if (this.token) {
            this.nuovaPass = true;
            this.authenticationService.UserInfo(this.token).subscribe((res: any) => {
              this.info.last_name = res.data.last_name;
              this.info.first_name = res.data.first_name;
              this.info.email = res.data.email;
            });
          }
        });
  }

  reset() {
    if (EmailValidator.validate(this.mail)) {
        this.continua = true;
        this.completato = false;

        console.log(this.mail);

        this.authenticationService.ResetMail(this.mail)
          .subscribe((res: any) => {
            setTimeout(() => {
              this.completato = true; }, 1500);

        }, (err) => {
          setTimeout(() => {
            this.error = true;
            console.log(err);
            M.toast({html: err.error.errors}); }, 1500);
        });
      } else {
        M.toast({html: '<i class="material-icons dp48 left" style="color: red;">new_releases</i>' +
            '<p style="color: red">Inserisci una mail valida</p>', classes: 'rounded'});
      }
    }

    indietro() {
      this.continua = false;
      this.completato = false;
      this.error = false;
      this.mail = '';
    }

    patchPass() {
      console.log(this.info.password);
      console.log(this.confPass);
      console.log("info: ", this.info);
      if (this.info.password === this.confPass && this.info.password.length >= 8) {
        this.authenticationService.UserInfo(this.token, this.info).subscribe((res: any) => {
          this.router.navigate(['/login']);
       });
      } else {
        M.toast({html: 'Le due password non coincidono'});
      }
    }

    useLang(lang: string) {
      this.translate.use(lang);
    }
  }



