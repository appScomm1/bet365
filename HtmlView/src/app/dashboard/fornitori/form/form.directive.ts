import {Directive, ElementRef, OnInit, HostListener, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appFormDirective]',
})
export class FornitoriFormDirective implements OnInit {
  @Input() cap: number;
  @HostBinding('style.disable') disable: boolean;

  constructor() {
  }

  ngOnInit() {

  }
}

