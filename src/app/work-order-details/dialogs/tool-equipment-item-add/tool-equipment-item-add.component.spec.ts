import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolEquipmentItemAddComponent } from './tool-equipment-item-add.component';

describe('ToolEquipmentItemAddComponent', () => {
  let component: ToolEquipmentItemAddComponent;
  let fixture: ComponentFixture<ToolEquipmentItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolEquipmentItemAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolEquipmentItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

