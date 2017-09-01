import {Component, OnInit} from '@angular/core';
import {envs} from '../../app.config';
import {BrokerService} from '../../fire-base/broker.service';
import {NeuroGraphService} from '../neuro-graph.service';
// import {urlMaps} from '../neuro-graph.config';
@Component({selector: 'app-neuro-graph-box', templateUrl: './neuro-graph-box.component.html', styleUrls: ['./neuro-graph-box.component.sass']})
export class NeuroGraphBoxComponent implements OnInit {

  constructor(private brokerService : BrokerService, private neuroGraphService : NeuroGraphService) {
    this
      .brokerService
      .init(this.neuroGraphService.get('urlMaps'));
  }

  ngOnInit() {
    // let baseUrl = envs[envs.selectedEnv];    
  }

}
