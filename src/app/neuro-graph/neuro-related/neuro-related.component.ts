import {Component, OnInit} from '@angular/core';
import {BrokerService} from '../../broker/broker.service';
import {allMessages, allHttpMessages, manyHttpMessages} from '../neuro-graph.config';

@Component({selector: 'app-neuro-related', templateUrl: './neuro-related.component.html', styleUrls: ['./neuro-related.component.sass']})
export class NeuroRelatedComponent implements OnInit {
  display : Boolean = false;
  constructor(private brokerService : BrokerService) {}

  ngOnInit() {
    console.log('neuro-related ngOnInit');
    this
      .brokerService
      .filterOn(manyHttpMessages.httpGetTestMany)
      .subscribe(d => {
        console.log(d);
      })
  }

  changed(e, value) {
    this
      .brokerService
      .emit(allMessages.neuroRelated, {
        artifact: value,
        checked: e.target.checked
      });
  }

  testMany() {
    this
      .brokerService
      .httpGetMany(manyHttpMessages.httpGetTestMany, [
        {
          urlId: allHttpMessages.httpGetEdss
        }, {
          urlId: allHttpMessages.httpGetMedications
        }
      ]);
  }
}
