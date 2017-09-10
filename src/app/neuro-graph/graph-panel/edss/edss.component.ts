import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { BrokerService } from '../../../fire-base/broker.service';
import { allMessages, allHttpMessages, medication } from '../../neuro-graph.config';
import { GRAPH_SETTINGS } from '../../neuro-graph.config';

@Component({
  selector: '[app-edss]',
  templateUrl: './edss.component.html',
  styleUrls: ['./edss.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class EdssComponent implements OnInit {
  @Input() private chartState: any;

  constructor(private brokerService: BrokerService) { }
  private subscriptions: any;
  private yScale: any;
  private yDomain: Array<number> = [0, GRAPH_SETTINGS.edss.maxValueY];

  //This is temporary data set
  private dataset: Array<any> = [
    { 'x': new Date(2015, 6, 1), 'y': 2 },
    { 'x': new Date(2016, 0, 1), 'y': 2.5 },
    { 'x': new Date(2016, 6, 1), 'y': 2.5 },
    { 'x': new Date(2017, 0, 1), 'y': 3.0 },
    { 'x': new Date(2017, 6, 1), 'y': 3.5 },
  ];

  ngOnInit() {
    this.subscriptions = this.brokerService
      .filterOn(allMessages.neuroRelated)
      .subscribe(d => {
        d.data.artifact == 'edss' && d.data.checked && this.drawChart();
        d.data.artifact == 'edss' && !d.data.checked && this.removeChart();
      });
  }

  drawChart() {
    this.yScale = d3.scaleLinear()
      .domain(this.yDomain)
      .range([GRAPH_SETTINGS.edss.chartHeight - 20, 0]);

    let line = d3.line<any>()
      .x((d: any) => this.chartState.xScale(d.x))
      .y((d: any) => this.yScale(d.y));

    let svg = d3.select('#edss')
      .append('g')
      .attr('class', 'edss-elements-wrapper')
      .attr('transform', 'translate(' + GRAPH_SETTINGS.panel.marginLeft + ', 5)');

    svg.append('g')
      .attr('class', 'edss-y-axis')
      .call(g => {
        let yAxis = g.call(d3.axisLeft(this.yScale).tickFormat(d3.format('.1f')));
        g.select('.domain').remove();
        yAxis.selectAll('line').style('display', 'none');
        yAxis.selectAll('text')
          .attr('x', '-5')
          .attr('fill', GRAPH_SETTINGS.edss.color)
          .style('font-size', '1.2em')
          .style('font-weight', 'bold');
      });

    svg.append('path')
      .datum(this.dataset)
      .attr('class', 'line')
      .style('fill', 'none')
      .style('stroke', GRAPH_SETTINGS.edss.color)
      .style('stroke-width', '1')
      .attr('d', line);

    svg.selectAll('.dot')
      .data(this.dataset)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => this.chartState.xScale(d.x))
      .attr('cy', d => this.yScale(d.y))
      .attr('r', 7)
      .style('fill', GRAPH_SETTINGS.edss.color)
      .style('stroke', '#FFFFFF')
      .style('cursor', 'pointer')
      .on('mouseover', d => {
        d3.select(d3.event.currentTarget)
          .style('stroke', '#000000');
      })
      .on('mouseout', d => {
        d3.select(d3.event.currentTarget)
          .style('stroke', '#FFFFFF');
      })
      .on('click', d => {
        console.log(d);
      })

    svg.selectAll('.label')
      .data(this.dataset)
      .enter()
      .append('text')
      .attr('class', 'label')
      .style('font-size', '0.8em')
      .attr('x', d => this.chartState.xScale(d.x) - 5)
      .attr('y', d => this.yScale(d.y) - 10)
      .text(d => d.y);

  }

  removeChart() {
    d3.selectAll('.edss-elements-wrapper').remove();
  }
}
