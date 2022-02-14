import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryGroupEditComponent } from './inventory-group-edit.component';

describe('InventoryGroupEditComponent', () => {
  let component: InventoryGroupEditComponent;
  let fixture: ComponentFixture<InventoryGroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryGroupEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

