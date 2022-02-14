import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborEditComponent } from './labor-edit.component';

describe('LaborEditComponent', () => {
  let component: LaborEditComponent;
  let fixture: ComponentFixture<LaborEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

