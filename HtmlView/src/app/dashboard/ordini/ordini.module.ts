import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista/lista.component';
import { HttpClientModule } from '@angular/common/http';

import { DataTablesModule } from 'angular-datatables';
import { FormComponent } from './form/form.component';

import { MzSelectModule, MzModalModule, MzSidenavModule, MzDropdownModule, MzInputModule, MzTooltipModule } from 'ngx-materialize';
import { DettaglioComponent } from './dettaglio/dettaglio.component';
import { RouterModule } from '@angular/router';
import { TrattativaComponent } from './trattativa/trattativa.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DropdownModule} from '@app/shared/dropdown/dropdown.module';
import {DirectiveModule} from '@app/shared/directive/directive.module';
import {DropzoneDirective} from '@app/shared/directive/dropzone/dropzone.directive';
import {TablerowModule} from '@app/shared/tableRow/tablerow.module';
import {BtnAddModule} from '@app/shared/btnAdd/btnAdd.module';
import {TranslateModule} from '@ngx-translate/core';
import {AutocompleteModule} from '@app/shared/autocomplete/autocomplete.module';
import {FormDirective} from '@app/dashboard/ordini/form/form.directve';
import {PipeModule} from '@app/shared/pipe/pipe.module';
import {MultifilterModule} from '@app/shared/multifilter/multifilter.module';
import {DashboardModule} from "@app/dashboard/dashboard.module";
import {AngularResizedEventModule} from "angular-resize-event";
import {NgxDropzoneModule} from 'ngx-dropzone';
import {OrderStatusComponent} from '@app/shared/orderStatus/orderStatus.component';

@NgModule({
  declarations: [ListaComponent, FormComponent, DettaglioComponent, TrattativaComponent, FormDirective, OrderStatusComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    BtnAddModule,
    ReactiveFormsModule,
    DataTablesModule,
    DirectiveModule,
    HttpClientModule,
    DropdownModule,
    TablerowModule,
    MzSelectModule,
    MzSidenavModule,
    MzDropdownModule,
    MzInputModule,
    MzTooltipModule,
    TranslateModule,
    AutocompleteModule,
    PipeModule,
    MultifilterModule,
    DashboardModule,
    AngularResizedEventModule,
    NgxDropzoneModule
  ]
})
export class OrdiniModule { }
