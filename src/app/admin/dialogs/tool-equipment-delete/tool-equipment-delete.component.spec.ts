import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolEquipmentDeleteComponent } from './tool-equipment-delete.component';

describe('ToolEquipmentDeleteComponent', () => {
  let component: ToolEquipmentDeleteComponent;
  let fixture: ComponentFixture<ToolEquipmentDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolEquipmentDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolEquipmentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

