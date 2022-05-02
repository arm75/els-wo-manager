import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesCompletionTabComponent } from './notes-completion-tab.component';

describe('NotesCompletionTabComponent', () => {
  let component: NotesCompletionTabComponent;
  let fixture: ComponentFixture<NotesCompletionTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesCompletionTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesCompletionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
