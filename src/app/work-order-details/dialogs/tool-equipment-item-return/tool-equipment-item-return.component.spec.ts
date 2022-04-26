import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolEquipmentItemReturnComponent } from './tool-equipment-item-return.component';

describe('ToolEquipmentItemReturnComponent', () => {
  let component: ToolEquipmentItemReturnComponent;
  let fixture: ComponentFixture<ToolEquipmentItemReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolEquipmentItemReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolEquipmentItemReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
