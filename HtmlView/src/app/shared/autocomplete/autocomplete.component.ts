import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {Router} from "@angular/router";
import {compileComponentFromMetadata} from "@angular/compiler";
import {element} from "protractor";
import {DomSanitizer} from "@angular/platform-browser";

declare const $: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'DM-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})


export class AutocompleteComponent implements OnInit, OnChanges {

  @ViewChild('ngAutoCompleteStatic') autocomplete;
  @Input() value: any;
  @Input() disable = false;
  @Input() label: string;
  @Input() historyIdentifier: string;
  @Input() data: Array<any>;
  @Input() link: string;
  @Output() Valore = new EventEmitter<{ name: string, value: string, action: string }>();
  @Output() Modal = new EventEmitter();
  console = console;

  constructor(private fb: FormBuilder,
              private router: Router,
              private sanitizer: DomSanitizer) {
  }

  reactiveForm: FormGroup = null;

  public keyword = 'label';
  public historyHeading = 'Recently selected';

  searched;

  ngOnInit() {
    this.reactiveForm = this.fb.group({
      value: ['', Validators.required],
      label: [null, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      if (this.disable) {
        $('.input-container').children('input').prop('disabled', true);
        $('.x').children('i').hide();
      } else {
        $('.input-container').children('input').prop('disabled', false);
        $('.x').children('i').show();
      }
    }, 1);

    if (this.value !== '' && this.value !== undefined && this.value !== null) {
      this.data.forEach((d) => {
        if (d.value === this.value) {
          this.value = d.label;
          this.autocomplete.elementRef.nativeElement.firstChild.firstChild.firstChild.value = this.value;
          this.submitReactiveForm(d, 'add');
        }
      });
    }
  }


  submitReactiveForm(item, command) {
    if (command === 'delete') {
      item = {
        label: null,
        value: null
      };
    }

    this.searched = item;

    if (item.label === 'Cerca ancora...') {
      this.Navigate('Lista');
    }
    this.reactiveForm.controls.label.setValue(item.label);
    this.reactiveForm.controls.value.setValue(item.value);
    if (this.reactiveForm.valid) {

      this.Valore.emit({
        name: this.reactiveForm.controls.label.value,
        value: this.reactiveForm.controls.value.value,
        action: command
      });
      // this.value = '';
    }
  }

  Navigate(command, name?) {
    this.Modal.emit({action: command, value: name});
  }

  clear() {
    this.autocomplete.clear();
  }
}

