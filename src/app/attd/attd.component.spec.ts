import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttdComponent } from './attd.component';

describe('AttdComponent', () => {
  let component: AttdComponent;
  let fixture: ComponentFixture<AttdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
