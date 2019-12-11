/*
 * File name: multifilter.module.ts.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-07-10
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutocompleteComponent} from '@app/shared/autocomplete/autocomplete.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {MultifilterComponent} from "@app/shared/multifilter/multifilter.component";
import {DropdownModule} from "@app/shared/dropdown/dropdown.module";
import {DirectiveModule} from "@app/shared/directive/directive.module";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    DirectiveModule
  ],
  declarations: [MultifilterComponent],
  exports: [MultifilterComponent]
})
export class MultifilterModule { }
