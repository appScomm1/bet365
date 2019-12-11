
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
  selector: '[DMshowbutton]'
})
export class ShowbuttonDirective implements AfterContentInit {

  @Input() modifica = false;

  constructor(private el: ElementRef) {}


  ngAfterContentInit(): void {
    const btnhide = $(this.el.nativeElement).find('.btn-hide');
    $(this.el.nativeElement).find('.btn-hide').hide();
    $(this.el.nativeElement).children('td').children('input').change(
      () => {
        btnhide.show();
      } );

    btnhide.click(
      () => {
        btnhide.hide();
      }
    );
  }
}

