import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolEquipmentReturnAddComponent } from './tool-equipment-return-add.component';

describe('ToolEquipmentReturnAddComponent', () => {
  let component: ToolEquipmentReturnAddComponent;
  let fixture: ComponentFixture<ToolEquipmentReturnAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolEquipmentReturnAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolEquipmentReturnAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

