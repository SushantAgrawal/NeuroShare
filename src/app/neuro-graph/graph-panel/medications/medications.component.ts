import { Component, OnInit, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { BrokerService } from '../../../broker/broker.service';
import { allMessages, allHttpMessages, manyHttpMessages, medication } from '../../neuro-graph.config';
import { searchObject } from '../../neuro-graph.helper';
import { GRAPH_SETTINGS } from '../../neuro-graph.config';
import { MdDialog, MdDialogRef } from '@angular/material';
import {NeuroGraphService} from '../../neuro-graph.service';


@Component({
  selector: '[app-medications]',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class MedicationsComponent implements OnInit {
  @ViewChild('dmtSecondLevelTemplate') private dmtSecondLevelTemplate: TemplateRef<any>;
  @ViewChild('vitaminDSecondLevelTemplate') private vitaminDSecondLevelTemplate: TemplateRef<any>;
  @ViewChild('otherMedsSecondLevelTemplate') private otherMedsSecondLevelTemplate: TemplateRef<any>;
  @Input() private chartState: any;

  dialogRef: MdDialogRef<any>;
  medSecondLayerModel: any;
  subscriptions: any;
  dmtArray: Array<any> = [];
  vitaminDArray: Array<any> = [];
  otherMedsArray: Array<any> = [];
  selectedMed: Object = {
    dmt: false,
    otherMeds: false,
    vitaminD: false
  };
  medType = {
    dmt: 'dmt',
    otherMeds: 'otherMeds',
    vitaminD: 'vitaminD'
  };
  dmtSecondLayerLocalData: Array<any>;

  constructor(private brokerService: BrokerService, private dialog: MdDialog,  private neuroGraphService : NeuroGraphService) { }

  ngOnInit() {
    //This 'setSecondLayerData' is temporary and used to set a local data source.  Will be removed once apis are ready.
    this.setSecondLayerData();
    //-------------------------//

    this.subscriptions = this
      .brokerService
      .filterOn(allHttpMessages.httpGetMedications)
      .subscribe(d => {
        d.error ? console.log(d.error) : (() => {
          this.prepareMedications(d.data);
          if (this.selectedMed[this.medType.dmt]) {
            this.drawDmt();
          }
          if (this.selectedMed[this.medType.vitaminD]) {
            this.drawVitaminD();
          } if (this.selectedMed[this.medType.otherMeds]) {
            this.drawOtherMeds();
          }
        })();
      });
    let neuroRelated = this
      .brokerService
      .filterOn(allMessages.neuroRelated);
    this.processMedication(neuroRelated, this.medType.dmt);
    this.processMedication(neuroRelated, this.medType.vitaminD);
    this.processMedication(neuroRelated, this.medType.otherMeds);
  }

  ngOnDestroy() {
    this
      .subscriptions
      .unsubscribe();
  }

  processMedication(neuroRelated, medication) {
    // A medication was checked 
    let sub1 = neuroRelated.filter(t => {
      return ((t.data.artifact == medication) && (t.data.checked))
    }).subscribe(d => {
      d.error
        ? console.log(d.error)
        : (() => {
          this.selectedMed[medication] = true;
          this
            .brokerService
            .httpGet(allHttpMessages.httpGetMedications);
        })();
    })
    //A medication was unchecked
    let sub2 = neuroRelated.filter(t => {
      return ((t.data.artifact == medication) && (!t.data.checked));
    }).subscribe(d => {
      d.error
        ? console.log(d.error)
        : (() => {
          this.selectedMed[medication] = false;
          if (medication == this.medType.dmt) {
            this.removeDmt()
          } else if (medication == this.medType.vitaminD) {
            this.removeVitaminD()
          } else {
            this.removeOtherMeds()
          }
        })();
    });
    this.subscriptions
      .add(sub1)
      .add(sub2);
  }

  prepareMedications(data) {
    let medicationOrders: Array<any> = [];
    data && data.EPIC && data.EPIC.patients && (data.EPIC.patients.length > 0) && (medicationOrders = data.EPIC.patients[0].medicationOrders);
    let genericNames = medication.dmt.genericNames.toString().toLowerCase().split(',');
    let vitaminDIds = medication.vitaminD.ids;
    let otherMedsIds = medication.otherMeds.ids;
    let mappedCodes = medication.otherMeds.mappedCodes;
    medicationOrders.forEach(x => {
      if (x.medication && genericNames.includes(x.medication.simple_generic_name.toLowerCase())) {
        x.type = this.medType.dmt //m.medication.id
      } else if (x.medication && vitaminDIds.includes(x.medication.id)) {
        x.type = this.medType.vitaminD
      } else if (x.medication && otherMedsIds.includes(x.medication.id)) {
        x.type = this.medType.otherMeds
      } else if (searchObject(x, 'mapped_code', mappedCodes).length > 0) {
        x.type = this.medType.otherMeds
      }
    });
    this.dmtArray = medicationOrders
      .filter(x => x.type == this.medType.dmt)
      .sort((a, b) => Date.parse(b.date.medStart) - Date.parse(a.date.medStart));
    this.vitaminDArray = medicationOrders
      .filter(x => x.type == this.medType.vitaminD)
      .sort((a, b) => Date.parse(b.date.medStart) - Date.parse(a.date.medStart));;
    this.otherMedsArray = medicationOrders
      .filter(x => x.type == this.medType.otherMeds)
      .sort((a, b) => Date.parse(b.date.medStart) - Date.parse(a.date.medStart));;
  }

  getSecondLayerModel(data, medType, secondLayerData) {
    let model: any = {
      orderIdentifier: data.orderIdentifier,
      name: data.name,
      simpleGenericName: data.medication.simple_generic_name,
      orderDate: data.date.orderDate,
      medEnd: data.date.medEnd,
      medQuantity: data.medQuantity,
      frequency: data.frequency,
      refillCount: data.refillCount,
      refillRemain: data.refillRemain,
      allYears: Array.from(new Array(100), (val, index) => (new Date()).getFullYear() - index)
    };
    if (secondLayerData) {
      model.allowEdit = secondLayerData.save_csn_status !== 'Closed';
      model.reasonStopped = secondLayerData.reason_stopped;
      model.otherReason = secondLayerData.otherReason;
      let dtParts = secondLayerData.patient_reported_start.split('/');
      if (dtParts.length == 2) {
        model.patientReportedStartDateMonth = parseInt(dtParts[0]);
        model.patientReportedStartDateYear = parseInt(dtParts[1]);
      }
    }
    else {
      model.allowEdit = true;
    }

    return model;
  }

  setSecondLayerData() {
    let secondLayerApiCallSub: any;
    this.brokerService.httpGetMany(manyHttpMessages.httpGetInitialApiCall, [
      { urlId: allHttpMessages.httpGetDmt },
    ]);
    secondLayerApiCallSub = this.brokerService.filterOn(manyHttpMessages.httpGetInitialApiCall).subscribe(d => {
      d.error ? console.log(d) : (() => {
        let dmtResponse = d.data[0][allHttpMessages.httpGetDmt];
        this.dmtSecondLayerLocalData = dmtResponse.DMTs;
        secondLayerApiCallSub && secondLayerApiCallSub.unsubscribe();
      })();
    });
  }

  updateDmt() {
    let dmt = this.dmtSecondLayerLocalData.find(x => x.dmt_order_id === this.medSecondLayerModel.orderIdentifier.toString());
    if (dmt) {
      dmt.patient_reported_start = `${this.medSecondLayerModel.patientReportedStartDateMonth}/${this.medSecondLayerModel.patientReportedStartDateYear}`;
      dmt.reason_stopped = this.medSecondLayerModel.reasonStopped;
      dmt.otherReason = this.medSecondLayerModel.otherReason;
    }
    else {
      this.dmtSecondLayerLocalData.push({
        dmt_order_id: this.medSecondLayerModel.orderIdentifier.toString(),
        patient_reported_start: `${this.medSecondLayerModel.patientReportedStartDateMonth}/${this.medSecondLayerModel.patientReportedStartDateYear}`,
        reason_stopped: this.medSecondLayerModel.reasonStopped,
        last_updated_provider_id: "G00123",
        last_updated_instant: "09/30/2017 10:41:05",
        save_csn: this.neuroGraphService.get("queryParams").csn,
        save_csn_status: this.neuroGraphService.get("queryParams").encounter_status
      });
    }
    this.dialogRef.close();
  }

  drawDmt() {
    let config = { hasBackdrop: true, panelClass: 'dmtSecondLevel', width: '700px' };
    let openSecondLayer = (selectedData) => {

      //This is temp code. Pulls data set from api first time and stores locally.
      if (this.dmtSecondLayerLocalData) {
        let dmt = this.dmtSecondLayerLocalData.find(x => x.dmt_order_id === selectedData.orderIdentifier.toString());
        this.medSecondLayerModel = this.getSecondLayerModel(selectedData, this.medType.dmt, dmt);
        this.dialogRef = this.dialog.open(this.dmtSecondLevelTemplate, config);
      }
      else {
        let dmtSubscription: any;
        this.brokerService.httpGet(allHttpMessages.httpGetDmt);
        dmtSubscription = this.brokerService.filterOn(allHttpMessages.httpGetDmt).subscribe(d => {
          d.error ? console.log(d) : (() => {
            this.dmtSecondLayerLocalData = d.data.DMTs;
            let dmt = this.dmtSecondLayerLocalData.find(x => x.dmt_order_id === selectedData.orderIdentifier.toString());
            this.medSecondLayerModel = this.getSecondLayerModel(selectedData, this.medType.dmt, dmt);
            this.dialogRef = this.dialog.open(this.dmtSecondLevelTemplate, config);
            dmtSubscription && dmtSubscription.unsubscribe();
          })();
        });
      }


      // this.brokerService.httpGetMany(manyHttpMessages.httpGetInitialApiCall, [
      //   { urlId: allHttpMessages.httpGetDmt },
      //   { urlId: allHttpMessages.httpGetAllQuestionnaire }
      // ]);
      // dmtSubscription = this.brokerService.filterOn(manyHttpMessages.httpGetInitialApiCall).subscribe(d => {
      //   d.error ? console.log(d) : (() => {
      //     let dmtResponse = d.data[0][allHttpMessages.httpGetDmt];
      //     let quesResponse = d.data[1][allHttpMessages.httpGetAllQuestionnaire];
      //     //console.log(quesResponse);
      //     let dmt = dmtResponse.DMTs.find(x => x.dmt_order_id === selectedData.orderIdentifier.toString());
      //     this.medSecondLayerModel = this.getSecondLayerModel(selectedData, this.medType.dmt, dmt);
      //     console.log(this.medSecondLayerModel);
      //     this.dialogRef = this.dialog.open(this.dmtSecondLevelTemplate, config);
      //     dmtSubscription && dmtSubscription.unsubscribe();
      //     debugger;
      //   })();
      // });

    };
    this.drawChart(this.dmtArray, this.medType.dmt, GRAPH_SETTINGS.medications.dmtColor, openSecondLayer);
  }

  drawVitaminD() {
    let config = { hasBackdrop: true, panelClass: 'vitaminDSecondLevel', width: '600px' };
    let openSecondLayer = (data) => {
      this.medSecondLayerModel = this.getSecondLayerModel(data, this.medType.vitaminD, {});
      this.dialogRef = this.dialog.open(this.vitaminDSecondLevelTemplate, config);
    };
    this.drawChart(this.vitaminDArray, this.medType.vitaminD, GRAPH_SETTINGS.medications.vitaminDColor, openSecondLayer);
  }

  drawOtherMeds() {
    let config = { hasBackdrop: true, panelClass: 'otherMedsSecondLevel', width: '600px' };
    let openSecondLayer = (data) => {
      this.medSecondLayerModel = this.getSecondLayerModel(data, this.medType.otherMeds, {});
      this.dialogRef = this.dialog.open(this.otherMedsSecondLevelTemplate, config);
    };
    this.drawChart(this.otherMedsArray, this.medType.otherMeds, GRAPH_SETTINGS.medications.otherMedsColor, openSecondLayer);
  }

  removeDmt() {
    //do other DMT specific task
    this.removeChart(this.medType.dmt);
  }

  removeVitaminD() {
    //do other VitaminD specific task
    this.removeChart(this.medType.vitaminD);
  }

  removeOtherMeds() {
    //do other OtherMeds specific task
    this.removeChart(this.medType.otherMeds);
  }

  getEndDate(input) {
    if (input)
      return Date.parse(input)
    return this.chartState.xDomain.defaultMaxValue;
  }

  getShortenedName(input) {
    let parts = input && input.split(' ');
    let capitalize = parts[0]
      .toLowerCase()
      .replace(/\b(\w)/g, s => s.toUpperCase())
    return capitalize + ' ...';
  }

  drawChart(dataset: Array<any>, containterId, barColor, onClickCallback) {
    //temporary fix to avoid overwrite
    d3.selectAll('#' + containterId).selectAll("*").remove();

    let svg = d3
      .select('#' + containterId)
      .attr('class', containterId + '-elements-wrapper')
      .attr('transform', 'translate(' + GRAPH_SETTINGS.panel.marginLeft + ', 5)');

    //group on generic name
    let groupsUnfiltered = dataset.map(d => d.medication.id);
    let groups = groupsUnfiltered.filter((elem, pos, arr) => arr.indexOf(elem) == pos);

    let rectangles = svg.append('g')
      .selectAll('rect')
      .data(dataset)
      .enter();

    //Draws rectangles
    rectangles.append('rect')
      .attr('rx', 0)
      .attr('ry', 0)
      .attr('x', d => {
        let medStartDate = Date.parse(d.date.medStart || d.date.orderDate);
        let pos = this.chartState.xScale(medStartDate);
        return pos < 0 ? 0 : pos;
      })
      .attr('y', function (d: any, i) {
        for (var j = 0; j < groups.length; j++) {
          if (d.medication.id == groups[j]) {
            return j * 27 + 12;
          }
        }
      })
      .attr('width', d => {
        let medStartDate = Date.parse(d.date.medStart || d.date.orderDate);
        let medEndDate = this.getEndDate(d.date.medEnd);
        return this.chartState.xScale(medEndDate) - this.chartState.xScale(medStartDate);
      })
      .attr('height', 6)
      .attr('stroke', 'none')
      .attr('fill', barColor)
      .style('cursor', 'pointer')
      .on("click", d => {
        onClickCallback(d);
      })


    //Draws texts
    rectangles.append('text')
      .text(d => this.getShortenedName(d.name))
      .attr('x', d => {
        let medStartDate = Date.parse(d.date.medStart || d.date.orderDate);
        let medEndDate = this.getEndDate(d.date.medEnded);
        let width = this.chartState.xScale(medEndDate) - this.chartState.xScale(medStartDate);
        let pos = this.chartState.xScale(medStartDate);
        return pos < 0 ? 0 : pos;
      })
      .attr('y', function (d: any, i) {
        for (var j = 0; j < groups.length; j++) {
          if (d.medication.id == groups[j]) {
            return j * 27 + 8;
          }
        }
      })
      .attr('font-size', 11)
      .attr('text-anchor', 'start')
      .attr('text-height', 40)
      .attr('fill', 'black')
      .style('text-transform', 'capitalize');

    //Adjusts height
    d3.select('#' + containterId).attr('height', groups.length * 30);
    d3.select('#' + containterId).style('display', 'block');
  }

  removeChart(containterId) {
    d3.selectAll('#' + containterId).selectAll("*").remove();
    d3.select('#' + containterId).style('display', 'none');
  }

}
