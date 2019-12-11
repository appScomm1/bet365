/*
 * File name: btnAdd.module.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-05-14
 */
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
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {BtnAddComponent} from "@app/shared/btnAdd/btnAdd.component";

@NgModule({
  imports: [CommonModule,
            RouterModule,
            FormsModule],
  declarations: [BtnAddComponent],
  exports: [BtnAddComponent]
})
export class BtnAddModule { }
