/*
 * File name: listrows.component.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-06-05
 */

import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {componentFactoryResolverProviderDef} from "@angular/compiler/src/view_compiler/provider_compiler";
import {onErrorResumeNext} from "rxjs";
import {OrdiniService} from "@app/dashboard/ordini/ordini.service";

@Component({
  selector: 'DM-listrows',
  templateUrl: './tablerow.component.html',
  styleUrls: ['./tablerow.component.scss']
})

export class ListrowsComponent implements AfterViewInit {

  @Input() rows;
  @Input() checkrows = false;
  @Input() select;
  @Output() ChangeAllCheckBox = new EventEmitter<void>();
  @Output() CheckboxChange = new EventEmitter<void>() ;
  @Output() SaveUpdate = new EventEmitter<void>();

  constructor(private ele: ElementRef,
              private ordiniService: OrdiniService) {
  }

  ngAfterViewInit() {

  }


}
