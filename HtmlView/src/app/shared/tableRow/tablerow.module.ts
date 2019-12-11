/**
 * Angular imports
 * */
import {NgModule} from '@angular/core';

/**
 * Module imports
 * */
import {CommonModule} from '@angular/common';
import {DropdownComponent} from '@app/shared/dropdown/dropdown.component';
import {TablerowComponent} from "@app/shared/tableRow/tablerow.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MzInputModule, MzModalModule} from "ngx-materialize";
import {DirectiveModule} from "@app/shared/directive/directive.module";
import {AutocompleteModule} from '@app/shared/autocomplete/autocomplete.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxDropzoneModule} from 'ngx-dropzone';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [CommonModule,
    FormsModule,
    DirectiveModule,
    MzInputModule,
    MzModalModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteModule, TranslateModule, NgxDropzoneModule],
  declarations: [TablerowComponent],
  exports: [TablerowComponent]
})
export class TablerowModule { }
