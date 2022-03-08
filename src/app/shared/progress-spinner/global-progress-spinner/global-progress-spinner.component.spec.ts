import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalProgressSpinnerComponent } from './global-progress-spinner.component';

describe('GlobalProgressSpinnerComponent', () => {
  let component: GlobalProgressSpinnerComponent;
  let fixture: ComponentFixture<GlobalProgressSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalProgressSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
