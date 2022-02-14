import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryGroupDeleteComponent } from './inventory-group-delete.component';

describe('InventoryGroupDeleteComponent', () => {
  let component: InventoryGroupDeleteComponent;
  let fixture: ComponentFixture<InventoryGroupDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryGroupDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryGroupDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

