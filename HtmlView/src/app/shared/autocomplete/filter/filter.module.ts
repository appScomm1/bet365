import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutocompleteModule} from '@app/shared/autocomplete/autocomplete.module';
import {AutocompleteFilterComponent} from '@app/shared/autocomplete/filter/filter.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteModule
  ],
  declarations: [AutocompleteFilterComponent],
  exports: [AutocompleteFilterComponent]
})
export class AutocompleteFilterModule { }
