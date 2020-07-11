import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GravylangComponent } from './gravylang.component';

describe('GravylangComponent', () => {
  let component: GravylangComponent;
  let fixture: ComponentFixture<GravylangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GravylangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GravylangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
