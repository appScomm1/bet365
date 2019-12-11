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
  selector: '[DMtag]'
})
export class TagDirective implements AfterContentInit, OnChanges {

  @Input() DMtag ;
  @Input() Disable: boolean;

  children = [];

  constructor(private el: ElementRef) {}
  ngAfterContentInit(): void {
    $('.chips').chips();
    console.log($(this.el.nativeElement));
    console.log( this.DMtag);
    $(this.el.nativeElement).chips({
      placeholder: 'Enter a tag',
      secondaryPlaceholder: '+Tag',
      data: this.DMtag,
    });

    this.children = Array.from(this.el.nativeElement.children);
    this.children.forEach( (res: any) => res.disabled = this.Disable);

    console.log($(this.el.nativeElement));

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log( this.DMtag[0]);
    console.log(this.DMtag);
    $('.chips').chips();
    console.log($(this.el.nativeElement));
    console.log( this.DMtag);
    $(this.el.nativeElement).chips({
      placeholder: 'Enter a tag',
      secondaryPlaceholder: '+Tag',
      data: this.DMtag,
    });
  }
}
