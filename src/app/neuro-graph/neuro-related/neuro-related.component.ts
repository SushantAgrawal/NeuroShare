import { Component, OnInit } from '@angular/core';
import { BrokerService } from '../../fire-base/broker.service';
import { ActionTypes } from '../../fire-base/fire-base.action-types';

@Component({
  selector: 'app-neuro-related',
  templateUrl: './neuro-related.component.html',
  styleUrls: ['./neuro-related.component.sass']
})
export class NeuroRelatedComponent implements OnInit {

  constructor(private brokerService: BrokerService) { }

  ngOnInit() {
  }

  // checkBoxClicked(source:String){
  //   this.brokerService.emit('test', source.concat(' clicked'));
  //   this.brokerService.httpGet('http:get:test',[{name:'type',value:source}],[{name:'x-access-token',value:'ABCD'}]);
  // }

  //Method to be updated. Switch case can be avoided by using factory pattern.
  //Emitting different actions so that chart components can register and listen to specific click action .
  //Filtering for specific chart type is done here only.
  //Action Types or Message Ids are kept in one place to avoid typos while subcribing in one or multiple components. 
  checkBoxClicked(source: String, event: any) {
    this.brokerService.emit(ActionTypes.LOG_OPERATION, source.concat(' clicked'));

    switch (source) {
      case 'DMT': {
        this.brokerService.emit(ActionTypes.DMT_CLICKED, event.target.checked);
        if (event.target.checked) {
          //Need to fix : Message Id string is kept in two places 1.app.config.ts and 2.fire-base.action-types.ts
          this.brokerService.httpGet(ActionTypes.HTTP_GET_DMT, [{ name: 'type', value: source }], [{ name: 'x-access-token', value: 'ABCD' }]);
        }
        break;
      }
      case 'Other Meds': {
        this.brokerService.emit(ActionTypes.OTHER_MEDS_CLICKED, event.target.checked);
        break;
      }
      case 'Vitamin D': {
        this.brokerService.emit(ActionTypes.VITAMINE_D_CLICKED, event.target.checked);
        break;
      }
      case 'Referrals': {
        this.brokerService.emit(ActionTypes.REFERRALS_CLICKED, event.target.checked);
        break;
      }
    }
  }
}
