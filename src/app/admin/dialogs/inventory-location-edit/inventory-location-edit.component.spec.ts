import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryLocationEditComponent } from './inventory-location-edit.component';

describe('InventoryLocationEditComponent', () => {
  let component: InventoryLocationEditComponent;
  let fixture: ComponentFixture<InventoryLocationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryLocationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryLocationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

