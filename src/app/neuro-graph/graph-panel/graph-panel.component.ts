import { Component, OnInit } from '@angular/core';
import { BrokerService } from '../../fire-base/broker.service';
import { allMessages, allHttpMessages } from '../neuro-graph.config';
import * as d3 from 'd3';
// import * as d3Scale from "d3-scale";
// import * as d3Shape from "d3-shape";
// import * as d3Array from "d3-array";
// import * as d3Axis from "d3-axis";
@Component({ selector: 'app-graph-panel', templateUrl: './graph-panel.component.html', styleUrls: ['./graph-panel.component.sass'] })
export class GraphPanelComponent implements OnInit {
  subscriptions: any;
  neuroRelatedState: any = {};
  constructor(private brokerService: BrokerService) { }

  ngOnInit() {
    this.subscriptions = this
      .brokerService
      .filterOn(allMessages.neuroRelated)
      .subscribe(d => {
        console.log(d.data);
        this.neuroRelatedState[d.data.artifact] = d.data.checked;
      });
    let sub1 = this
      .brokerService
      .filterOn(allHttpMessages.httpGetMedications)
      .subscribe(d => {
        console.log(d.data);
      });
    this
      .subscriptions
      .add(sub1);
      this.testDraw();
  }

  ngOnDestroy() {
    this
      .subscriptions
      .unsubscribe();
  }

  testDraw() {
    let circle = d3.select('#g1')
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr('fill', 'red')
      .attr("r", 30);

      let circle1 = d3.select('#g2')
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr('fill', 'red')
      .attr("r", 30);

      let circle2 = d3.select('#g3')
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr('fill', 'red')
      .attr("r", 30);
  }

}
/* Deprecated
let svgContainer = d3.select('svg');

        //Draw the Circle
        let circle = svgContainer
          .append("circle")
          .attr("cx", 150)
          .attr("cy", 50)
          .attr('fill', 'red')
          .attr("r", 40);

        svgContainer
          .selectAll("rect")
          .data([20, 30, 40,60,80])
          .enter()
          .append('rect')
          .attr('x', 10)
          .attr('y', (d, i) => (i + 1) * 20 -10)
          .attr('height', 10)
          .attr('width', d => d)
          .style("fill", "blue")
          .style("stroke", "black")
          .style("stroke-width", 2);

          // this.drawLine(svgContainer);
*/