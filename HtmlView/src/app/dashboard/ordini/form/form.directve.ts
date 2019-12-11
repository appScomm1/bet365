import { Directive, OnInit, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[appFormDirective]',
})
export class FormDirective implements OnInit {

    constructor(private el: ElementRef, private form: ElementRef) {}
    appoggio;

    ngOnInit() {
        
    }
    
    @HostListener('click') onclick() {
        this.form.nativeElement.value = this.el.nativeElement.value;
        console.log(this.form.nativeElement.value);
    }
}
