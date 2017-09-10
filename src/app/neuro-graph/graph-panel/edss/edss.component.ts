import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import {BrokerService} from '../../../fire-base/broker.service';
import {allMessages, allHttpMessages, medication} from '../../neuro-graph.config';
import {GRAPH_SETTINGS} from '../../neuro-graph.config';

@Component({selector: '[app-edss]', templateUrl: './edss.component.html', styleUrls: ['./edss.component.sass'], encapsulation: ViewEncapsulation.None})
export class EdssComponent implements OnInit {
  @Input()private chartState : any;

  constructor(private brokerService : BrokerService) {}
  private subscriptions : any;
  private yScale : any;
  private yDomain : Array < number > = [0, GRAPH_SETTINGS.edss.maxValueY];
  private edssData : Array < any >;
  //This is temporary data set
<<<<<<< HEAD
  private dataset : Array < any > = [
    {
      'x': new Date(2015, 6, 1),
      'y': 2
    }, {
      'x': new Date(2016, 0, 1),
      'y': 2.5
    }, {
      'x': new Date(2016, 6, 1),
      'y': 2.5
    }, {
      'x': new Date(2017, 0, 1),
      'y': 3.0
    }, {
      'x': new Date(2017, 6, 1),
      'y': 3.5
    }
=======
  private dataset: Array<any> = [
    { last_updated_instant: new Date(2015, 6, 1), score: 2.0 },
    { last_updated_instant: new Date(2016, 0, 1), score: 2.5 },
    { last_updated_instant: new Date(2016, 6, 1), score: 2.5 },
    { last_updated_instant: new Date(2017, 0, 1), score: 3.0 },
    { last_updated_instant: new Date(2017, 6, 1), score: 3.5 },
>>>>>>> 052de2b7a98f9e97adb63bea59eaccb846dcf218
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
            this.edssData = d.data;
            //drawEDSS
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
            //remove EDSS
          })();
      })
    this
      .subscriptions
      .add(sub1)
      .add(sub2);
    // this.subscriptions = this.brokerService   .filterOn(allMessages.neuroRelated)
    //   .subscribe(d => {     d.data.artifact == 'edss' && d.data.checked &&
    // this.drawChart();     d.data.artifact == 'edss' && !d.data.checked &&
    // this.removeChart();   });
  }

  ngOnDestroy() {
    this
      .subscriptions
      .unsubscribe();
  }

  drawChart() {
    this.yScale = d3
      .scaleLinear()
      .domain(this.yDomain)
      .range([
        GRAPH_SETTINGS.edss.chartHeight - 20,
        0
      ]);

    let line = d3.line<any>()
      .x((d: any) => this.chartState.xScale(d.last_updated_instant))
      .y((d: any) => this.yScale(d.score));

    let svg = d3
      .select('#edss')
      .append('g')
      .attr('class', 'edss-elements-wrapper')
      .attr('transform', 'translate(' + GRAPH_SETTINGS.panel.marginLeft + ', 5)');

    svg
      .append('g')
      .attr('class', 'edss-y-axis')
      .call(g => {
        let yAxis = g.call(d3.axisLeft(this.yScale).tickFormat(d3.format('.1f')));
        g
          .select('.domain')
          .remove();
        yAxis
          .selectAll('line')
          .style('display', 'none');
        yAxis
          .selectAll('text')
          .attr('x', '-5')
          .attr('fill', GRAPH_SETTINGS.edss.color)
          .style('font-size', '1.2em')
          .style('font-weight', 'bold');
      });

    svg
      .append('path')
      .datum(this.dataset)
      .attr('class', 'line')
      .style('fill', 'none')
      .style('stroke', GRAPH_SETTINGS.edss.color)
      .style('stroke-width', '1')
      .attr('d', line);

    svg
      .selectAll('.dot')
      .data(this.dataset)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => this.chartState.xScale(d.last_updated_instant))
      .attr('cy', d => this.yScale(d.score))
      .attr('r', 7)
      .style('fill', GRAPH_SETTINGS.edss.color)
      .style('stroke', '#FFFFFF')
      .style('cursor', 'pointer')
      .on('mouseover', d => {
        d3
          .select(d3.event.currentTarget)
          .style('stroke', '#000000');
      })
      .on('mouseout', d => {
        d3
          .select(d3.event.currentTarget)
          .style('stroke', '#FFFFFF');
      })
      .on('click', d => {
        console.log(d);
      })

    svg
      .selectAll('.label')
      .data(this.dataset)
      .enter()
      .append('text')
      .attr('class', 'label')
      .style('font-size', '0.8em')
      .attr('x', d => this.chartState.xScale(d.last_updated_instant) - 5)
      .attr('y', d => this.yScale(d.score) - 10)
      .text(d => d.score);

  }

  removeChart() {
    d3
      .selectAll('.edss-elements-wrapper')
      .remove();
  }
}
