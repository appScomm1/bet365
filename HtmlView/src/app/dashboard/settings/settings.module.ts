import {NgModule} from '@angular/core';
import {CompaniesSettingsComponent} from '@app/dashboard/settings/companies/companies.component';
import {TranslateModule} from '@ngx-translate/core';
import {AutocompleteModule} from '@app/shared/autocomplete/autocomplete.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DirectiveModule} from '@app/shared/directive/directive.module';
import {DashboardModule} from '@app/dashboard/dashboard.module';
import {RouterModule} from '@angular/router';
import {AngularResizedEventModule} from 'angular-resize-event';

@NgModule({
  declarations: [CompaniesSettingsComponent],
  imports: [
    TranslateModule,
    AutocompleteModule,
    CommonModule,
    ReactiveFormsModule,
    DirectiveModule,
    FormsModule,
    DashboardModule,
    DirectiveModule,
    RouterModule,
    AngularResizedEventModule
  ]
})
export class SettingsModule {
}
