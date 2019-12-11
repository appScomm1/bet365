/*
 * File name: btnAdd.component.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-05-14
 */
import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {componentFactoryResolverProviderDef} from "@angular/compiler/src/view_compiler/provider_compiler";
import {onErrorResumeNext} from "rxjs";

declare const $: any;

@Component({
  selector: 'DM-btnAdd',
  template: `
    <div style="bottom: 50px; right: 19px;" class="fixed-action-btn direction-top">
      <a class="btn-floating btn-large gradient-45deg-indigo-purple"><i class="material-icons">add</i></a>
      <ul>
        <li>
          <a [routerLink]="['new']"
             class="btn-floating  deep-purple darken-3 tooltipped"
             data-position="left" attr.data-tooltip="{{titlecrea}}"
             style="opacity: 0; transform: scale(0.4) translateY(40px) translateX(0px);">
            <i class="material-icons">insert_drive_file</i>
          </a>
        </li>
        <li>
          <a [routerLink]="['/dashboard/import']"
             class="btn-floating  purple darken-3 tooltipped"
             data-position="left" attr.data-tooltip="{{titleimport}}"
             style="opacity: 0; transform: scale(0.4) translateY(40px) translateX(0px);">
            <i class="material-icons">import_export</i>
          </a>
        </li>
      </ul>
    </div>`,
})

export class BtnAddComponent implements OnInit {

  @Input() titleimport = 'import';
  @Input() titlecrea = 'crea';

  ngOnInit(): void {
    $('.fixed-action-btn').floatingActionButton();
    $('.tooltipped').tooltip();
  }
}
