import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

declare const moment: any;
declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  optionsModal = {
    inDuration: 0,
    outDuration: 0
  };

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {

    // Moment
    moment.locale('it');
    moment.defaultFormat = 'DD/MM/YYYY HH:mm';

    // Translate
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('it');
    this.translate.use('it');
  }

  public ngOnInit() {

    // Se sono fuori dalla dashboard setto la classe del body adatta
    this.router.events.subscribe(() => {
      if ( this.router.url.indexOf('dashboard') === -1 && this.router.url.indexOf('public') === -1 ) {
        $('body').addClass('login-bg blank-page blank-page');
      } else {
        $('body').removeClass('login-bg blank-page blank-page');
        if (this.router.url.indexOf('public') !== -1) {
          $('body').addClass('public');
        }
      }
    });
  }
}
