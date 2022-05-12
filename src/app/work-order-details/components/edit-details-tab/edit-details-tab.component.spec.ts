import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailsTabComponent } from './edit-details-tab.component';

describe('EditDetailsTabComponent', () => {
  let component: EditDetailsTabComponent;
  let fixture: ComponentFixture<EditDetailsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDetailsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDetailsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
