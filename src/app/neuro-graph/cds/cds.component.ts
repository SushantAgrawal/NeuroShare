import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation} from '@angular/core';
import {BrokerService} from '../../broker/broker.service';
import {NeuroGraphService} from '../neuro-graph.service';
import * as _ from 'lodash';
import {cds, allMessages, manyHttpMessages, allHttpMessages} from '../neuro-graph.config';

@Component({selector: 'app-cds', templateUrl: './cds.component.html', styleUrls: ['./cds.component.sass'], encapsulation: ViewEncapsulation.None})
export class CdsComponent implements OnInit {
  // test='<a>Hello world</a>';
  selectedCdsInfo:any={};
  subscriptions : any;
  encounterStatusOpen : boolean
  cdsInfo : any;
  cdsUserData : any;
  cdsState : Object = {};
  test(){
    return('<a>hello world</a>');
  }
  constructor(private brokerService : BrokerService, private changeDetector : ChangeDetectorRef, private neuroGraphService : NeuroGraphService) {
    this.cdsState = {
      relapses: {
        checked: false,
        info: "Lorem <a>ipsum dolor</a> sit amet, maecenas parturient ac urna sed mi, dui nibh sed orc" +
            "i, convallis ligula ultricies a, mauris risus quisque ornare, malesuada nulla in" +
            " ut aliquet. Sem consequat fermentum in elit,",
        title: "Review relapses"
      },
      imaging: {
        checked: false,
        info: "",
        title: ""
      },
      symptomStatus: {
        checked: false,
        info: "",
        title: ""
      },
      typeStatus: {
        checked: false,
        info: "",
        title: ""
      },
      dmt: {
        checked: false,
        info: "",
        title: ""
      },
      labs: {
        checked: false,
        info: "",
        title: ""
      },
      vitaminD: {
        checked: false,
        info: "",
        title: ""
      },
      otherMeds: {
        checked: false,
        info: "",
        title: ""
      },
      referrals: {
        checked: false,
        info: "",
        title: ""
      },
      vaccinations: {
        checked: false,
        info: "",
        title: ""
      }
    }
  }

  ngOnInit() {
    this.encounterStatusOpen = this
      .neuroGraphService
      .get("queryParams")
      .encounter_status === "Open";
    this.subscriptions = this
      .brokerService
      .filterOn(allMessages.neuroRelated)
      .subscribe(d => {
        let cdsSource = d.data.artifact;
        let cdsTarget : [any] = cds[cdsSource];
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
            // let xTest = _.findKey(cdsMapping,(x)=>x=="review_relapses");
            this.cdsUserData = d
              .data
              .find(x => x[allHttpMessages.httpGetCdsUserData]);
            this.cdsUserData = this.cdsUserData && this.cdsUserData[allHttpMessages.httpGetCdsUserData].cds;
          })();
      });
    this
      .subscriptions
      .add(sub1);
  }

  buttonClicked(item) {
    this.selectedCdsInfo=this.cdsInfo.find(x=>x.label==item);
  }
  getCdsTitle(){
    return(this.selectedCdsInfo.title);
  }

  ngOnDestroy() {
    this
      .subscriptions
      .unsubscribe();
  }

}
