import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { GRAPH_SETTINGS } from '../../neuro-graph.config';
import { BrokerService } from '../../broker/broker.service';
import { allMessages, allHttpMessages } from '../../neuro-graph.config';

@Component({
  selector: '[app-labs]',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LabsComponent implements OnInit {
  @Input() private chartState: any;
  private chart: any;
  private width: number;
  private height: number;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  private yScale: any;
  private yDomain: Array<number> = [0, 1];
  private lineA: any;
  private pathUpdate: any;
  private labsData: Array<any> = [{
    "procedureCode": "LABE005",
    "abnormal": false,
    "myChartPatientFriendlyName": "",
    "status": "Completed",
    "resultLab": "",
    "diagnosisName": null,
    "contactSerialNumber": "833110659",
    "orderingProvider": {
      "id": "30006338",
      "mpi": [
        {
          "id": "51038353",
          "type": "SUTTER HEALTH PROVIDER ID"
        },
        {
          "id": "117389",
          "type": "SUTTER HEALTH ESCRIPTION VOICE PROVIDER ID"
        },
        {
          "id": "51038353",
          "type": "CV PROVIDERS"
        },
        {
          "id": "51038353",
          "type": "SUTTER CONNECT IDX PROVIDER ID"
        },
        {
          "id": "51038353",
          "type": "PCR MENLO PARK PROVIDER ID"
        },
        {
          "id": "51038353",
          "type": "PCR SANTA CRUZ MATERNITY PROVIDER ID"
        },
        {
          "id": "51038353",
          "type": "MPHS PROVIDER ID"
        }
      ],
      "status": "Open",
      "department": {
        "id": "474",
        "name": "PMAL INTRNLMED DUBLIN"
      },
      "name": "UNKNOWN, PROVIDER"
    },
    "id": "689932663",
    "component": [
      {
        "isResulted": false,
        "commonName": "PERFORMING LAB",
        "externalName": "Resulting Agency, External/Manual",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "",
        "id": "26075",
        "referenceUnits": "",
        "referenceHigh": "",
        "name": "RESULTING AGENCY, EXTERNAL/MANUAL",
        "value": "",
        "isValueInRange": false,
        "baseName": "MLAB1"
      },
      {
        "isResulted": false,
        "commonName": "LDL CHOLESTEROL",
        "externalName": "LDL Calculated, External/Manual",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "",
        "id": "23929",
        "referenceUnits": "mg/dL",
        "referenceHigh": "130",
        "name": "LDL CALCULATED, EXTERNAL/MANUAL",
        "value": "13",
        "isValueInRange": true,
        "baseName": "LDL"
      }
    ],
    "dates": {
      "orderDate": "09/24/2015",
      "resultDate": "09/02/2015",
      "collectionDate": ""
    },
    "name": "LIPID - EXTERNAL/MANUAL",
    "patientIdentifier": "495976"
  },
  {
    "procedureCode": "LABCBCA",
    "abnormal": true,
    "myChartPatientFriendlyName": "COMPLETE BLOOD CELL COUNT",
    "status": "Open",
    "resultLab": "PAMF LAB (MISYS)",
    "diagnosisName": null,
    "contactSerialNumber": "833110669",
    "orderingProvider": {
      "id": "MVAFMMA",
      "mpi": [
        {
          "id": "50018264",
          "type": "SUTTER HEALTH PROVIDER ID"
        },
        {
          "id": "8362",
          "type": "SUTTER HEALTH ESCRIPTION VOICE PROVIDER ID"
        }
      ],
      "status": "Reviewed",
      "department": {
        "id": "192",
        "name": "PMPA ONCOLOGY PALO ALTO"
      },
      "name": "CBAMB, MVAFMMA ONE PROVIDER"
    },
    "id": "689932700",
    "component": [
      {
        "isResulted": true,
        "commonName": "WBC",
        "externalName": "White Blood Cell Count",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "4.0",
        "id": "511",
        "referenceUnits": "K/uL",
        "referenceHigh": "11.0",
        "name": "WBC",
        "value": "7.6",
        "isValueInRange": true,
        "baseName": "WBC"
      },
      {
        "isResulted": true,
        "commonName": "RBC",
        "externalName": "Red Blood Cell Count",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "3.90",
        "id": "512",
        "referenceUnits": "M/uL",
        "referenceHigh": "5.40",
        "name": "RBC",
        "value": "4.03",
        "isValueInRange": true,
        "baseName": "RBC"
      },
      {
        "isResulted": true,
        "commonName": "HEMOGLOBIN",
        "externalName": "Hemoglobin",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "11.7",
        "id": "513",
        "referenceUnits": "g/dL",
        "referenceHigh": "15.5",
        "name": "HEMOGLOBIN",
        "value": "12.8",
        "isValueInRange": true,
        "baseName": "HGB"
      },
      {
        "isResulted": true,
        "commonName": "HEMATOCRIT",
        "externalName": "Hematocrit",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "35.0",
        "id": "514",
        "referenceUnits": "%",
        "referenceHigh": "47.0",
        "name": "HEMATOCRIT",
        "value": "36.9",
        "isValueInRange": true,
        "baseName": "HCT"
      },
      {
        "isResulted": true,
        "commonName": "MCV",
        "externalName": "MCV",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "80",
        "id": "515",
        "referenceUnits": "fL",
        "referenceHigh": "100",
        "name": "MCV",
        "value": "92",
        "isValueInRange": true,
        "baseName": "MCV"
      },
      {
        "isResulted": true,
        "commonName": "MCH",
        "externalName": "MCH",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "27.0",
        "id": "516",
        "referenceUnits": "pg",
        "referenceHigh": "33.0",
        "name": "MCH",
        "value": "31.8",
        "isValueInRange": true,
        "baseName": "MCH"
      },
      {
        "isResulted": true,
        "commonName": "MCHC",
        "externalName": "MCHC",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "31.0",
        "id": "517",
        "referenceUnits": "g/dL",
        "referenceHigh": "36.0",
        "name": "MCHC",
        "value": "34.7",
        "isValueInRange": true,
        "baseName": "MCHC"
      },
      {
        "isResulted": true,
        "commonName": "RDW",
        "externalName": "RDW",
        "resultFlag": "",
        "referenceNormal": "<16.4",
        "referenceLow": "",
        "id": "518",
        "referenceUnits": "%",
        "referenceHigh": "",
        "name": "RDW",
        "value": "14.6",
        "isValueInRange": false,
        "baseName": "RDW"
      },
      {
        "isResulted": true,
        "commonName": "PLATELET COUNT",
        "externalName": "Platelet Count",
        "resultFlag": "Low",
        "referenceNormal": "",
        "referenceLow": "150",
        "id": "519",
        "referenceUnits": "K/uL",
        "referenceHigh": "400",
        "name": "PLATELET COUNT",
        "value": "71",
        "isValueInRange": false,
        "baseName": "PLT"
      },
      {
        "isResulted": true,
        "commonName": "DIFFERENTIAL TYPE",
        "externalName": "Differential Type",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "",
        "id": "520",
        "referenceUnits": "",
        "referenceHigh": "",
        "name": "DIFF TYPE",
        "value": "Automated",
        "isValueInRange": false,
        "baseName": "DIFFTYP"
      }
    ],
    "dates": {
      "orderDate": "09/24/2016",
      "resultDate": "09/02/2016",
      "collectionDate": ""
    },
    "name": "CBC WITH AUTOMATED DIFFERENTIAL",
    "patientIdentifier": "495976"
  },
  {
    "procedureCode": "LABCBCA",
    "abnormal": true,
    "myChartPatientFriendlyName": "COMPLETE BLOOD CELL COUNT",
    "status": "Completed",
    "resultLab": "PAMF LAB (MISYS)",
    "diagnosisName": null,
    "contactSerialNumber": "833110669",
    "orderingProvider": {
      "id": "MVAFMMA",
      "mpi": [
        {
          "id": "50018264",
          "type": "SUTTER HEALTH PROVIDER ID"
        },
        {
          "id": "8362",
          "type": "SUTTER HEALTH ESCRIPTION VOICE PROVIDER ID"
        }
      ],
      "status": "Reviewed",
      "department": {
        "id": "192",
        "name": "PMPA ONCOLOGY PALO ALTO"
      },
      "name": "CBAMB, MVAFMMA ONE PROVIDER"
    },
    "id": "689932700",
    "component": [
      {
        "isResulted": true,
        "commonName": "WBC",
        "externalName": "White Blood Cell Count",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "4.0",
        "id": "511",
        "referenceUnits": "K/uL",
        "referenceHigh": "11.0",
        "name": "WBC",
        "value": "7.6",
        "isValueInRange": true,
        "baseName": "WBC"
      },
      {
        "isResulted": true,
        "commonName": "RBC",
        "externalName": "Red Blood Cell Count",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "3.90",
        "id": "512",
        "referenceUnits": "M/uL",
        "referenceHigh": "5.40",
        "name": "RBC",
        "value": "4.03",
        "isValueInRange": true,
        "baseName": "RBC"
      },
      {
        "isResulted": true,
        "commonName": "HEMOGLOBIN",
        "externalName": "Hemoglobin",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "11.7",
        "id": "513",
        "referenceUnits": "g/dL",
        "referenceHigh": "15.5",
        "name": "HEMOGLOBIN",
        "value": "12.8",
        "isValueInRange": true,
        "baseName": "HGB"
      },
      {
        "isResulted": true,
        "commonName": "HEMATOCRIT",
        "externalName": "Hematocrit",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "35.0",
        "id": "514",
        "referenceUnits": "%",
        "referenceHigh": "47.0",
        "name": "HEMATOCRIT",
        "value": "36.9",
        "isValueInRange": true,
        "baseName": "HCT"
      },
      {
        "isResulted": true,
        "commonName": "MCV",
        "externalName": "MCV",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "80",
        "id": "515",
        "referenceUnits": "fL",
        "referenceHigh": "100",
        "name": "MCV",
        "value": "92",
        "isValueInRange": true,
        "baseName": "MCV"
      },
      {
        "isResulted": true,
        "commonName": "MCH",
        "externalName": "MCH",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "27.0",
        "id": "516",
        "referenceUnits": "pg",
        "referenceHigh": "33.0",
        "name": "MCH",
        "value": "31.8",
        "isValueInRange": true,
        "baseName": "MCH"
      },
      {
        "isResulted": true,
        "commonName": "MCHC",
        "externalName": "MCHC",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "31.0",
        "id": "517",
        "referenceUnits": "g/dL",
        "referenceHigh": "36.0",
        "name": "MCHC",
        "value": "34.7",
        "isValueInRange": true,
        "baseName": "MCHC"
      },
      {
        "isResulted": true,
        "commonName": "RDW",
        "externalName": "RDW",
        "resultFlag": "",
        "referenceNormal": "<16.4",
        "referenceLow": "",
        "id": "518",
        "referenceUnits": "%",
        "referenceHigh": "",
        "name": "RDW",
        "value": "14.6",
        "isValueInRange": false,
        "baseName": "RDW"
      },
      {
        "isResulted": true,
        "commonName": "PLATELET COUNT",
        "externalName": "Platelet Count",
        "resultFlag": "Low",
        "referenceNormal": "",
        "referenceLow": "150",
        "id": "519",
        "referenceUnits": "K/uL",
        "referenceHigh": "400",
        "name": "PLATELET COUNT",
        "value": "71",
        "isValueInRange": false,
        "baseName": "PLT"
      },
      {
        "isResulted": true,
        "commonName": "DIFFERENTIAL TYPE",
        "externalName": "Differential Type",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "",
        "id": "520",
        "referenceUnits": "",
        "referenceHigh": "",
        "name": "DIFF TYPE",
        "value": "Automated",
        "isValueInRange": false,
        "baseName": "DIFFTYP"
      }
    ],
    "dates": {
      "orderDate": "09/24/2016",
      "resultDate": "09/02/2016",
      "collectionDate": ""
    },
    "name": "CBC WITH AUTOMATED DIFFERENTIAL",
    "patientIdentifier": "495976"
  },
  {
    "procedureCode": "LABCBCA",
    "abnormal": true,
    "myChartPatientFriendlyName": "COMPLETE BLOOD CELL COUNT",
    "status": "Open",
    "resultLab": "PAMF LAB (MISYS)",
    "diagnosisName": null,
    "contactSerialNumber": "833110669",
    "orderingProvider": {
      "id": "MVAFMMA",
      "mpi": [
        {
          "id": "50018264",
          "type": "SUTTER HEALTH PROVIDER ID"
        },
        {
          "id": "8362",
          "type": "SUTTER HEALTH ESCRIPTION VOICE PROVIDER ID"
        }
      ],
      "status": "Reviewed",
      "department": {
        "id": "192",
        "name": "PMPA ONCOLOGY PALO ALTO"
      },
      "name": "CBAMB, MVAFMMA ONE PROVIDER"
    },
    "id": "689932700",
    "component": [
      {
        "isResulted": true,
        "commonName": "WBC",
        "externalName": "White Blood Cell Count",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "4.0",
        "id": "511",
        "referenceUnits": "K/uL",
        "referenceHigh": "11.0",
        "name": "WBC",
        "value": "7.6",
        "isValueInRange": true,
        "baseName": "WBC"
      },
      {
        "isResulted": true,
        "commonName": "RBC",
        "externalName": "Red Blood Cell Count",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "3.90",
        "id": "512",
        "referenceUnits": "M/uL",
        "referenceHigh": "5.40",
        "name": "RBC",
        "value": "4.03",
        "isValueInRange": true,
        "baseName": "RBC"
      },
      {
        "isResulted": true,
        "commonName": "HEMOGLOBIN",
        "externalName": "Hemoglobin",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "11.7",
        "id": "513",
        "referenceUnits": "g/dL",
        "referenceHigh": "15.5",
        "name": "HEMOGLOBIN",
        "value": "12.8",
        "isValueInRange": true,
        "baseName": "HGB"
      },
      {
        "isResulted": true,
        "commonName": "HEMATOCRIT",
        "externalName": "Hematocrit",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "35.0",
        "id": "514",
        "referenceUnits": "%",
        "referenceHigh": "47.0",
        "name": "HEMATOCRIT",
        "value": "36.9",
        "isValueInRange": true,
        "baseName": "HCT"
      },
      {
        "isResulted": true,
        "commonName": "MCV",
        "externalName": "MCV",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "80",
        "id": "515",
        "referenceUnits": "fL",
        "referenceHigh": "100",
        "name": "MCV",
        "value": "92",
        "isValueInRange": true,
        "baseName": "MCV"
      },
      {
        "isResulted": true,
        "commonName": "MCH",
        "externalName": "MCH",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "27.0",
        "id": "516",
        "referenceUnits": "pg",
        "referenceHigh": "33.0",
        "name": "MCH",
        "value": "31.8",
        "isValueInRange": true,
        "baseName": "MCH"
      },
      {
        "isResulted": true,
        "commonName": "MCHC",
        "externalName": "MCHC",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "31.0",
        "id": "517",
        "referenceUnits": "g/dL",
        "referenceHigh": "36.0",
        "name": "MCHC",
        "value": "34.7",
        "isValueInRange": true,
        "baseName": "MCHC"
      },
      {
        "isResulted": true,
        "commonName": "RDW",
        "externalName": "RDW",
        "resultFlag": "",
        "referenceNormal": "<16.4",
        "referenceLow": "",
        "id": "518",
        "referenceUnits": "%",
        "referenceHigh": "",
        "name": "RDW",
        "value": "14.6",
        "isValueInRange": false,
        "baseName": "RDW"
      },
      {
        "isResulted": true,
        "commonName": "PLATELET COUNT",
        "externalName": "Platelet Count",
        "resultFlag": "Low",
        "referenceNormal": "",
        "referenceLow": "150",
        "id": "519",
        "referenceUnits": "K/uL",
        "referenceHigh": "400",
        "name": "PLATELET COUNT",
        "value": "71",
        "isValueInRange": false,
        "baseName": "PLT"
      },
      {
        "isResulted": true,
        "commonName": "DIFFERENTIAL TYPE",
        "externalName": "Differential Type",
        "resultFlag": "",
        "referenceNormal": "",
        "referenceLow": "",
        "id": "520",
        "referenceUnits": "",
        "referenceHigh": "",
        "name": "DIFF TYPE",
        "value": "Automated",
        "isValueInRange": false,
        "baseName": "DIFFTYP"
      }
    ],
    "dates": {
      "orderDate": "09/24/2017",
      "resultDate": "09/02/2017",
      "collectionDate": ""
    },
    "name": "CBC WITH AUTOMATED DIFFERENTIAL",
    "patientIdentifier": "495976"
  }
];
private subscriptions: any;
private datasetA: Array<any> ;
private datasetB: Array<any> =[];
private datasetC: Array<any> =[];
 
  constructor(private brokerService: BrokerService) { }

  ngOnInit() {
    this.subscriptions = this
    .brokerService
    .filterOn(allHttpMessages.httpGetLabs)
    .subscribe(d => {
    // debugger;
      d.error
        ? console.log(d.error)
        : (() => {
          
          this.labsData = d.data.EPIC.labOrder;
          this.createChart();
        })();
    })


    let labs = this
      .brokerService
      .filterOn(allMessages.neuroRelated)
      .filter(t => (t.data.artifact == 'labs'));

    let sub1 = labs
      .filter(t => t.data.checked)
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            console.log(d.data);
            //make api call
            //  this
            // .brokerService
            // .httpGet(allHttpMessages.httpGetLabs);
            this.createChart();
          })();
      });

    let sub2 = labs
      .filter(t => !t.data.checked)
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            console.log(d.data);
            this.removeChart();
          })();
      })

      this
      .subscriptions
      .add(sub1)
      .add(sub2);
  }
  ngOnDestroy() {
    this
      .subscriptions
      .unsubscribe();
  }
  removeChart() {
    d3.select('#labs').selectAll("*").remove();
  }
  createChart() {
    this.datasetA = this.labsData.map(d => {
      return {
        ...d,
        orderDate: new Date(d.dates.orderDate),
        axis: 3.0,
        status: d.status,
        orderFormatDate: d.dates.orderDate

      }
    }).sort((a, b) => a.orderDate - b.orderDate);
    for(let k=0;k<this.datasetA.length;k++)
    {
      
        this.datasetC.push(this.datasetA[k]);
     
    }
    
    let repeatCount=0;
    let isComplete = "Empty";
  
    for(let i=0;i<this.datasetC.length;i++)
    {
      for(let j=0;j<this.datasetC.length;j++)
      {
        if(this.datasetC[i].orderFormatDate == this.datasetC[j].orderFormatDate)
        {
          if(repeatCount == 0)
          {
            if(this.datasetC[j].status == "Completed")
            {
              isComplete="Full";
            }
           
              this.datasetB.push({'orderDate':this.datasetC[j].orderDate,
              'status':isComplete,
              'orderDetails': [this.datasetC[j]]
              }) 
            
            
          repeatCount++;
          }
          else{
            if(this.datasetC[j].status != "Completed" && isComplete=="Full")
            {
              isComplete="Half";
              this.datasetB[this.datasetB.length - 1].status = isComplete;
            }
            else if(this.datasetC[j].status == "Completed" && isComplete=="Empty")
            {
              isComplete="Half";
              this.datasetB[this.datasetB.length - 1].status = isComplete;
            }
            this.datasetB[this.datasetB.length - 1].orderDetails.push(this.datasetC[j]);
            this.datasetC.splice(j, 1);
            
          }
           
        }
      }
     
      repeatCount = 0;
      isComplete = "Empty";
    }
    this.datasetB = this.datasetB.map(d => {
      return {
        ...d,
        orderDate: d.orderDate,
        axis: 3.0,
        status: d.status
       
      }
    }).sort((a, b) => a.orderDate - b.orderDate);


    let element = d3.select("#labs");
    this.width = GRAPH_SETTINGS.panel.offsetWidth - GRAPH_SETTINGS.panel.marginLeft - GRAPH_SETTINGS.panel.marginRight;
    this.height = GRAPH_SETTINGS.panel.offsetHeight - GRAPH_SETTINGS.panel.marginTop - GRAPH_SETTINGS.panel.marginBottom;

    this.yScale = d3
      .scaleLinear()
      .domain(this.yDomain)
      .range([GRAPH_SETTINGS.labs.chartHeight - 20, 0]);

      this.lineA = d3.line<any>()
      .x((d: any) => this.chartState.xScale(d.orderDate))
      .y((d: any) => this.yScale(d.axis));

    this.chart = d3.select("#labs")
      .attr("transform", "translate(" + GRAPH_SETTINGS.panel.marginLeft + "," + GRAPH_SETTINGS.labs.positionTop + ")");

    this.pathUpdate = this.chart.append("path")
      .datum([
        { "orderDate": this.chartState.xDomain.defaultMinValue, "axis": 3.0 },
        { "orderDate": this.chartState.xDomain.defaultMaxValue, "axis": 3.0 }
      ])
      .attr("d", this.lineA)
      .attr("stroke", "#00AAA5")
      .attr("stroke-width", "10")
      .attr("opacity", "0.25")
      .attr("fill", "none")
      .attr("class", "lineA")

    let gradLab = this.chart
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradLab")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "100%")
      .attr("y2", "0%");

    gradLab.append("stop").attr("offset", "50%").style("stop-color", "#00AAA5");
    gradLab.append("stop").attr("offset", "50%").style("stop-color", "white");


    this.chart.selectAll(".dotA")
      .data(this.datasetB)
      .enter()
      .append("circle")
      .attr("class", "dotA")
      .attr("cx", d => this.chartState.xScale(d.orderDate))
      .attr("cy", d => this.yScale(d.axis))
      .attr("r", 10)
      .attr('class', 'x-axis-arrow')
      .style("stroke", "#00AAA5")
      .style("fill", d => {
        let returnColor;
        if (d.status == "Empty") {
          returnColor = "#FFF"
        }
        else if (d.status == "Full") {
          returnColor = "#00AAA5"
        }
        else {
          returnColor = "url(#gradLab)"
        }
        return returnColor;
      })
      .on('click', d => {
      })

    this.chart.append("text")
      .attr("transform", "translate(" + this.chartState.xScale(this.chartState.xDomain.defaultMinValue) + "," + "3.0" + ")")
      .attr("dy", this.yScale(3.0))
      .attr("text-anchor", "start")
      .attr("font-size", "10px")
      .text("Labs");
  }
}
