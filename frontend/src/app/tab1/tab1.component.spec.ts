import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab1Component } from './tab1.component';

describe('Tab1Component', () => {
  let component: Tab1Component;
  let fixture: ComponentFixture<Tab1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tab1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tab1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
