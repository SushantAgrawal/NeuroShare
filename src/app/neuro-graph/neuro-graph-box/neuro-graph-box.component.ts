import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { envs } from '../../app.config';
import { allMessages, allHttpMessages } from '../neuro-graph.config';
import { BrokerService } from '../../broker/broker.service';
import { NeuroGraphService } from '../neuro-graph.service';

//changeDetection is important
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-neuro-graph-box',
  templateUrl: './neuro-graph-box.component.html',
  styleUrls: ['./neuro-graph-box.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NeuroGraphBoxComponent implements OnInit {

  constructor(private brokerService: BrokerService, private neuroGraphService: NeuroGraphService) {
    this.brokerService.init(this.neuroGraphService.get('urlMaps'));
  }

  ngAfterViewInit() {
    console.log('neuro-graph-box ngAfterViewInit');

    this.brokerService.emit(allMessages.neuroRelated, {
      artifact: 'dmt',
      checked: true
    });
    this.brokerService.emit(allMessages.neuroRelated, {
      artifact: 'edss',
      checked: true
    });
    this.brokerService.emit(allMessages.neuroRelated, {
      artifact: 'labs',
      checked: true
    });
  }

  ngOnInit() {
    console.log('neuro-graph-box ngOnInit');
  }

}
