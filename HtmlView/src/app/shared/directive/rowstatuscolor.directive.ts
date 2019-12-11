/*
 * File name: rowstatuscolor.directive.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-06-03
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
  selector: '[DmRowStatusColor]'
})
export class RowstatuscolorDirective implements AfterContentInit {

  @Input() DmRowStatusColor = null;

  constructor(private el: ElementRef) {}


  ngAfterContentInit(): void {

    console.log('ciao', this.DmRowStatusColor);
    console.log($(this.el.nativeElement).children('td').children('tbody').children('tr').children('td').children('input'));
    if (this.DmRowStatusColor === 'edited_supplier') {
      $(this.el.nativeElement).children('td').children('tbody').children('tr').children('td').children('input').change(
        () => {
          console.log(this.el);
          $(this.el.nativeElement).addClass('color-update');
        });
    } else {
      $(this.el.nativeElement).children('td').children('input').change(
        () => {
          console.log(this.el);
          $(this.el.nativeElement).addClass('color-update');
        });
    }
  }
}
