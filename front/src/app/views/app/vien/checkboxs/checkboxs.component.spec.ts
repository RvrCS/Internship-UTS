import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxsComponent } from './checkboxs.component';

describe('CheckboxsComponent', () => {
  let component: CheckboxsComponent;
  let fixture: ComponentFixture<CheckboxsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
