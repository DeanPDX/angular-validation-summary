import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularValidationSummaryService } from './angular-validation-summary.service';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';

@Component({
  selector: 'angular-validation-summary',
  templateUrl: './angular-validation-summary.component.html',
  styleUrls: ['./angular-validation-summary.component.scss']
})

export class AngularValidationSummaryComponent implements OnInit, OnDestroy {

  /**
   * The form you want to validate
   */
  @Input() form: NgForm;
  
	/**
	 * The validation message to display. Defaults to 'Please fix the following errors:'
	 */
  @Input() validationMessage: string = 'Please fix the following errors:';

  /**
   * If true, validation summary won't show until the form is submitted. Defaults to false.
   */
  @Input() hideUntilSubmit: boolean = false;

  /**
   * Our list of validation errors.
   */
  errors: string[] = [];

  /**
   * A property to control visibility of the validation summary.
   */
  get showValidationSummary() : boolean {
    if (this.hideUntilSubmit && this.form.submitted === false) {
      return false;
    }
    else {
      return this.errors.length > 0;
    }
  }
  
  /** 
   * A subject that allows us to unsubscribe our subscriptions on ngDestroy.
   */
  private ngUnsubscribe = new Subject();

  constructor(private validationService: AngularValidationSummaryService) { }

  ngOnInit() {
    if (this.form instanceof NgForm === false) {
      throw new Error('You must supply angular-validation-summary with an NgForm.');
    }
    this.form.statusChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe((status) => {
      /* Possible statuses:
          * VALID: This control has passed all validation checks.
          * INVALID: This control has failed at least one validation check.
          * PENDING: This control is in the midst of conducting a validation check.
          * DISABLED: This control is exempt from validation checks. 
         More info from the Angualar docs:
         https://angular.io/api/forms/AbstractControl#status */
      
      if (status === 'PENDING' || status === 'DISABLED') {
        // If the form is pending, the statusChanges observable will emit another value
        // when pending validation completes. If disabled, we have nothing to do.
        return;
      }

      if (status === 'VALID') {
        // We can short-circuit our validation logic and remove all errors if the 
        // form is valid
        this.errors.length = 0;
        return;
      }
      
      // Build a list of errrors
      this.errors = this.validationService.generateValidationMessages(this.form.control);
    });
  }
  ngOnDestroy(): void {
    // We are following the takeUntil pattern to avoid memory leaks
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}