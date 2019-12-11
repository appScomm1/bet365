import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DataTablesModule } from 'angular-datatables';


import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import {ImportcsvComponent} from '@app/dashboard/importcsv/importcsv.component';
import {MzModalModule} from 'ngx-materialize';
import {DirectiveModule} from '@app/shared/directive/directive.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxDropzoneModule} from 'ngx-dropzone';

@NgModule({
  declarations: [ImportcsvComponent],
  imports: [
    TranslateModule,
    FormsModule,
    RouterModule,
    CommonModule,
    DataTablesModule,
    HttpClientModule,
    MzModalModule,
    DirectiveModule,
    NgxDropzoneModule
  ]
})
export class ImportcsvModule { }
