import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DirectiveModule} from '@app/shared/directive/directive.module';
import {BtnAddModule} from '@app/shared/btnAdd/btnAdd.module';
import {TranslateModule} from '@ngx-translate/core';
import {AutocompleteModule} from '@app/shared/autocomplete/autocomplete.module';
import {PipeModule} from '@app/shared/pipe/pipe.module';
import {DashboardModule} from "@app/dashboard/dashboard.module";
import {AngularResizedEventModule} from "angular-resize-event";
import { ListaComponent } from './lista/lista.component';
import { DataTablesModule } from 'angular-datatables';
import { MzSelectModule, MzModalModule, MzSidenavModule, MzDropdownModule, MzInputModule, MzTooltipModule } from 'ngx-materialize';
import {NgxDropzoneModule} from 'ngx-dropzone';
import { ChecklistModule } from 'angular-checklist';

@NgModule({
  declarations: [FormComponent, ListaComponent],
  imports: [
    FormsModule,
    ChecklistModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    BtnAddModule,
    ReactiveFormsModule,
    DirectiveModule,
    HttpClientModule,
    TranslateModule,
    AutocompleteModule,
    PipeModule,
    DashboardModule,
    AngularResizedEventModule,
    DataTablesModule,
    MzDropdownModule,
    NgxDropzoneModule
  ]
})
export class UtentiModule { }
