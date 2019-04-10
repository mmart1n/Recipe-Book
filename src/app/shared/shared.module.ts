import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GenericIngredientsRowsComponent } from './generic-ingredients-rows/generic-ingredients-rows.component';
import { DropdownDirective } from './dropdown.directive';
import { FilterPipe } from './filter-pipe';

@NgModule({
  declarations: [
    DropdownDirective,
    GenericIngredientsRowsComponent,
    FilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    DropdownDirective,
    GenericIngredientsRowsComponent,
    FilterPipe
  ]
})
export class SharedModule {}
