import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborItemAddComponent } from './labor-item-add.component';

describe('LaborItemAddComponent', () => {
  let component: LaborItemAddComponent;
  let fixture: ComponentFixture<LaborItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborItemAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

