import {Component, OnInit} from '@angular/core';
// import { ActivatedRoute} from '@angular/router';
import {BrokerService} from '../../fire-base/broker.service';
import {allMessages, allHttpMessages} from '../neuro-graph.config';

// import {EnumMedicationtypes} from '../neuro-graph.helper';

@Component({selector: 'app-neuro-related', templateUrl: './neuro-related.component.html', styleUrls: ['./neuro-related.component.sass']})
export class NeuroRelatedComponent implements OnInit {

  constructor(private brokerService : BrokerService) {}
  paramsSub : any;
  ngOnInit() {
    console.log('neuro-related');
    // this.paramsSub = this
    //   .activatedRoute
    //   .queryParams
    //   .subscribe(params => {
    //     console.log(params);        
    //   });
  }

  // ngAfterViewInit(){   this   .brokerService   .emit('neuro:related',
  // {artifact:'dmt', checked: true}); }

  changed(e, value) {
    let localMessage = {
      artifact: value,
      checked: e.target.checked
    };
    this
      .brokerService
      .emit(allMessages.neuroRelated, localMessage);

    e.target.checked && ((value == 'dmt') || (value == 'otherMeds') || (value == 'vitaminD')) && this
      .brokerService
      .httpGet(allHttpMessages.httpGetMedications, localMessage);
  }
}
