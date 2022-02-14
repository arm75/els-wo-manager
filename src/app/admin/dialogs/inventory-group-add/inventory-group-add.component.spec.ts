import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryGroupAddComponent } from './inventory-group-add.component';

describe('InventoryGroupAddComponent', () => {
  let component: InventoryGroupAddComponent;
  let fixture: ComponentFixture<InventoryGroupAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryGroupAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

