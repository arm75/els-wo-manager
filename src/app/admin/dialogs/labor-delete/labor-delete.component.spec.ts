import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborDeleteComponent } from './labor-delete.component';

describe('LaborDeleteComponent', () => {
  let component: LaborDeleteComponent;
  let fixture: ComponentFixture<LaborDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaborDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

