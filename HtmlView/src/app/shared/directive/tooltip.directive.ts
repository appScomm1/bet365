/*
 * File name: tooltip.directive.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-06-03
 */

import {
  AfterContentInit,
  AfterViewChecked,
  Directive,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges
} from "@angular/core";

declare const $: any;

@Directive({
  selector: '[DmTooltip]'
})
export class TooltipDirective implements AfterContentInit {

  constructor(private el: ElementRef) {}
  ngAfterContentInit(): void {
    $(this.el.nativeElement).tooltip();
  }
}
