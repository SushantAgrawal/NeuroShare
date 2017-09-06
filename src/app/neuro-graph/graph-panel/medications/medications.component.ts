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
    this.drawMedications();
  }
  drawMedications() {
    //Remove below code and draw charts for DMT, Othermeds and Vitamin D
    d3.select("#medications")      
      .append('g')
      .attr('transform', 'translate(100 0)')
      .append("circle")
      .attr("r", 30)
      .attr("cx", 50)
      .attr("cy", 50)
      .attr('fill', 'red');
      
      d3.select("#medications")
      .append('g')
      .attr('transform', 'translate(100 50)')
      .append("circle")
      .attr("r", 30)
      .attr("cx", 50)
      .attr("cy", 50)
      .attr('fill', 'red');

      d3.select("#medications")
      .append('g')
      .attr('transform', 'translate(100 100)')
      .append("circle")
      .attr("r", 30)
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
