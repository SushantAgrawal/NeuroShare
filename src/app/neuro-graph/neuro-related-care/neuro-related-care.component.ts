import { Component, OnInit} from '@angular/core';
import { BrokerService } from '../../fire-base/broker.service';
import { cds,allMessages } from '../neuro-graph.config';

@Component({
  selector: 'app-neuro-related-care',
  templateUrl: './neuro-related-care.component.html',
  styleUrls: ['./neuro-related-care.component.sass']
})
export class NeuroRelatedCareComponent implements OnInit {
  subscriptions: any;
  cdsState: Object = {};
  relapses = true;
  constructor(private brokerService: BrokerService) {
    this.cdsState = {
      relapses: false,
      images: false,
      symptomStatus: false,
      typeStatus: false,
      dmt: false,
      labs: false,
      vitaminD: false,
      otherMeds: false,
      referrals: false,
      vaccinations: false
    }
  }

  ngOnInit() {
    this.subscriptions = this
      .brokerService
      .filterOn(allMessages.neuroRelated)
      .subscribe(d => {
        let cdsSource = d.data.artifact;
        let cdsTarget: [any] = cds[cdsSource];
        let checked = d.data.checked;
        checked && (cdsTarget && cdsTarget.map(x => this.cdsState[x] = true));
      });
      this
      .brokerService
      .emit(allMessages.neuroRelated, {artifact:'dmt', checked: true});
  }

  // ngAfterViewInit(){
    
  // }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
