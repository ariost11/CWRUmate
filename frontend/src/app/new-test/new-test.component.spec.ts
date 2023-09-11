import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTestComponent } from './new-test.component';

describe('NewTestComponent', () => {
  let component: NewTestComponent;
  let fixture: ComponentFixture<NewTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTestComponent]
    });
    fixture = TestBed.createComponent(NewTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
