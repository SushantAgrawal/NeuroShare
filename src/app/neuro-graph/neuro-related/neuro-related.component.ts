import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import {Dialog} from 'primeng/primeng'; import { ActivatedRoute} from
// '@angular/router';
import { BrokerService } from '../../broker/broker.service';
import { allMessages, allHttpMessages } from '../neuro-graph.config';

// import {EnumMedicationtypes} from '../neuro-graph.helper';

@Component({
  selector: 'app-neuro-related',
  templateUrl: './neuro-related.component.html',
  styleUrls: ['./neuro-related.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NeuroRelatedComponent implements OnInit {
  display: Boolean = false;
  constructor(private brokerService: BrokerService) { }

  ngOnInit() {
    console.log('neuro-related ngOnInit');
  }

  changed(e, value) {
    this
      .brokerService
      .emit(allMessages.neuroRelated, {
        artifact: value,
        checked: e.target.checked
      });
  }
}
