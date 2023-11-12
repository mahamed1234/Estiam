import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeventsComponent } from './listevents.component';

describe('ListeventsComponent', () => {
  let component: ListeventsComponent;
  let fixture: ComponentFixture<ListeventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeventsComponent]
    });
    fixture = TestBed.createComponent(ListeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
