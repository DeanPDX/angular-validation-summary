import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularValidationSummaryModule } from 'angular-validation-summary';
import { AppComponent } from './app.component';
import { BadAsyncValidatorDirective } from './validators/bad-async-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    BadAsyncValidatorDirective
  ],
  imports: [
    BrowserModule,
    AngularValidationSummaryModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
