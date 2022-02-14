import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryLocationDeleteComponent } from './inventory-location-delete.component';

describe('InventoryLocationDeleteComponent', () => {
  let component: InventoryLocationDeleteComponent;
  let fixture: ComponentFixture<InventoryLocationDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryLocationDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryLocationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

