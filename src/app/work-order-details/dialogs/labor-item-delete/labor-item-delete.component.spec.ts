import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborItemDeleteComponent } from './labor-item-delete.component';

describe('LaborItemDeleteComponent', () => {
  let component: LaborItemDeleteComponent;
  let fixture: ComponentFixture<LaborItemDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborItemDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborItemDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

