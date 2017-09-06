import { Component, OnInit } from '@angular/core';
import { BrokerService } from '../../../fire-base/broker.service';
import { allMessages, allHttpMessages } from '../../neuro-graph.config';
import * as d3 from 'd3';

@Component({
  selector: '[app-medications]',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.sass']
})
export class MedicationsComponent implements OnInit {
  subscriptions: any;
  constructor(private brokerService: BrokerService) { }

  ngOnInit() {
    this.subscriptions = this
      .brokerService
      .filterOn(allMessages.neuroRelated)
      .subscribe(d => {
        console.log(d.data);
        // this.neuroRelatedState[d.data.artifact] = d.data.checked;
      });
    this.subscriptions.add(this
      .brokerService
      .filterOn(allHttpMessages.httpGetMedications)
      .subscribe(d => {
        console.log(d.data);
      }));
    this.setLocation();

  }
  setLocation() {
    d3.select("#medications").attr('transform', 'translate(150 150)')
      // .append("circle")
      // .attr("r", 30)
      // .attr("cx", 50)
      // .attr("cy", 50)
      // .attr('fill', 'red');

    this.drawDmt();
  }
  
  drawDmt() {
    d3.select('#dmt')
      .attr('transform', 'translate(10 10)')
      .append("circle")
      .attr("r", 20)
      .attr("cx", 50)
      .attr("cy", 50)
      .attr('fill', 'red');
    
      d3.select('#other-meds')
      .attr('transform', 'translate(30 30)')
      .append("circle")
      .attr("r", 20)
      .attr("cx", 50)
      .attr("cy", 50)
      .attr('fill', 'red');

  }

  ngOnDestroy() {
    this
      .subscriptions
      .unsubscribe();
  }

}
