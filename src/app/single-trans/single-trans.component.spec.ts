import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTransComponent } from './single-trans.component';

describe('SingleTransComponent', () => {
  let component: SingleTransComponent;
  let fixture: ComponentFixture<SingleTransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
