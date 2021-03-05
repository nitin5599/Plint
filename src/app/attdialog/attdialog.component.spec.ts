import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttdialogComponent } from './attdialog.component';

describe('AttdialogComponent', () => {
  let component: AttdialogComponent;
  let fixture: ComponentFixture<AttdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
