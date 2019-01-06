import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Validation summary settings
  public validationMessage: string = 'Please fix the following errors:';
  public hideUntilSubmit: boolean = false;

  // Backing fields for form
  public firstName: string = '';
  public lastName: string = '';
  public password: string = '';
  public country: string = '';
  public comment: string = 'This string is just too long';
  
  formSubmit() {
    alert('Submitted the form!');
  }
}