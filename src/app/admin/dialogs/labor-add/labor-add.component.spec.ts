import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborAddComponent } from './labor-add.component';

describe('LaborAddComponent', () => {
  let component: LaborAddComponent;
  let fixture: ComponentFixture<LaborAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

