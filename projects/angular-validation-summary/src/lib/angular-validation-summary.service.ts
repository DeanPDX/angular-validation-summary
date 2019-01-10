import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AngularValidationSummaryService {

  constructor() { }

  /**
   * Build validation messages from a FormGroup or FormArray. Important references from Angular docs:
   *
   * https://angular.io/guide/reactive-forms
   * https://angular.io/api/forms/AbstractControl
   * 
   * AbstractControl is the base class for FormControl, FormGroup, and FormArray. FormGroups and
   * FormArrays can have children of type FormGroup and FormArray, so we process them recursively.
   * 
   * @param formGroup The FormGroup you want to generate validation messages for
   * @param validationPrefix A prefix for validation messages. Mainly used for child FormGroups/FormArrays.
   * @returns An array of validation messages.
   */
  public generateValidationMessages(formGroup: FormGroup | FormArray, validationPrefix: string = ''): string[] {
    let errorMessages: string[] = [];
    Object.keys(formGroup.controls).forEach(key => {
      let object = formGroup.controls[key];
      // FormGroups can contain child FormGroups. If we have a child FormGroup, recursively call
      // this function on our child FormGroup.
      if (object instanceof FormGroup || object instanceof FormArray) {
        // Since this can be called recursively, we keep building the validation prefix. For example,
        // if a registration FormGroup contained a child FormGroup called "Shipping Address", our 
        // prefix would become "Shipping Address:" so validation messages on that child FormGroup would 
        // be prefixed with "Shipping Address:.
        let newPrefix = validationPrefix + key + ': ';
        // Using push.apply due to performance considerations. See:
        // https://jsperf.com/concat-vs-push-apply/55
        errorMessages.push.apply(errorMessages, this.generateValidationMessages(object, newPrefix));
      }
      // If we have a form control, get errors from it.
      else if (object instanceof FormControl) {
        let controlName = validationPrefix + key;
        errorMessages.push.apply(errorMessages, this.getErrorsFromFormControl(object, controlName));
      }
    });
    return errorMessages;
  }

  /**
   * @param control The FormControl to generate validation messages for.
   * @param controlName The name of the control.
   */
  private getErrorsFromFormControl(control: FormControl, controlName: string): string[] {
    let returnMessages: string[] = [];
    let controlErrors = control.errors;
    if (controlErrors === null) {
      return;
    }
    // Handle built-in errors
    if (controlErrors.required) {
      returnMessages.push(`${controlName} is required.`);
    }
    if (controlErrors.minlength) {
      let minLength = controlErrors.minlength.requiredLength;
      let charactersUnderMin = minLength - controlErrors.minlength.actualLength;
      returnMessages.push(`${controlName} minimum length is ${minLength}. Please add ${charactersUnderMin} characters.`);
    }
    if (controlErrors.maxlength) {
      let maxLength = controlErrors.maxlength.requiredLength;
      let charactersOverMax = controlErrors.maxlength.actualLength - maxLength;
      returnMessages.push(`${controlName} maximum length is ${maxLength}. Please delete ${charactersOverMax} characters.`);
    }
    if (controlErrors.email) {
      returnMessages.push(`${controlName} must be a valid email address.`);
    }
    // Any strings are assumed to be error messages
    Object.keys(controlErrors).forEach(key => {
      let errorMessage = controlErrors[key];
      if (typeof errorMessage === 'string') {
        returnMessages.push(`${controlName} ${errorMessage}`);
      }
    });

    return returnMessages;
  }
}
