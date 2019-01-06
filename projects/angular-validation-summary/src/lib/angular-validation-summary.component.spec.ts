import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularValidationSummaryComponent } from './angular-validation-summary.component';

describe('AngularValidationSummaryComponent', () => {
  let component: AngularValidationSummaryComponent;
  let fixture: ComponentFixture<AngularValidationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularValidationSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularValidationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});