import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepasswdComponent } from './changepasswd.component';

describe('ChangepasswdComponent', () => {
  let component: ChangepasswdComponent;
  let fixture: ComponentFixture<ChangepasswdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangepasswdComponent]
    });
    fixture = TestBed.createComponent(ChangepasswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
