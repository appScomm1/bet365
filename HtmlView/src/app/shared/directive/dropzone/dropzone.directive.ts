/*
 * File name: dropzone.directive.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-05-07
 */
/*
 * File name: dropzone.directive.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-05-07
 */
import {Directive, ElementRef, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

declare const $: any;

@Directive({
  selector: '[DmDropzone]'
})
export class DropzoneDirective implements OnInit, OnChanges {

  constructor(private el: ElementRef,
              private translate: TranslateService
    ) {
      this.translate.onLangChange
      .subscribe((event: LangChangeEvent) => {
        this.translate.get('DropZone.dragFile').subscribe((app: string) => {
          this.dragMessage = app;
          console.log(app);
          $(this.el.nativeElement).dropify({
            messages: {
              default: this.dragMessage
            }
          });
        });
      });
    }

    dragMessage;
  ngOnInit(): void {
    this.translate.get('DropZone.dragFile').subscribe((app: string) => {
      this.dragMessage = app;
      console.log(app);

      $(this.el.nativeElement).dropify({
      messages: {
        default: this.dragMessage
      }
    });
    });




  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ciao ');
  }
}
