
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
  selector: '[DmSelect]'
})
export class SelectDirective implements OnInit, OnChanges, AfterContentInit, AfterViewChecked {

  constructor(private el: ElementRef) {}

  @Input() refresh: any;

  ngOnInit(): void {
    // $(this.el.nativeElement).formSelect();
    this.el.nativeElement.onchange = () => { console.log('ciao');  $(this.el.nativeElement).formSelect(); };
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
  ngAfterContentInit(): void {
    $(this.el.nativeElement).formSelect();
  }

 ngAfterViewChecked(): void {
  // risponde quando angular controlla il contenuto della direttiva
 }
}
