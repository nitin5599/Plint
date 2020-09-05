import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertripComponent } from './usertrip.component';

describe('UsertripComponent', () => {
  let component: UsertripComponent;
  let fixture: ComponentFixture<UsertripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
