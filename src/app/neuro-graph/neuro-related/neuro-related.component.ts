import {Component, OnInit} from '@angular/core';
import {BrokerService} from '../../fire-base/broker.service'
@Component({selector: 'app-neuro-related', templateUrl: './neuro-related.component.html', styleUrls: ['./neuro-related.component.sass']})
export class NeuroRelatedComponent implements OnInit {

  constructor(private brokerService : BrokerService) {}

  ngOnInit() {
    console.log('neuro-related');
  }

  // ngAfterViewInit(){
  //   this
  //   .brokerService
  //   .emit('neuro:related', {artifact:'dmt', checked: true});
  // }

  changed(e, value) {
    this
      .brokerService
      .emit('neuro:related', {artifact:value, checked: e.target.checked});
    e.target.checked && this
      .brokerService
      .httpGet('http:get:medications');    
  }
}
