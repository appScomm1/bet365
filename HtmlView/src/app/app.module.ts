import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { OrdiniModule } from './dashboard/ordini/ordini.module';
import { StatisticheModule } from './dashboard/statistiche/statistiche.module';
import { FornitoriModule } from './dashboard/fornitori/fornitori.module';
import { ListinoModule } from './dashboard/listino/listino.module';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzSelectModule, MzModalModule  } from 'ngx-materialize';

import {PublicModule} from '@app/public/public.module';
import {ImportcsvModule} from '@app/dashboard/importcsv/importcsv.module';
import { NgStickyDirective } from 'ng-sticky';
import {ErrorHandlerService} from '@app/error-handler.service';
import {ApiInterceptor} from '@app/api.interceptor';
import {RouteReuseStrategy} from '@angular/router';
import {ReuseStrategy} from '@app/ReuseStrategy';
import {ReactiveFormsModule} from '@angular/forms';
import {SettingsModule} from '@app/dashboard/settings/settings.module';
import {LoggedGuard} from '@app/shared/Guards/Logged.guard';
import {DirectiveModule} from '@app/shared/directive/directive.module';
import { UtentiModule } from './dashboard/utenti/utenti.module';
import {DashboardComponent} from "@app/dashboard/dashboard/dashboard.component";
import {TemplateInitModule} from '@app/templateInit.module';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '/assets/i18n/', '/translations.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NgStickyDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    // Moduli di terze parti
    BrowserAnimationsModule,
    MzSelectModule,

    // Moduli dell'applicazione
    AuthModule,
    DashboardModule,
    ImportcsvModule,
    OrdiniModule,
    FornitoriModule,
    StatisticheModule,
    ListinoModule,
    PublicModule,
    DirectiveModule,
    SettingsModule,
    UtentiModule,
    ReactiveFormsModule,
    TemplateInitModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  //  {provide: RouteReuseStrategy, useClass: ReuseStrategy}
    [LoggedGuard]
    ],
  bootstrap: [AppComponent],
  exports: [TranslateModule]
})
export class AppModule {
}




