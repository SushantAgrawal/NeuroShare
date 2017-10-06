import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { GRAPH_SETTINGS } from '../../neuro-graph.config';
import { BrokerService } from '../../broker/broker.service';
import { allMessages, allHttpMessages } from '../../neuro-graph.config';

@Component({
  selector: '[app-labs]',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LabsComponent implements OnInit {
  @Input() private chartState: any;
  private chart: any;
  private width: number;
  private height: number;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  private yScale: any;
  private yDomain: Array<number> = [0, 1];
  private lineA: any;
  private pathUpdate: any;
  private datasetA: Array<any> = [
    { "x": new Date("07/05/2015"), "y": 0, "axis": 3.0 },
    { "x": new Date("07/05/2016"), "y": 50, "axis": 3.0 },
    { "x": new Date("07/05/2017"), "y": 100, "axis": 3.0 },
  ];

  constructor(private brokerService: BrokerService) { }

  ngOnInit() {
    let labs = this
      .brokerService
      .filterOn(allMessages.neuroRelated)
      .filter(t => (t.data.artifact == 'labs'));

    let sub1 = labs
      .filter(t => t.data.checked)
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            console.log(d.data);
            //make api call
            this.createChart();
          })();
      });

    let sub2 = labs
      .filter(t => !t.data.checked)
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            console.log(d.data);
            this.removeChart();
          })();
      })
  }
  removeChart() {
    d3.select('#labs').selectAll("*").remove();
  }
  createChart() {
    let element = d3.select("#labs");
    this.width = GRAPH_SETTINGS.panel.offsetWidth - GRAPH_SETTINGS.panel.marginLeft - GRAPH_SETTINGS.panel.marginRight;
    this.height = GRAPH_SETTINGS.panel.offsetHeight - GRAPH_SETTINGS.panel.marginTop - GRAPH_SETTINGS.panel.marginBottom;

    this.yScale = d3
      .scaleLinear()
      .domain(this.yDomain)
      .range([GRAPH_SETTINGS.labs.chartHeight - 20, 0]);

    this.lineA = d3.line<any>()
      .x((d: any) => this.chartState.xScale(d.x))
      .y((d: any) => this.yScale(d.axis));

    this.chart = d3.select("#labs")
      .attr("transform", "translate(" + GRAPH_SETTINGS.panel.marginLeft + "," + GRAPH_SETTINGS.labs.positionTop + ")");

    this.pathUpdate = this.chart.append("path")
      .datum([
        { "x": this.chartState.xDomain.defaultMinValue, "axis": 3.0 },
        { "x": this.chartState.xDomain.defaultMaxValue, "axis": 3.0 }
      ])
      .attr("d", this.lineA)
      .attr("stroke", "#00AAA5")
      .attr("stroke-width", "10")
      .attr("opacity", "0.25")
      .attr("fill", "none")
      .attr("class", "lineA")

    let gradLab = this.chart
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradLab")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "100%")
      .attr("y2", "0%");

    gradLab.append("stop").attr("offset", "50%").style("stop-color", "#00AAA5");
    gradLab.append("stop").attr("offset", "50%").style("stop-color", "white");


    this.chart.selectAll(".dotA")
      .data(this.datasetA)
      .enter()
      .append("circle")
      .attr("class", "dotA")
      .attr("cx", d => this.chartState.xScale(d.x))
      .attr("cy", d => this.yScale(d.axis))
      .attr("r", 10)
      .attr('class', 'x-axis-arrow')
      .style("stroke", "#00AAA5")
      .style("fill", d => {
        let returnColor;
        if (d.y == 0) {
          returnColor = "#FFF"
        }
        else if (d.y == 100) {
          returnColor = "#00AAA5"
        }
        else {
          returnColor = "url(#gradLab)"
        }
        return returnColor;
      })
      .on('click', d => {
      })

    this.chart.append("text")
      .attr("transform", "translate(" + this.chartState.xScale(this.chartState.xDomain.defaultMinValue) + "," + "3.0" + ")")
      .attr("dy", this.yScale(3.0))
      .attr("text-anchor", "start")
      .attr("font-size", "10px")
      .text("Labs");
  }
}
