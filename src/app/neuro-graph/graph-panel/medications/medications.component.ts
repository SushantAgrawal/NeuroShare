import { Component, OnInit } from '@angular/core';
import { BrokerService } from '../../../fire-base/broker.service';
import { allMessages, allHttpMessages, medication } from '../../neuro-graph.config';
import * as d3 from 'd3';

@Component({
  selector: '[app-medications]',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.sass']
})
export class MedicationsComponent implements OnInit {
  subscriptions: any;

  allMedications: any;
  dmt: Array<any> = [];
  vitaminD: Array<any> = [];
  otherMeds: Array<any> = [];

  constructor(private brokerService: BrokerService) { }

  ngOnInit() {
    this.subscriptions = this
      .brokerService
      .filterOn(allMessages.neuroRelated)
      .subscribe(d => {
        console.log(d.data);
        // this.neuroRelatedState[d.data.artifact] = d.data.checked;
      });
    this.subscriptions.add(this
      .brokerService
      .filterOn(allHttpMessages.httpGetMedications)
      .subscribe(d => {
        this.allMedications = d.data;
        this.categorizeMedication();
      }));
    this.drawMedications();
  }
  drawMedications() {
    //Remove below code and draw charts for DMT, Othermeds and Vitamin D
    d3.select("#medications")      
      .append('g')
      .attr('transform', 'translate(100 0)')
      .append("circle")
      .attr("r", 30)
      .attr("cx", 50)
      .attr("cy", 50)
      .attr('fill', 'red');
      
      d3.select("#medications")
      .append('g')
      .attr('transform', 'translate(100 50)')
      .append("circle")
      .attr("r", 30)
      .attr("cx", 50)
      .attr("cy", 50)
      .attr('fill', 'red');

      d3.select("#medications")
      .append('g')
      .attr('transform', 'translate(100 100)')
      .append("circle")
      .attr("r", 30)
      .attr("cx", 50)
      .attr("cy", 50)
      .attr('fill', 'red');
  }
  categorizeMedication() {
    this.allMedications.EPIC.patients[0].medicationOrders.map((m) => {

      //checking for DMT
      medication.DMT.genericName.map((d) => {
        if (m.medication.simple_generic_name.toUpperCase() == d.toUpperCase()) {
          this.dmt.push(m);
        }
      });

      //checking for Vitamin D
      medication.VitaminD.id.map((v) => {
        if (m.medication.id == v) {
          this.vitaminD.push(m);
        }
      });

      //checking for Other Meds
      medication.OtherMeds.id.map((o) => {
        if (m.medication.id == o) {
          this.otherMeds.push(m);
        }
      });

      //checking for Other Meds
      medication.OtherMeds.associatedDiagnosesId.map((o) => {
        // check if associatedDiagnoses is empty
        if (m.associatedDiagnoses.length != 0) {
          m.associatedDiagnoses.map((ad)=>{
            // check if associatedDiagnoses has a key named code_sets
            if (ad.hasOwnProperty("code_sets")) {
                // check if code_sets have any value
                if (ad.code_sets.length != 0) {
                  ad.code_sets.map((mc) => {
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
    //alert("DMT - " + this.dmt.length + " / Vitamin D - " + this.vitaminD.length + " / Other Meds - " + this.otherMeds.length);
  }

  ngOnDestroy() {
    this
      .subscriptions
      .unsubscribe();
  }

}
