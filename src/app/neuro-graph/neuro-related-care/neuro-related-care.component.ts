import { Component, OnInit } from '@angular/core';
import {BrokerService} from '../../fire-base/broker.service';
@Component({
  selector: 'app-neuro-related-care',
  templateUrl: './neuro-related-care.component.html',
  styleUrls: ['./neuro-related-care.component.sass']
})
export class NeuroRelatedCareComponent implements OnInit {
  subscriptions:any;
  constructor(private brokerService:BrokerService) { }
  testValue:String='Initial value';
  ngOnInit() {
    this.subscriptions = this
      .brokerService
      .filterOn('test')
      .subscribe(d => {
        this.testValue = d.data;
      });
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

}
