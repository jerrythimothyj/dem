import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswoRdComponent } from './forgot-passwo-rd.component';

describe('ForgotPasswoRdComponent', () => {
  let component: ForgotPasswoRdComponent;
  let fixture: ComponentFixture<ForgotPasswoRdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswoRdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswoRdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
