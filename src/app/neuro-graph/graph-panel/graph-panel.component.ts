import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { GRAPH_SETTINGS } from '../neuro-graph.config';
import * as d3 from 'd3';
import { BrokerService } from '../broker/broker.service';
import { allMessages } from '../neuro-graph.config';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-graph-panel',
  templateUrl: './graph-panel.component.html',
  styleUrls: ['./graph-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphPanelComponent implements OnInit {
  @ViewChild('virtualCaseloadInfoTemplate') private virtualCaseloadInfoTemplate: TemplateRef<any>;
  private virtualCaseloadInfoDialogRef: MdDialogRef<any>;
  isEdssSelected: boolean = true;
  toggleVirtualCaseLoad: string = "Add Virtual Caseload";
  private state: any;
  private graphSetting = GRAPH_SETTINGS;

  constructor(private brokerService: BrokerService, private dialog: MdDialog, ) { }

  ngOnInit() {
    console.log('graph-panel ngOnInit');
    this.state = this.getDefaultState();

    let edss = this
      .brokerService
      .filterOn(allMessages.neuroRelated)
      .filter(t => (t.data.artifact == 'edss'));

    edss
      .filter(t => t.data.checked)
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            console.log(d.data);
            this.isEdssSelected = true;
            this.toggleVirtualCaseLoad = "Add Virtual Caseload";
          })();
      });

    edss
      .filter(t => !t.data.checked)
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            this.isEdssSelected = false;
          })();
      })
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

  toggleEdssVirtualCaseload() {
    let value = "";
    if (this.toggleVirtualCaseLoad == "Add Virtual Caseload") {
      this.toggleVirtualCaseLoad = "Remove Virtual Caseload"
      value = "add";
    }
    else {
      this.toggleVirtualCaseLoad = "Add Virtual Caseload"
      value = "remove";
    }

    this
      .brokerService
      .emit(allMessages.virtualCaseload, {
        artifact: value
      });
  }

  showVirtualCaseloadInfo(e) {
    let dialogConfig = { hasBackdrop: false, panelClass: 'virtual-caseload-info', width: '300px', height: '200px' };
    this.virtualCaseloadInfoDialogRef = this.dialog.open(this.virtualCaseloadInfoTemplate, dialogConfig);
    this.virtualCaseloadInfoDialogRef.updatePosition({ top: `${e.clientY}px`, left:`${e.clientX}px` });
  }
}
