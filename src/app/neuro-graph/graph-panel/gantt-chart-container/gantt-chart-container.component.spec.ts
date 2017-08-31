import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttChartContainerComponent } from './gantt-chart-container.component';

describe('GanttChartContainerComponent', () => {
  let component: GanttChartContainerComponent;
  let fixture: ComponentFixture<GanttChartContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttChartContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttChartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
