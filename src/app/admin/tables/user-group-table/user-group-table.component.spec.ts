import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupsTableComponent } from './user-groups-table.component';

describe('UserGroupsTableComponent', () => {
  let component: UserGroupsTableComponent;
  let fixture: ComponentFixture<UserGroupsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGroupsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
