import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleusertripComponent } from './singleusertrip.component';

describe('SingleusertripComponent', () => {
  let component: SingleusertripComponent;
  let fixture: ComponentFixture<SingleusertripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleusertripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleusertripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
