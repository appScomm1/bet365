import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {DirectiveModule} from '@app/shared/directive/directive.module';
import {OrderStatusComponent} from '@app/shared/orderStatus/orderStatus.component';

NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    DirectiveModule
  ],
  declarations: [OrderStatusComponent],
  exports: [OrderStatusComponent]
})
export class OrderStatusModule {

}
