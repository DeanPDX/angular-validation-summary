import { Directive, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[badValidator]',
    providers: [{
        provide: NG_ASYNC_VALIDATORS,
        useExisting: forwardRef(() => BadValidatorDirective), multi: true
    }]
})

export class BadValidatorDirective implements AsyncValidator {

    constructor() { }

    validate(c: AbstractControl): Promise<ValidationErrors> {
        // setTimeout is intented to imitate server latency.
        return new Promise<ValidationErrors>(resolve => {
            setTimeout(() => {
                if (c.value.includes('bad') === true) {
                    resolve({ badMessage: 'can\'t contain "bad"' });
                } else {
                    resolve(null);
                }
            }, 500);
        });
    }
}