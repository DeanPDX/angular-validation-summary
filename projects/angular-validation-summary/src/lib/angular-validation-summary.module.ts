import { NgModule } from '@angular/core';
import { AngularValidationSummaryComponent } from './angular-validation-summary.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AngularValidationSummaryComponent],
  imports: [
    CommonModule
  ],
  exports: [AngularValidationSummaryComponent]
})
export class AngularValidationSummaryModule { }
