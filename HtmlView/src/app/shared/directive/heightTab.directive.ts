/*
 * File name: heightTab.directive.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-07-25
 */
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
  selector: '[DmheightTab]'
})
export class HeightTabDirective implements AfterContentInit {

  constructor(private el: ElementRef) {}

  @Input() DmheightTab = 0;

  ngAfterContentInit(): void {
    this.CalcHeight();
  }
  CalcHeight() {
    let topHeight = 0;
    let currentHeight = 0;
    const obj = $(this.el.nativeElement).children('.height-tab');
    console.log('wofdamfwds', $(this.el.nativeElement).children('.height-tab'));
    for (let i = 0; i < obj.length; i += 1) {

      console.log($(obj[i]).height());
      currentHeight = $(obj[i]).height();
      console.log('if', currentHeight);

      if ( currentHeight > topHeight) {
        topHeight = currentHeight + this.DmheightTab;
        console.log(topHeight);
      }
    }
    this.setHeight(topHeight);
  }
  setHeight(height) {
    $(this.el.nativeElement).children('.height-tab').css('min-height', height + 'px');
  }
}
