import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderDarkComponent } from './header-dark.component';

describe('HeaderDarkComponent', () => {
  let component: HeaderDarkComponent;
  let fixture: ComponentFixture<HeaderDarkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderDarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
