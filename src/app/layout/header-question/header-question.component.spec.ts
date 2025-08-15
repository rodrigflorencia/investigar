import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderQuestionComponent } from './header-question.component';

describe('HeaderQuestionComponent', () => {
  let component: HeaderQuestionComponent;
  let fixture: ComponentFixture<HeaderQuestionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
