import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {BrokerService} from '../../../fire-base/broker.service';
import {allMessages, allHttpMessages, medication} from '../../neuro-graph.config';
import {searchObject} from '../../neuro-graph.helper';

@Component({selector: '[app-medications]', templateUrl: './medications.component.html', styleUrls: ['./medications.component.sass']})
export class MedicationsComponent implements OnInit {
  subscriptions : any;
  // medicationOrders : Array < any >= [];
  // allMedications : any;
  dmtArray : Array < any > = [];
  vitaminDArray : Array < any > = [];
  otherMedsArray : Array < any > = [];

  constructor(private brokerService : BrokerService) {}

  ngOnInit() {

    let httpGetMedications = this
      .brokerService
      .filterOn(allHttpMessages.httpGetMedications);
    let neuroRelated = this
      .brokerService
      .filterOn(allMessages.neuroRelated);

    this.processMedication(httpGetMedications, neuroRelated, 'dmt');
    this.processMedication(httpGetMedications, neuroRelated, 'vitaminD');
    this.processMedication(httpGetMedications, neuroRelated, 'otherMeds');
    
  }

  processMedication(httpGetMedications, neuroRelated, medication) {
    // A medication was checked
    this.subscriptions = httpGetMedications.filter(t => {
      return (t.localMessage && ((t.localMessage.artifact == medication) && (t.localMessage.checked)));
    }).subscribe(d => {
      d.error
        ? console.log(d.error)
        : (() => {
          console.log(d.data);
          this.prepareMedications(d.data);
          if (medication == 'dmt') {
            //drawDmt()
          } else if (medication == 'vitaminD') {
            //drawVitaminD           
          } else {
             //drawOtherMeds
          }
        })();
    });
    //A medication was unchecked
    let sub1 = neuroRelated.filter(t => {
      return ((t.data.artifact == medication) && (!t.data.checked));
    }).subscribe(d => {
      d.error
        ? console.log(d.error)
        : (() => {
          console.log(d.data);
          if (medication == 'dmt') {
            //removeDmt()
          } else if (medication == 'vitaminD') {
            //removeVitaminD()
          } else {            
            //removeOtherMeds()
          }          
        })();
    });
    this
      .subscriptions
      .add(sub1);
  }
  prepareMedications(data) {
    let medicationOrders: Array<any> = [];
    data && data.EPIC && data.EPIC.patients && (data.EPIC.patients.length > 0) && (medicationOrders = data.EPIC.patients[0].medicationOrders);
    let genericNames = medication
      .dmt
      .genericNames
      .toString()
      .toLowerCase()
      .split(',');
    let vitaminDIds = medication.vitaminD.ids;
    let otherMedsIds = medication.otherMeds.ids;
    let mappedCodes = medication.otherMeds.mappedCodes;
   medicationOrders
      .forEach(x => {
        if (x.medication && genericNames.includes(x.medication.simple_generic_name.toLowerCase())) {
          x.type = 'dmt' //m.medication.id
        } else if (x.medication && vitaminDIds.includes(x.medication.id)) {
          x.type = 'vitaminD'
        } else if (x.medication && otherMedsIds.includes(x.medication.id)) {
          x.type = 'otherMeds'
        } else if (searchObject(x, 'mapped_code', mappedCodes).length > 0) {
          x.type = 'otherMeds'
        }
      });
      this.dmtArray = medicationOrders.filter(x=>x.type=='dmt');
      this.vitaminDArray = medicationOrders.filter(x=>x.type=='vitaminD');
      this.otherMedsArray = medicationOrders.filter(x=>x.type=='otherMeds');      
    // let newArray = medicationOrders
    //   .filter(x => x.type == 'otherMeds');
  }


  //sample for drawing medications
  drawMedications() {
    //Remove below code and draw charts for DMT, Othermeds and Vitamin D
    d3
      .select("#medications")
      .append('g')
      .attr('transform', 'translate(100 0)')
      .append("circle")
      .attr("r", 30)
      .attr("cx", 50)
      .attr("cy", 50)
      .attr('fill', 'red');

    d3
      .select("#medications")
      .append('g')
      .attr('transform', 'translate(100 50)')
      .append("circle")
      .attr("r", 30)
      .attr("cx", 50)
      .attr("cy", 50)
      .attr('fill', 'red');

    d3
      .select("#medications")
      .append('g')
      .attr('transform', 'translate(100 100)')
      .append("circle")
      .attr("r", 30)
      .attr("cx", 50)
      .attr("cy", 50)
      .attr('fill', 'red');
  }

  ngOnDestroy() {
    this
      .subscriptions
      .unsubscribe();
  }

}
/* Deprecated
categorizeMedication() {
    this.allMedications.EPIC.patients[0].medicationOrders.forEach((m) => {

      //checking for DMT
      medication.DMT.genericNames.forEach((d) => {
        if (m.medication.simple_generic_name.toUpperCase() == d.toUpperCase()) {
          this.dmt.push(m);
        }
      });

      //checking for Vitamin D
      medication.VitaminD.ids.forEach((v) => {
        if (m.medication.id == v) {
          this.vitaminD.push(m);
        }
      });

      //checking for Other Meds
      medication.OtherMeds.ids.forEach((o) => {
        if (m.medication.id == o) {
          this.otherMeds.push(m);
        }
      });

      //checking for Other Meds
      medication.OtherMeds.associatedDiagnosesMappedCodes.forEach((o) => {
        // check if associatedDiagnoses is empty
        if (m.associatedDiagnoses.length != 0) {
          m.associatedDiagnoses.forEach((ad)=>{
            // check if associatedDiagnoses has a key named code_sets
            if (ad.hasOwnProperty("code_sets")) {
                // check if code_sets have any value
                if (ad.code_sets.length != 0) {
                  ad.code_sets.forEach((mc) => {
                    if (mc.mapped_code == o) {
                      //check if this medicationOrder json object is already pushed
                      if(this.otherMeds.indexOf(m)==-1)
                      this.otherMeds.push(m);
                    }
                  });
                }
              }
          });
        }
      });
    });
    alert("DMT - " + this.dmt.length + " / Vitamin D - " + this.vitaminD.length + " / Other Meds - " + this.otherMeds.length);
  }
*/