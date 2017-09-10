import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { BrokerService } from '../../../fire-base/broker.service';
import { allMessages, allHttpMessages, medication } from '../../neuro-graph.config';
import { GRAPH_SETTINGS } from '../../neuro-graph.config';

@Component({ selector: '[app-edss]', templateUrl: './edss.component.html', styleUrls: ['./edss.component.sass'], encapsulation: ViewEncapsulation.None })
export class EdssComponent implements OnInit {
  @Input() private chartState: any;

  constructor(private brokerService: BrokerService) { }
  private subscriptions: any;
  private yScale: any;
  private yDomain: Array<number> = [0, GRAPH_SETTINGS.edss.maxValueY];
  private edssData: Array<any>;
  //This is temporary data set
  private dataset: Array<any> = [
    { last_updated_instant: "01/31/2015 10:41:05", score: "2.0" },
    { last_updated_instant: "07/31/2015 10:41:05", score: "2.5" },
    { last_updated_instant: "01/31/2016 10:41:05", score: "2.5" },
    { last_updated_instant: "07/31/2016 10:41:05", score: "3.0" },
    { last_updated_instant: "08/31/2017 10:41:05", score: "3.5" },
  ];

  ngOnInit() {
    console.log('edss ngOnInit');
    this.subscriptions = this
      .brokerService
      .filterOn(allHttpMessages.httpGetEdss)
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            console.log(d.data);
            debugger;
            this.edssData = d.data.edss_scores;
            this.drawChart();
          })();
      })
    let edss = this
      .brokerService
      .filterOn(allMessages.neuroRelated)
      .filter(t => (t.data.artifact == 'edss'));

    let sub1 = edss
      .filter(t => t.data.checked)
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            console.log(d.data);
            //make api call
            this
              .brokerService
              .httpGet(allHttpMessages.httpGetEdss);
          })();
      });
    let sub2 = edss
      .filter(t => !t.data.checked)
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            console.log(d.data);
            this.removeChart();
          })();
      })
    this
      .subscriptions
      .add(sub1)
      .add(sub2);
  }

  ngOnDestroy() {
    this
      .subscriptions
      .unsubscribe();
  }

  drawChart() {
    //data prepare
    let dataset = this.edssData.map(d => {
      return {
        ...d,
        lastUpdatedDate: Date.parse(d.last_updated_instant),
        scoreValue: parseFloat(d.score)
      }
    }).sort((a, b) => a.lastUpdatedDate - b.lastUpdatedDate);

    this.yScale = d3
      .scaleLinear()
      .domain(this.yDomain)
      .range([GRAPH_SETTINGS.edss.chartHeight - 20, 0]);

    let line = d3.line<any>()
      .x((d: any) => this.chartState.xScale(d.lastUpdatedDate))
      .y((d: any) => this.yScale(d.scoreValue));

    let svg = d3
      .select('#edss')
      .append('g')
      .attr('class', 'edss-elements-wrapper')
      .attr('transform', 'translate(' + GRAPH_SETTINGS.panel.marginLeft + ', 5)');

    svg.append('g')
      .attr('class', 'edss-y-axis')
      .call(g => {
        let yAxis = g.call(d3.axisLeft(this.yScale).tickFormat(d3.format('.1f')));
        g.select('.domain').remove();
        yAxis.selectAll('line')
          .style('display', 'none');
        yAxis.selectAll('text')
          .attr('x', '-5')
          .attr('fill', GRAPH_SETTINGS.edss.color)
          .style('font-size', '1.2em')
          .style('font-weight', 'bold');
      });

    svg.append('path')
      .datum(dataset)
      .attr('class', 'line')
      .style('fill', 'none')
      .style('stroke', GRAPH_SETTINGS.edss.color)
      .style('stroke-width', '1')
      .attr('d', line);

    svg.selectAll('.dot')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => this.chartState.xScale(d.lastUpdatedDate))
      .attr('cy', d => this.yScale(d.scoreValue))
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
      .data(dataset)
      .enter()
      .append('text')
      .attr('class', 'label')
      .style('font-size', '0.8em')
      .attr('x', d => this.chartState.xScale(d.lastUpdatedDate) - 5)
      .attr('y', d => this.yScale(d.scoreValue) - 10)
      .text(d => d.scoreValue);

  }

  removeChart() {
    d3.selectAll('.edss-elements-wrapper').remove();
  }
}
