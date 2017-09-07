import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {BrokerService} from '../../../fire-base/broker.service';
import {allMessages, allHttpMessages, medication} from '../../neuro-graph.config';
// import {EnumMedicationtypes} from '../../neuro-graph.helper';

@Component({selector: '[app-medications]', templateUrl: './medications.component.html', styleUrls: ['./medications.component.sass']})
export class MedicationsComponent implements OnInit {
  subscriptions : any;

  allMedications : any;
  dmt : Array < any > = [];
  vitaminD : Array < any > = [];
  otherMeds : Array < any > = [];

  constructor(private brokerService : BrokerService) {}

  ngOnInit() {
    let httpGetMedications = this
      .brokerService
      .filterOn(allHttpMessages.httpGetMedications);
    let neuroRelated = this
      .brokerService
      .filterOn(allMessages.neuroRelated);
    // this.processAllMedications(httpGetMedications);
    
    this.processMedication(httpGetMedications,neuroRelated,'dmt');
    this.processMedication(httpGetMedications,neuroRelated,'otherMeds');
    this.processMedication(httpGetMedications,neuroRelated,'vitaminD');       
  }  

  processMedication(httpGetMedications,neuroRelated, medication) {
    // Only one specific medication was checked
    this.subscriptions = httpGetMedications.filter(t => {
      return (t.localMessage && ((t.localMessage.artifact == medication) && (t.localMessage.checked)));
    }).subscribe(d => {
      d.error
        ? console.log(d.error)
        : (() => {
          console.log(d.data);
          //prepareMedications()
          if(medication=='dmt') {
            //drawDmt()
          } else if(medication=='otherMeds'){
            //drawOtherMeds
          } else{
            //drawVitaminD
          }
          //create array for the particular medication and  display graph for that medication
        })();
    });
    //One specific medication was unchecked
    let sub1 = neuroRelated.filter(t => {
      return ((t.data.artifact == medication) && (!t.data.checked));
    }).subscribe(d => {
      d.error
        ? console.log(d.error)
        : (() => {
          console.log(d.data);
          if(medication=='dmt'){
            //removeDmt()
          } else if(medication == 'otherMeds'){
            //removeOtherMeds()
          } else{
            //removeVitaminD()
          }
          //remove graph for that medication
        })();
    });
    this.subscriptions.add(sub1);
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

  // categorizeMedication() {   this     .allMedications     .EPIC .patients[0]
  //  .medicationOrders     .map((m) => {       //checking for DMT
  // medication         .DMT         .genericName         .map((d) => {      if
  // (m.medication.simple_generic_name.toUpperCase() == d.toUpperCase()) {
  //     this               .dmt               .push(m);           }     });
  // //checking for Vitamin D       medication         .VitaminD     .id
  // .map((v) => {           if (m.medication.id == v) {   this
  // .vitaminD               .push(m);           } });       //checking for Other
  // Meds       medication         .OtherMeds   .id         .map((o) => {
  //  if (m.medication.id == o) { this               .otherMeds
  // .push(m);           }         });       //checking for Other Meds
  // medication         .OtherMeds .associatedDiagnosesId         .map((o) => {
  //        // check if associatedDiagnoses is empty           if
  // (m.associatedDiagnoses.length != 0) {             m
  // .associatedDiagnoses               .map((ad) => {                 // check if
  // associatedDiagnoses has a key named code_sets               if
  // (ad.hasOwnProperty("code_sets")) {                   // check if code_sets
  // have any value                   if (ad.code_sets.length != 0) {
  //        ad                       .code_sets         .map((mc) => {
  //             if (mc.mapped_code == o) {                       //check if this
  // medicationOrder json object is already pushed                           if
  // (this.otherMeds.indexOf(m) == -1)                     this.otherMeds.push(m);
  //                           }                   });                   }
  //         }               });           }         });     });   alert("DMT - "
  // + this.dmt.length + " / Vitamin D - " + this.vitaminD.length + " / Other Meds
  // - " + this.otherMeds.length); }

  ngOnDestroy() {
    this
      .subscriptions
      .unsubscribe();
  }

}
/* Deprecated
processAllMedications(httpGetMedications) {
    // All medications were checked
    this.subscriptions = httpGetMedications.filter(t => {
      return (t.localMessage && ((t.localMessage.artifact == 'all') && (t.localMessage.checked)));
    }).subscribe(d => {
      d.error
        ? console.log(d.error)
        : (() => {
          console.log(d.data);
          // create array for dmt, otherMeds and VitaminD and  display graphs for dmt,
          // otherMeds and VitaminD. prepareMedications()
          //drawDmt();
          //drawOtherMeds();
          //drawVitaminD();
        })();
    });
  }
*/