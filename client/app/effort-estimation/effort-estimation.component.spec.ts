import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffortEstimationComponent } from './effort-estimation.component';

describe('EffortEstimationComponent', () => {
  let component: EffortEstimationComponent;
  let fixture: ComponentFixture<EffortEstimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffortEstimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffortEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
