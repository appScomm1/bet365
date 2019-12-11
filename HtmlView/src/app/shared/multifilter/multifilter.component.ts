/*
 * File name: multifilter.component.ts
 * Author: Daniel Zarioiu
 * Copyright (c) 2018 Namirial SPA. All Rights reserved.
 * Date: 2019-07-10
 */
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges, HostListener
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {Router} from "@angular/router";

declare const $: any;
declare const M: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'DM-multifilter',
  templateUrl: './multifilter.component.html',
})


export class MultifilterComponent implements OnInit, OnChanges {

  enter = true;   // enter è controllo per non far fare due chiamate se premo invio sulla select dell'autocomplete
  @ViewChild('chip') chip: ElementRef;
  @ViewChild('tipo') tipo: ElementRef;
  @ViewChild('textfilter') textfilter: ElementRef;
  @Input() value: any;
  @Input() disable = false;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() historyIdentifier: string;
  @Input() data: Array<any>;
  @Input() CategoriesFilter: Array<any>;
  @Input() link: string;
  @Output() Valore = new EventEmitter<{name: string, property: string, action: string}>();
  @Output() EventKeyEnter = new EventEmitter<{name: string, property: string, action: string}>();
  console = console;
  filter = '';


  constructor(private fb: FormBuilder,
              private router: Router) {
  }


  public keyword = 'name';
  public keywordvalue = 'value';
  public historyHeading = 'Recently selected';

  ngOnInit() {

    if (this.disable) {
      $('.input-container').children('input').prop('disabled', true);
    } else {
      $('.input-container').children('input').prop('disabled', false);
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.disable);
    if (this.disable) {
      $('.input-container').children('input').prop('disabled', true);
    } else {
      $('.input-container').children('input').prop('disabled', false);
    }
  }


  submitReactiveForm(item, command) {
// true
    // enter è controllo per non far fare due chiamate se premo invio sulla select dell'autocomplete
    this.enter = true;
    console.log(typeof item);
    if (command === 'delete') {
      this.Valore.emit({name: '', property: '', action: command});
      return;
    } else {
        this.enter = false;
        this.Valore.emit({name: item.value, property: item.property, action: command});
        // false
    }
  }
  enterpress(item) {
    // controllo per non far fare due chiamate se premo invio sulla select dell'autocomplete
    if (this.enter) {
      this.EventKeyEnter.emit({name: $('.input-container').children('input').val(), property: 'allFields', action: 'string'});
    }
  }

  @HostListener('keyup.enter') // scatena l'evento quando si preme invio
  onEnter(): void {
    this.tipo.nativeElement.value = 'tutto';
    this.EventKeyEnter.emit({name: this.filter, property: this.tipo.nativeElement.value, action: 'add'});
  }

  focus() {
    console.log('click');
    setTimeout(() => { $('.dropdown-trigger').dropdown('close');}, 10);
  }

  openDrop() {
    $('.dropdown-trigger').dropdown('open');
  //  setTimeout(() => {  $('#filter').focus(); }, 1000);
  }

  onkeydownenter(type) {
    this.tipo.nativeElement.value = type;
    const e = jQuery.Event('keypress');
    e.keyCode = 13; // choose the one you want
    e.which = 13; // choose the one you want
    this.chip.nativeElement.M_Chips._handleInputKeydownBound(e);
    $('.dropdown-trigger').dropdown('close');

    this.Valore.emit({name: this.filter, property: this.tipo.nativeElement.value, action: 'add'});
  }


}
