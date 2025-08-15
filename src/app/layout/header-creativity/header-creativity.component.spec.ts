import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderCreativityComponent } from './header-creativity.component';

describe('HeaderCreativityComponent', () => {
  let component: HeaderCreativityComponent;
  let fixture: ComponentFixture<HeaderCreativityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderCreativityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCreativityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
