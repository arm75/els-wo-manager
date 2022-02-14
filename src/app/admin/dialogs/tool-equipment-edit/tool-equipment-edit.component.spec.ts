import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolEquipmentEditComponent } from './tool-equipment-edit.component';

describe('ToolEquipmentEditComponent', () => {
  let component: ToolEquipmentEditComponent;
  let fixture: ComponentFixture<ToolEquipmentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolEquipmentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolEquipmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

