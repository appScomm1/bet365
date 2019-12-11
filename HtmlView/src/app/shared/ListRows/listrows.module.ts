/*
 * File name: listrows.module.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-06-05
 */
/**
 * Angular imports
 * */
import {NgModule} from '@angular/core';

/**
 * Module imports
 * */
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MzInputModule, MzModalModule} from "ngx-materialize";
import {DirectiveModule} from "@app/shared/directive/directive.module";
import {ListrowsComponent} from "@app/shared/ListRows/listrows.component";

@NgModule({
  imports: [CommonModule,
    FormsModule,
    DirectiveModule,
    MzInputModule,
    MzModalModule],
  declarations: [ListrowsComponent],
  exports: [ListrowsComponent]
})
export class TablerowModule { }
