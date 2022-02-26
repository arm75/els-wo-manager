import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborItemEditComponent } from './labor-item-edit.component';

describe('LaborItemEditComponent', () => {
  let component: LaborItemEditComponent;
  let fixture: ComponentFixture<LaborItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborItemEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

