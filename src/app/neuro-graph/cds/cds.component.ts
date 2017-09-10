import {Component, OnInit} from '@angular/core';
import {BrokerService} from '../../fire-base/broker.service';
import {cds, allMessages} from '../neuro-graph.config';

@Component({selector: 'app-cds', templateUrl: './cds.component.html', styleUrls: ['./cds.component.sass']})
export class CdsComponent implements OnInit {
  subscriptions : any;
  cdsState : Object = {};
  display : Boolean = false;
  dismissableMask=true;
  header:String='';
  // relapses = true;
  constructor(private brokerService : BrokerService) {
    this.cdsState = {
      relapses: false,
      imaging: false,
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
        let cdsTarget : [any] = cds[cdsSource];
        let checked = d.data.checked;
        checked && (cdsTarget && cdsTarget.map(x => this.cdsState[x] = true));
      });
    this
      .brokerService
      .emit(allMessages.neuroRelated, {
        artifact: 'dmt',
        checked: true
      });
    this
      .brokerService
      .emit(allMessages.neuroRelated, {
        artifact: 'edss',
        checked: true
      });
    this
      .brokerService
      .emit(allMessages.neuroRelated, {
        artifact: 'labs',
        checked: true
      });
  }

  buttonClicked(item) {
    this.display=true;
    this.header = item;
  }

  // ngAfterViewInit(){ }

  ngOnDestroy() {
    this
      .subscriptions
      .unsubscribe();
  }

}
