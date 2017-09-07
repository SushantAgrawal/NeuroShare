import {Component, OnInit, AfterViewInit} from '@angular/core';
import {envs} from '../../app.config';
import {allHttpMessages} from '../neuro-graph.config';
import {BrokerService} from '../../fire-base/broker.service';
import {NeuroGraphService} from '../neuro-graph.service';
// import {EnumMedicationtypes} from '../neuro-graph.helper';

@Component({selector: 'app-neuro-graph-box', templateUrl: './neuro-graph-box.component.html', styleUrls: ['./neuro-graph-box.component.sass']})
export class NeuroGraphBoxComponent implements OnInit {

  constructor(private brokerService : BrokerService, private neuroGraphService : NeuroGraphService) {
    this
      .brokerService
      .init(this.neuroGraphService.get('urlMaps'));
  }
  ngAfterViewInit() {
    // console.log('neuro-graph-box afterViewInit');
    let localMessage = {
      artifact: 'all',
      checked: true
    };
    this
      .brokerService
      .httpGet(allHttpMessages.httpGetMedications, localMessage);
  }
  ngOnInit() {}

}
