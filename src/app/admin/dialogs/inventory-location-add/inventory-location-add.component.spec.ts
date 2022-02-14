import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryLocationAddComponent } from './inventory-location-add.component';

describe('InventoryLocationAddComponent', () => {
  let component: InventoryLocationAddComponent;
  let fixture: ComponentFixture<InventoryLocationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryLocationAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryLocationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

