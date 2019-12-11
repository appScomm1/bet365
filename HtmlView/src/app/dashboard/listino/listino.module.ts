import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista/lista.component';
import { FormComponent } from './form/form.component';
import { DataTablesModule } from 'angular-datatables';
import { MzFeatureDiscoveryModule } from 'ngx-materialize';
import { RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DirectiveModule} from '@app/shared/directive/directive.module';
import {DropdownModule} from '@app/shared/dropdown/dropdown.module';
import {BtnAddModule} from '@app/shared/btnAdd/btnAdd.module';
import {DashboardModule} from "@app/dashboard/dashboard.module";
import {MultifilterModule} from '@app/shared/multifilter/multifilter.module';

@NgModule({
  declarations: [ListaComponent, FormComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    TranslateModule,
    RouterModule,
    MzFeatureDiscoveryModule,
    FormsModule,
    ReactiveFormsModule,
    DirectiveModule,
    DropdownModule,
    BtnAddModule,
    DashboardModule,
    MultifilterModule
  ]
})
export class ListinoModule { }
