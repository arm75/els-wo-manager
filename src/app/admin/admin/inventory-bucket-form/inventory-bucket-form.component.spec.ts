import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryBucketFormComponent } from './inventory-bucket-form.component';

describe('InventoryBucketFormComponent', () => {
  let component: InventoryBucketFormComponent;
  let fixture: ComponentFixture<InventoryBucketFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryBucketFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryBucketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
