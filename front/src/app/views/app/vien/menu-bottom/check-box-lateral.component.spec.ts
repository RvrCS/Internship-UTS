import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxLateralComponent } from './check-box-lateral.component';

describe('CheckBoxLateralComponent', () => {
  let component: CheckBoxLateralComponent;
  let fixture: ComponentFixture<CheckBoxLateralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBoxLateralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxLateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
