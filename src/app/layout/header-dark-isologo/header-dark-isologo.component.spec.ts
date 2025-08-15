import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderDarkIsologoComponent } from './header-dark-isologo.component';

describe('HeaderDarkIsologoComponent', () => {
  let component: HeaderDarkIsologoComponent;
  let fixture: ComponentFixture<HeaderDarkIsologoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderDarkIsologoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDarkIsologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
