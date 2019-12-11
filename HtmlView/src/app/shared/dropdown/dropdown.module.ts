/*
 * File name: dropdown.module.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-05-02
 */
/**
 * Angular imports
 * */
import {NgModule} from '@angular/core';

/**
 * Module imports
 * */
import {CommonModule} from '@angular/common';
import {DropdownComponent} from '@app/shared/dropdown/dropdown.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DropdownComponent],
  exports: [DropdownComponent]
})
export class DropdownModule { }
