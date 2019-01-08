import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularValidationSummaryModule } from 'angular-validation-summary';
import { AppComponent } from './app.component';
import { BadValidatorDirective } from './bad-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    BadValidatorDirective
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
