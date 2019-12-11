import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutocompleteComponent} from '@app/shared/autocomplete/autocomplete.component';
import {AutocompleteLibModule} from '@app/custom_modules/angular-ng-autocomplete';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AutocompleteLibModule,
    ReactiveFormsModule
  ],
  declarations: [AutocompleteComponent],
  exports: [AutocompleteComponent]
})
export class AutocompleteModule { }
