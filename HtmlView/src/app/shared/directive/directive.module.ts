/*
 * File name: public.module.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-04-19
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { MzDropdownModule, MzButtonModule } from 'ngx-materialize';
import {PublicComponent} from '@app/public/public.component';
import {DropzoneDirective} from "@app/shared/directive/dropzone/dropzone.directive";
import {SelectDirective} from "@app/shared/directive/select.directive";
import {TooltipDirective} from "@app/shared/directive/tooltip.directive";
import {RowstatuscolorDirective} from "@app/shared/directive/rowstatuscolor.directive";
import {DatapickerDirective} from "@app/shared/directive/datapicker.directive";
import {ShowbuttonDirective} from "@app/shared/directive/showbutton.directive";
import {TagDirective} from "@app/shared/directive/tag.directive";
import {HeightTabDirective} from "@app/shared/directive/heightTab.directive";
import {ModalDirective} from "@app/shared/directive/modal.directive";
import {DropdownDirective} from "@app/shared/directive/dropdown.directive";

@NgModule({
  declarations: [
    DropzoneDirective,
    SelectDirective,
    TooltipDirective,
    RowstatuscolorDirective,
    DatapickerDirective,
    ShowbuttonDirective,
    TagDirective,
    HeightTabDirective,
    ModalDirective,
    DropdownDirective
    ],
  exports: [
    DropzoneDirective,
    SelectDirective,
    TooltipDirective,
    RowstatuscolorDirective,
    DatapickerDirective,
    ShowbuttonDirective,
    TagDirective,
    HeightTabDirective,
    ModalDirective,
    DropdownDirective
  ],
  imports: [
    RouterModule,
    CommonModule,
    MzDropdownModule,
    MzButtonModule
  ]
})
export class DirectiveModule { }
