import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterTestComponent } from './after-test.component';

describe('AfterTestComponent', () => {
  let component: AfterTestComponent;
  let fixture: ComponentFixture<AfterTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
