import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'DM-autocompleteFilter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})

export class AutocompleteFilterComponent implements OnInit {

  @Input() data: Array<any>;
  @Input() link: string;
  @Input() label: string;

  ngOnInit() {
  }


}
