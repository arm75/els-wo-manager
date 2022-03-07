import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolEquipmentReturnEditComponent } from './tool-equipment-return-edit.component';

describe('ToolEquipmentReturnEditComponent', () => {
  let component: ToolEquipmentReturnEditComponent;
  let fixture: ComponentFixture<ToolEquipmentReturnEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolEquipmentReturnEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolEquipmentReturnEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

