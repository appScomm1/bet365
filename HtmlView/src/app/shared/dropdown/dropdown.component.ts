/*
 * File name: dropdown.component.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-05-02
 */
import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {componentFactoryResolverProviderDef} from "@angular/compiler/src/view_compiler/provider_compiler";
import {onErrorResumeNext} from "rxjs";

declare const $: any;

@Component({
  selector: 'DM-dropdown',
  template: `
    <a class="{{ classe }}" attr.data-target="{{dataTarget}}"  href="javascript:void(0);">
      <span *ngIf="!icon">{{ text }}</span>
      <i  *ngIf="icon" class="material-icons" >{{ iconText }}</i>
    </a>
    <ng-content select="[list]"></ng-content>
  `,
})

export class DropdownComponent implements AfterViewInit {

  @Input() classe;
  @Input() dataTarget;
  @Input() text;
  @Input() icon = false;
  @Input() iconText;

  constructor(private ele: ElementRef) {
  }

  ngAfterViewInit() {
    // console.log($($(this.ele.nativeElement).children()[0])[0])
    $($(this.ele.nativeElement).children()[0]).dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false,
        hover: false,
        gutter: 0,
        alignment: 'right',
        coverTrigger: false,
        closeOnClick: false
        // stopPropagation: false
      }
    );
  }

}
