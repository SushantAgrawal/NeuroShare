import { Component, OnInit, Input,ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { GRAPH_SETTINGS } from '../../neuro-graph.config';
import { BrokerService } from '../../broker/broker.service';
import { allMessages, allHttpMessages } from '../../neuro-graph.config';

@Component({
  selector: '[app-imaging]',
  templateUrl: './imaging.component.html',
  styleUrls: ['./imaging.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImagingComponent implements OnInit {
  //private margin: any = { top: 30, bottom: 30, left: 30, right: 30 };
  @Input() private chartState: any;
  private chart: any;
  private width: number;
  private height: number;
  //private xScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  private yScale: any;
  private yDomain: Array<number> = [0, GRAPH_SETTINGS.imaging.maxValueY];
  private lineA: any;
  private pathUpdate: any;
  private datasetA: Array<any> = [
    { "x": new Date("05/05/2015"), "y": 50,"axis":3.0 },
    { "x": new Date("05/05/2016"), "y": 0,"axis":3.0 },
    { "x": new Date("05/05/2017"), "y": 100,"axis":3.0 },
  ];

  constructor(private brokerService: BrokerService) { }

  ngOnInit() {
    let imaging = this
    .brokerService
    .filterOn(allMessages.neuroRelated)
    .filter(t => (t.data.artifact == 'imaging'));

    let sub1 = imaging
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

    let sub2 = imaging
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
    d3.select('#imaging').selectAll("*").remove();
  }
  createChart() {
    let element = d3.select("#imaging");
    this.width = GRAPH_SETTINGS.panel.offsetWidth - GRAPH_SETTINGS.panel.marginLeft - GRAPH_SETTINGS.panel.marginRight;
    this.height = GRAPH_SETTINGS.panel.offsetHeight - GRAPH_SETTINGS.panel.marginTop - GRAPH_SETTINGS.panel.marginBottom;

    this.yScale = d3
    .scaleLinear()
    .domain(this.yDomain)
    .range([GRAPH_SETTINGS.imaging.chartHeight - 20, 0]);

    //this.xScale = d3.scaleLinear().domain(this.chartState.xDomain).range([0, this.width, 0]);

      this.lineA = d3.line<any>()
      .x((d: any) => this.chartState.xScale(d.x))
      .y((d: any) => this.yScale(d.axis));
   
    this.chart = d3.select("#imaging").append("svg")
      .attr("width", element.offsetWidth)
      .attr("height", element.offsetHeight)
      .append("g")
      .attr("transform", "translate(" + GRAPH_SETTINGS.panel.marginLeft  + "," + GRAPH_SETTINGS.panel.marginTop + ")");

      this.pathUpdate = this.chart.append("path")
      .datum([
        { "x": this.chartState.xDomain.defaultMinValue, "axis": 3.0 },
        { "x": this.chartState.xDomain.defaultMaxValue, "axis": 3.0 }
      ])
      .attr("d", this.lineA)
      .attr("stroke","#BE90D4")
      .attr("stroke-width","10")
      .attr("opacity","0.25")
      .attr("fill","none")
      .attr("class", "lineA")
     
   

    let gradA = this.chart 
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradA")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "100%")
      .attr("y2", "0%");

    gradA.append("stop").attr("offset", "50%").style("stop-color", "#BE90D4");
    gradA.append("stop").attr("offset", "50%").style("stop-color", "white");

   
    this.chart.selectAll(".dotA")
      .data(this.datasetA)
      .enter()
      .append("circle")   
      .attr("class", "dotA")
      .attr("cx", d => this.chartState.xScale(d.x))
      .attr("cy", d => this.yScale(d.axis))
      .attr("r", 10)
      .style("stroke", "#BE90D4")
      .style("fill", d => {
        let returnColor;
        if (d.y == 0) {
          returnColor = "#FFF"
        }
        else if (d.y == 100) {
          returnColor = "#BE90D4"
        }
        else {
          returnColor = "url(#gradA)"
        }
        return returnColor;
      })
      
      this.chart.append("text")
      .attr("transform", "translate(" + this.chartState.xScale(this.chartState.xDomain.defaultMinValue) + "," + "3.0" + ")")
      .attr("dy", this.yScale(3.0))
      .attr("text-anchor", "start")
      .attr("font-size", "10px")
      .text("Images");

      
  }
}
