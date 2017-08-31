import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { CanvasDimension, XDomain, RootGraphContainerState } from '../model/shared.model';
import { RootGraphContainerHelper } from './root-graph-container.helper';
import {BrokerService} from '../../../fire-base/broker.service';

@Component({
  selector: 'app-root-graph-container',
  templateUrl: './root-graph-container.component.html',
  styleUrls: ['./root-graph-container.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RootGraphContainerComponent implements OnInit {
  @ViewChild('rootgraphcontainer') private rootGraphContainer: ElementRef;
  private state: RootGraphContainerState;
  private helper: RootGraphContainerHelper;

  constructor() {
    this.helper = new RootGraphContainerHelper();
  }

  ngOnInit() {
    this.state = this.helper.getDefaultState(this.rootGraphContainer);
    this.helper.drawRootElement(this.rootGraphContainer, this.state);
  };

  ngOnChanges() {
  }

  zoom(event) {
    debugger;
    // let xDomain = this.helper.getXDomain(new Date(2015, 7, 1), new Date(2017, 6, 30));
    // let xScale = this.helper.getXScale(this.state.canvasDimension, this.state.xDomain);

    // this.state = { ...this.state, xDomain, xScale }
    // this.helper.drawRootElement(this.rootGraphContainer, this.state);
  }
}
