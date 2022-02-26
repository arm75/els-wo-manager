import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolEquipmentItemDeleteComponent } from './tool-equipment-item-delete.component';

describe('ToolEquipmentItemDeleteComponent', () => {
  let component: ToolEquipmentItemDeleteComponent;
  let fixture: ComponentFixture<ToolEquipmentItemDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolEquipmentItemDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolEquipmentItemDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

