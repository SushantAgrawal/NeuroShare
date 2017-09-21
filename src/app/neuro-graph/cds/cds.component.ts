import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation} from '@angular/core';
import {BrokerService} from '../../broker/broker.service';
import {NeuroGraphService} from '../neuro-graph.service';
import {Observable} from 'rxjs/Observable';
// import * as _ from 'lodash';
import {cdsMap, allMessages, manyHttpMessages, allHttpMessages} from '../neuro-graph.config';

@Component({selector: 'app-cds', templateUrl: './cds.component.html', styleUrls: ['./cds.component.sass'], encapsulation: ViewEncapsulation.None})
export class CdsComponent implements OnInit {
  selectedCdsInfo : any = {};
  subscriptions : any;
  cdsInfo : any;
  cdsUserData : any;
  cdsState : Object = {};
  csnState : any = {};
  constructor(private brokerService : BrokerService, private changeDetector : ChangeDetectorRef, private neuroGraphService : NeuroGraphService) {
    this.cdsState = {
      review_relapses: {
        checked: false
      },
      review_mri_images: {
        checked: false
      },
      review_symptom_status: {
        checked: false
      },
      review_ms_type_status: {
        checked: false
      },
      review_dmts: {
        checked: false
      },
      review_monitoring_labs: {
        checked: false
      },
      review_vitamin_d: {
        checked: false
      },
      review_other_meds: {
        checked: false
      },
      review_symptoms_referrals: {
        checked: false
      },
      review_vaccinations: {
        checked: false
      }
    }
  }

  ngOnInit() {
    this.subscriptions = this
      .brokerService
      .filterOn(allMessages.neuroRelated)
      .subscribe(d => {
        let cdsSource = d.data.artifact;
        let cdsTarget : [any] = cdsMap[cdsSource];
        let checked = d.data.checked;
        checked && (cdsTarget && cdsTarget.forEach(x => this.cdsState[x].checked = true));
        this
          .changeDetector
          .detectChanges();
      });
    let sub1 = this
      .brokerService
      .filterOn(manyHttpMessages.httpGetInitialApiCall)
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            this.cdsInfo = d
              .data
              .find(x => x[allHttpMessages.httpGetCdsInfo]);
            this.cdsInfo = this.cdsInfo && this.cdsInfo[allHttpMessages.httpGetCdsInfo].cds;
            this.cdsUserData = d
              .data
              .find(x => x[allHttpMessages.httpGetCdsUserData]);
            let cdsUserData = this.cdsUserData && this.cdsUserData[allHttpMessages.httpGetCdsUserData].cds;
            this.csnState.csn = this
              .neuroGraphService
              .get('queryParams')
              .csn;
            this.csnState.encounterStatus = this
              .neuroGraphService
              .get('queryParams')
              .encounter_status;
            this.cdsUserData = cdsUserData.find(x => x.save_csn == this.csnState.csn);
            this.setChkBoxes()
          })();
      });
    this
      .subscriptions
      .add(sub1);
  }

  setChkBoxes() {
    Object
      .keys(this.cdsUserData)
      .map(x => {
        this.cdsState[x] && (this.cdsState[x].checked = ((this.cdsUserData[x] == 'Yes') || (this.cdsState[x].checked))
          ? true
          : false);
      });
    this
      .changeDetector
      .detectChanges();
  }

  changed(event, item) {}
  buttonClicked(item) {
    this.selectedCdsInfo = this
      .cdsInfo
      .find(x => x.label == item);
  }
  
  getCdsTitle() {
    return (this.selectedCdsInfo.title);
  }

  ngOnDestroy() {
    this
      .subscriptions
      .unsubscribe();
  }
}
