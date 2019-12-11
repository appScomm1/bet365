/*
 * File name: tag.directive.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-07-24
 */
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
  ElementRef, Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from "@angular/core";

declare const $: any;

@Directive({
  selector: '[DMmodal]'
})
export class ModalDirective implements AfterContentInit {

  @Input() options = {};

  constructor(private el: ElementRef) {}
  ngAfterContentInit(): void {
    $(this.el.nativeElement).modal(this.options);
  }
}
