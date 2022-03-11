import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingTableComponent } from './processing-table.component';

describe('ProcessingTableComponent', () => {
  let component: ProcessingTableComponent;
  let fixture: ComponentFixture<ProcessingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
