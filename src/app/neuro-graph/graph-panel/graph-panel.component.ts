import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GRAPH_SETTINGS } from '../neuro-graph.config';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph-panel',
  templateUrl: './graph-panel.component.html',
  styleUrls: ['./graph-panel.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class GraphPanelComponent implements OnInit {
  isEdssSelected: boolean = false;
  private state: any;
  private graphSetting = GRAPH_SETTINGS;

  constructor() { }

  ngOnInit() {
    console.log('graph-panel ngOnInit');
    this.state = this.getDefaultState();
  }

  getXDomain(zoomOption) {
    //Currently dates are static. Later will be set dynamically based on zoom options.
    //Calculate range
    return {
      defaultMinValue: new Date(2015, 0, 1),
      defaultMaxValue: new Date(2017, 11, 31),
      currentMinValue: new Date(2015, 0, 1),
      currentMaxValue: new Date(2017, 11, 31)
    };
  }

  getXScale(dimension, xDomain): any {
    return d3.scaleTime()
      .domain([xDomain.currentMinValue, xDomain.currentMaxValue])
      .range([0, dimension.width])
  }

  getDefaultState() {
    let state: any = {};
    state.canvasDimension = {
      offsetHeight: GRAPH_SETTINGS.panel.offsetHeight,
      offsetWidth: GRAPH_SETTINGS.panel.offsetWidth,
      height: GRAPH_SETTINGS.panel.offsetHeight - GRAPH_SETTINGS.panel.marginTop - GRAPH_SETTINGS.panel.marginBottom,
      width: GRAPH_SETTINGS.panel.offsetWidth - GRAPH_SETTINGS.panel.marginLeft - GRAPH_SETTINGS.panel.marginRight,
      marginTop: GRAPH_SETTINGS.panel.marginTop,
      marginRight: GRAPH_SETTINGS.panel.marginRight,
      marginBottom: GRAPH_SETTINGS.panel.marginBottom,
      marginLeft: GRAPH_SETTINGS.panel.marginLeft
    };
    state.xDomain = this.getXDomain(null);
    state.xScale = this.getXScale(state.canvasDimension, state.xDomain);
    return state;
  }
}
