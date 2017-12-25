import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BliCardComponent } from './bli-card.component';

describe('BliCardComponent', () => {
  let component: BliCardComponent;
  let fixture: ComponentFixture<BliCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BliCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BliCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
