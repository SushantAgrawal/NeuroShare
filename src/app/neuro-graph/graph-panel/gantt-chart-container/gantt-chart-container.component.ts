import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { CanvasDimension, XDomain, RootGraphContainerState } from '../model/shared.model';

@Component({
  selector: '[app-gantt-chart-container]',
  templateUrl: './gantt-chart-container.component.html',
  styleUrls: ['./gantt-chart-container.component.css']
})
export class GanttChartContainerComponent implements OnInit {
  @Input() private chartState: RootGraphContainerState;

  constructor() {
  }

  ngOnInit() {
  };

}
