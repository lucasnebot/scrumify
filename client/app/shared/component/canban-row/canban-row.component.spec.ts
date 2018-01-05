import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanbanRowComponent } from './canban-row.component';

describe('CanbanRowComponent', () => {
  let component: CanbanRowComponent;
  let fixture: ComponentFixture<CanbanRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanbanRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanbanRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
