import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolEquipmentAddComponent } from './tool-equipment-add.component';

describe('ToolEquipmentAddComponent', () => {
  let component: ToolEquipmentAddComponent;
  let fixture: ComponentFixture<ToolEquipmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolEquipmentAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolEquipmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

