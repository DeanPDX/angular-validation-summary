import { TestBed } from '@angular/core/testing';

import { AngularValidationSummaryService } from './angular-validation-summary.service';

describe('AngularValidationSummaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularValidationSummaryService = TestBed.get(AngularValidationSummaryService);
    expect(service).toBeTruthy();
  });
});
