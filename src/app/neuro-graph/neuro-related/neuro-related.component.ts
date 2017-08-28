import { Component, OnInit } from '@angular/core';
import {BrokerService} from '../../fire-base/broker.service'
@Component({
  selector: 'app-neuro-related',
  templateUrl: './neuro-related.component.html',
  styleUrls: ['./neuro-related.component.sass']
})
export class NeuroRelatedComponent implements OnInit {

  constructor(private brokerService:BrokerService) { }

  ngOnInit() {
  }

  checkBoxClicked(source:String){
    this.brokerService.emit('test', source.concat(' clicked'));
    this.brokerService.httpGet('http:get:test',[{name:'type',value:source}],[{name:'x-access-token',value:'ABCD'}]);
  }

}
