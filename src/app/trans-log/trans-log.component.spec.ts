import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransLogComponent } from './trans-log.component';

describe('TransLogComponent', () => {
  let component: TransLogComponent;
  let fixture: ComponentFixture<TransLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
