import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRangesliderComponent } from './ngx-rangeslider.component';

describe('NgxRangesliderComponent', () => {
  let component: NgxRangesliderComponent;
  let fixture: ComponentFixture<NgxRangesliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxRangesliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRangesliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
