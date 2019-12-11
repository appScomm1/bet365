import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista/lista.component';
import { FormComponent } from './form/form.component';
import {DataTablesModule} from 'angular-datatables';
import {MzFeatureDiscoveryModule, MzValidationModule} from 'ngx-materialize';
import { RouterModule } from '@angular/router';
import {DropdownModule} from '@app/shared/dropdown/dropdown.module';
import {DirectiveModule} from '@app/shared/directive/directive.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BtnAddModule} from '@app/shared/btnAdd/btnAdd.module';
import {FornitoriFormDirective} from '@app/dashboard/fornitori/form/form.directive';
import { TranslateModule } from '@ngx-translate/core';
import {AutocompleteModule} from "@app/shared/autocomplete/autocomplete.module";
import {DashboardModule} from "@app/dashboard/dashboard.module";
import {AngularResizedEventModule} from "angular-resize-event";
import {MultifilterModule} from '@app/shared/multifilter/multifilter.module';

@NgModule({
  declarations: [ListaComponent, FormComponent, FornitoriFormDirective],
  imports: [
    TranslateModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BtnAddModule,
    DataTablesModule,
    DropdownModule,
    DirectiveModule,
    RouterModule,
    MzFeatureDiscoveryModule,
    MzValidationModule,
    AutocompleteModule,
    DashboardModule,
    AngularResizedEventModule,
    MultifilterModule
  ]
})
export class FornitoriModule { }
