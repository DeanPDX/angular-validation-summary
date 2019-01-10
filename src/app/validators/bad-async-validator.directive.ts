import { Directive, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[badValidator]',
    providers: [{
        provide: NG_ASYNC_VALIDATORS,
        useExisting: forwardRef(() => BadAsyncValidatorDirective), multi: true
    }]
})

/**
 * This is a test async validator to ensure that the user doesn't enter the text "bad". We simulate server latency of 500ms.
 */
export class BadAsyncValidatorDirective implements AsyncValidator {

    constructor() { }

    validate(c: AbstractControl): Promise<ValidationErrors> {
        // setTimeout is intented to imitate server latency.
        return new Promise<ValidationErrors>(resolve => {
            setTimeout(() => {
                if (c.value && c.value.indexOf('bad') >= 0) {
                    resolve({ badMessage: 'can\'t contain "bad"' });
                } else {
                    resolve(null);
                }
            }, 500);
        });
    }
}