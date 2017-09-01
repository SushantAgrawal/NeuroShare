import { Component, OnInit } from '@angular/core';
import { BrokerService } from '../../fire-base/broker.service';
import { cds } from '../neuro-graph.config';

@Component({
  selector: 'app-neuro-related-care',
  templateUrl: './neuro-related-care.component.html',
  styleUrls: ['./neuro-related-care.component.sass']
})
export class NeuroRelatedCareComponent implements OnInit {
  subscriptions: any;
  cdsState: Object = {};
  relapses = true;
  constructor(private brokerService: BrokerService) { }
  // testValue:String='Initial value';
  ngOnInit() {
    this.subscriptions = this
      .brokerService
      .filterOn('neuro:related')
      .subscribe(d => {
        let cdsSource = d.artifact.value;
        // let cdsTarget = cds[]
        // this.testValue = d.data;
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
