/*
 * File name: pipe.module.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-07-08
 */
import {NgModule} from '@angular/core';
import {MySearchPipe} from '@app/shared/pipe/filter.pipe';
import {StatusPipe} from '@app/shared/pipe/order.status.pipe';
// modulo per dichiarare le pipe in piu moduli
@NgModule({
  imports: [
  ],
  declarations: [
    MySearchPipe,
    StatusPipe,
  ],
  exports: [
    MySearchPipe,
    StatusPipe
  ]
})
export class PipeModule { }
