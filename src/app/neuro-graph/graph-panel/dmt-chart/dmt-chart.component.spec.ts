import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmtChartComponent } from './dmt-chart.component';

describe('DmtChartComponent', () => {
  let component: DmtChartComponent;
  let fixture: ComponentFixture<DmtChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmtChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmtChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
