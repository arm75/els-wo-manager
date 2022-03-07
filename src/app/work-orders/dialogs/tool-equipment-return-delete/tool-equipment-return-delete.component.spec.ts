import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolEquipmentReturnDeleteComponent } from './tool-equipment-return-delete.component';

describe('ToolEquipmentReturnDeleteComponent', () => {
  let component: ToolEquipmentReturnDeleteComponent;
  let fixture: ComponentFixture<ToolEquipmentReturnDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolEquipmentReturnDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolEquipmentReturnDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

