import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompmeetComponent } from './compmeet.component';

describe('CompmeetComponent', () => {
  let component: CompmeetComponent;
  let fixture: ComponentFixture<CompmeetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompmeetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompmeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
