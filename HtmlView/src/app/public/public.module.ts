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

@NgModule({
  declarations: [PublicComponent],
  exports: [
    PublicComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MzDropdownModule,
    MzButtonModule
  ]
})
export class PublicModule { }
