import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[rudeValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => RudeValidatorDirective), multi: true
    }]
})

/**
 * This is a test validator to ensure that the user doesn't type anything rude.
 */
export class RudeValidatorDirective implements Validator {

    constructor() { }

    validate(c: AbstractControl): ValidationErrors {
        if (c.value && c.value.indexOf('rude') >= 0) {
            return { rudeMessage: 'can\'t be rude' };
        }
        return null;
    }
}