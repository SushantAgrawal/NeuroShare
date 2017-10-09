import { Component, OnInit, Input, ViewEncapsulation,ViewChild,TemplateRef } from '@angular/core';
import * as d3 from 'd3';
import { GRAPH_SETTINGS } from '../../neuro-graph.config';
import { BrokerService } from '../../broker/broker.service';
import { allMessages, allHttpMessages } from '../../neuro-graph.config';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: '[app-imaging]',
  templateUrl: './imaging.component.html',
  styleUrls: ['./imaging.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImagingComponent implements OnInit {
  @ViewChild('imagingSecondLevelTemplate') private imagingSecondLevelTemplate: TemplateRef<any>;
  @Input() private chartState: any;
  private chart: any;
  private width: number;
  private height: number;
  //private xScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  private yScale: any;
  private yDomain: Array<number> = [0, 1];
  private lineA: any;
  private pathUpdate: any;
  private subscriptions: any;
  private imagingDataDetails: Array<any>;
  private imagingData: Array<any> = [
    {
      "authorizingProvider": "FREEHAN, REBECA",
      "resultingLab": "",
      "orderID": "93649292",
      "status": "Completed",
      "orderType": "RAD MRI",
      "associatedDiagnosis": {
        "id": "3484",
        "description": "Multiple sclerosis (HCC)"
      },
      "impression": [
        "Impression: Multiple focal regions of abnormal increased T2-weighted and FLAIR",
        "signal in the subcortical and periventricular frontal, parietal and occipital",
        "white matter bilaterally consistent with patient's history of multiple",
        "sclerosis. Overall the lesions appear unchanged since prior no clearly new",
        "lesions are seen.",
        "",
        "Dictated and signed by: Duck, Donald, MD 09/2/2017 4:25 PM"
      ],
      "narrative": [
        "History: xx-year-old treatment for MS, follow-up.",
        "",
        "Comparison: Comparison is made exam dated 10/08/2016.",
        "",
        "Technique: Sagittal T1, axial T2, axial diffusion weighted, axial and coronal",
        "FLAIR images of the brain were obtained.",
        "",
        "Findings: Evaluation of the images reveals a normal appearance to the midline",
        "structures. Axial T2-weighted images reveal bilateral carotid and a basilar",
        "arterial flow-voids. The ventricular system is within normal limits. Multiple",
        "focal regions of abnormal increased T2-weighted and FLAIR signal are seen in the",
        "cortical and periventricular frontal, parietal, and occipital white matter",
        "bilaterally. The lesions appear unchanged since prior. No clearly new lesion is",
        "seen. No abnormal brainstem signal is seen. No restricted diffusion is seen. No",
        "abnormal gradient echo signal is identified. The orbits and paranasal sinuses",
        "appear unremarkable.",
        ""
      ],
      "orderDate": "08/30/2017",
      "orderTime": "12:34:01",
      "orderingProvider": "FREEHAN, REBECA",
      "contactSerialNumber": "865482572",
      "radStatusID": "99",
      "isAbnormal": "No",
      "description": "MRI BRAIN WO CONTRAST",
      "specimen": {
        "id": [
          "XXX17002612950"
        ],
        "applicationID": [],
        "takenDate": "09/02/2017",
        "takenTime": "16:20:38"
      },
      "associatedAppointments": [
        {
          "appointmentDate": "09/02/2017",
          "appointmentTime": "02:45PM",
          "appointmentStatus": "Completed",
          "contactSerialNumber": "882837282"
        }
      ],
      "resultDate": "09/05/2017",
      "displayName": "MRI Brain Without Contrast",
      "radStatusDescription": "Final",
      "procedure": "MRI BRAIN WO CONTRAST",
      "resultTime": "16:25:08",
      "image_launch_url": "http://viewer.sutterhealth.org/vslink/v1/viewstudy.asp?authinfo=AJfoKmAH28B75TcSh+fAujngWwfUKI6ZB9LojIrwZLc=&acc=XXX17002612950"
    },
    {
      "authorizingProvider": "FREEHAN, REBECA",
      "resultingLab": "",
      "orderID": "93649294",
      "status": "Open",
      "orderType": "RAD MRI",
      "associatedDiagnosis": {
        "id": "3484",
        "description": "Multiple sclerosis (HCC)"
      },
      "impression": [
        "Impression: Multiple focal regions of abnormal increased T2-weighted and FLAIR",
        "signal in the subcortical and periventricular frontal, parietal and occipital",
        "white matter bilaterally consistent with patient's history of multiple",
        "sclerosis. Overall the lesions appear unchanged since prior no clearly new",
        "lesions are seen.",
        "",
        "Dictated and signed by: Duck, Donald, MD 09/2/2017 4:25 PM"
      ],
      "narrative": [
        "History: xx-year-old treatment for MS, follow-up.",
        "",
        "Comparison: Comparison is made exam dated 10/08/2016.",
        "",
        "Technique: Sagittal T1, axial T2, axial diffusion weighted, axial and coronal",
        "FLAIR images of the brain were obtained.",
        "",
        "Findings: Evaluation of the images reveals a normal appearance to the midline",
        "structures. Axial T2-weighted images reveal bilateral carotid and a basilar",
        "arterial flow-voids. The ventricular system is within normal limits. Multiple",
        "focal regions of abnormal increased T2-weighted and FLAIR signal are seen in the",
        "cortical and periventricular frontal, parietal, and occipital white matter",
        "bilaterally. The lesions appear unchanged since prior. No clearly new lesion is",
        "seen. No abnormal brainstem signal is seen. No restricted diffusion is seen. No",
        "abnormal gradient echo signal is identified. The orbits and paranasal sinuses",
        "appear unremarkable.",
        ""
      ],
      "orderDate": "08/30/2017",
      "orderTime": "12:34:01",
      "orderingProvider": "FREEHAN, REBECA",
      "contactSerialNumber": "865482572",
      "radStatusID": "99",
      "isAbnormal": "No",
      "description": "MRI SPINE WO CONTRAST",
      "specimen": {
        "id": [
          "XXX17002612950"
        ],
        "applicationID": [],
        "takenDate": "09/02/2017",
        "takenTime": "16:20:38"
      },
      "associatedAppointments": [
        {
          "appointmentDate": "09/02/2017",
          "appointmentTime": "02:45PM",
          "appointmentStatus": "Completed",
          "contactSerialNumber": "882837282"
        }
      ],
      "resultDate": "09/05/2017",
      "displayName": "MRI Spine Without Contrast",
      "radStatusDescription": "Final",
      "procedure": "MRI SPINE WO CONTRAST",
      "resultTime": "16:25:08",
      "image_launch_url": "http://viewer.sutterhealth.org/vslink/v1/viewstudy.asp?authinfo=AJfoKmAH28B75TcSh+fAujngWwfUKI6ZB9LojIrwZLc=&acc=XXX17002612950"
    },
    {
      "authorizingProvider": "FREEHAN, REBECA",
      "resultingLab": "",
      "orderID": "93649296",
      "status": "Open",
      "orderType": "RAD MRI",
      "associatedDiagnosis": {
        "id": "3484",
        "description": "Multiple sclerosis (HCC)"
      },
      "impression": [
        "Impression: Multiple focal regions of abnormal increased T2-weighted and FLAIR",
        "signal in the subcortical and periventricular frontal, parietal and occipital",
        "white matter bilaterally consistent with patient's history of multiple",
        "sclerosis. Overall the lesions appear unchanged since prior no clearly new",
        "lesions are seen.",
        "",
        "Dictated and signed by: Duck, Donald, MD 09/2/2017 4:25 PM"
      ],
      "narrative": [
        "History: xx-year-old treatment for MS, follow-up.",
        "",
        "Comparison: Comparison is made exam dated 10/08/2016.",
        "",
        "Technique: Sagittal T1, axial T2, axial diffusion weighted, axial and coronal",
        "FLAIR images of the brain were obtained.",
        "",
        "Findings: Evaluation of the images reveals a normal appearance to the midline",
        "structures. Axial T2-weighted images reveal bilateral carotid and a basilar",
        "arterial flow-voids. The ventricular system is within normal limits. Multiple",
        "focal regions of abnormal increased T2-weighted and FLAIR signal are seen in the",
        "cortical and periventricular frontal, parietal, and occipital white matter",
        "bilaterally. The lesions appear unchanged since prior. No clearly new lesion is",
        "seen. No abnormal brainstem signal is seen. No restricted diffusion is seen. No",
        "abnormal gradient echo signal is identified. The orbits and paranasal sinuses",
        "appear unremarkable.",
        ""
      ],
      "orderDate": "08/30/2016",
      "orderTime": "12:34:01",
      "orderingProvider": "FREEHAN, REBECA",
      "contactSerialNumber": "865482572",
      "radStatusID": "99",
      "isAbnormal": "No",
      "description": "MRI BRAIN WO CONTRAST",
      "specimen": {
        "id": [
          "XXX17002612950"
        ],
        "applicationID": [],
        "takenDate": "09/02/2017",
        "takenTime": "16:20:38"
      },
      "associatedAppointments": [
        {
          "appointmentDate": "09/02/2017",
          "appointmentTime": "02:45PM",
          "appointmentStatus": "Completed",
          "contactSerialNumber": "882837282"
        }
      ],
      "resultDate": "09/05/2017",
      "displayName": "MRI Shoulder Without Contrast",
      "radStatusDescription": "Final",
      "procedure": "MRI BRAIN WO CONTRAST",
      "resultTime": "16:25:08",
      "image_launch_url": "http://viewer.sutterhealth.org/vslink/v1/viewstudy.asp?authinfo=AJfoKmAH28B75TcSh+fAujngWwfUKI6ZB9LojIrwZLc=&acc=XXX17002612950"
    },
    {
      "authorizingProvider": "FREEHAN, REBECA",
      "resultingLab": "",
      "orderID": "93649290",
      "status": "Completed",
      "orderType": "RAD MRI",
      "associatedDiagnosis": {
        "id": "3484",
        "description": "Multiple sclerosis (HCC)"
      },
      "impression": [
        "Impression: Multiple focal regions of abnormal increased T2-weighted and FLAIR",
        "signal in the subcortical and periventricular frontal, parietal and occipital",
        "white matter bilaterally consistent with patient's history of multiple",
        "sclerosis. Overall the lesions appear unchanged since prior no clearly new",
        "lesions are seen.",
        "",
        "Dictated and signed by: Duck, Donald, MD 09/2/2017 4:25 PM"
      ],
      "narrative": [
        "History: xx-year-old treatment for MS, follow-up.",
        "",
        "Comparison: Comparison is made exam dated 10/08/2016.",
        "",
        "Technique: Sagittal T1, axial T2, axial diffusion weighted, axial and coronal",
        "FLAIR images of the brain were obtained.",
        "",
        "Findings: Evaluation of the images reveals a normal appearance to the midline",
        "structures. Axial T2-weighted images reveal bilateral carotid and a basilar",
        "arterial flow-voids. The ventricular system is within normal limits. Multiple",
        "focal regions of abnormal increased T2-weighted and FLAIR signal are seen in the",
        "cortical and periventricular frontal, parietal, and occipital white matter",
        "bilaterally. The lesions appear unchanged since prior. No clearly new lesion is",
        "seen. No abnormal brainstem signal is seen. No restricted diffusion is seen. No",
        "abnormal gradient echo signal is identified. The orbits and paranasal sinuses",
        "appear unremarkable.",
        ""
      ],
      "orderDate": "08/30/2015",
      "orderTime": "12:34:01",
      "orderingProvider": "FREEHAN, REBECA",
      "contactSerialNumber": "865482572",
      "radStatusID": "99",
      "isAbnormal": "No",
      "description": "MRI BRAIN WO CONTRAST",
      "specimen": {
        "id": [
          "XXX17002612950"
        ],
        "applicationID": [],
        "takenDate": "09/02/2017",
        "takenTime": "16:20:38"
      },
      "associatedAppointments": [
        {
          "appointmentDate": "09/02/2017",
          "appointmentTime": "02:45PM",
          "appointmentStatus": "Completed",
          "contactSerialNumber": "882837282"
        }
      ],
      "resultDate": "09/05/2017",
      "displayName": "MRI Cervical Without Contrast",
      "radStatusDescription": "Final",
      "procedure": "MRI BRAIN WO CONTRAST",
      "resultTime": "16:25:08",
      "image_launch_url": "http://viewer.sutterhealth.org/vslink/v1/viewstudy.asp?authinfo=AJfoKmAH28B75TcSh+fAujngWwfUKI6ZB9LojIrwZLc=&acc=XXX17002612950"
    }
  ];

  private datasetA: Array<any> ;
  private datasetB: Array<any> =[];
  private datasetC: Array<any> =[];
  private dialogRef: any;
  constructor(private brokerService: BrokerService,public dialog: MdDialog) { }

  ngOnInit() {
    this.subscriptions = this
    .brokerService
    .filterOn(allHttpMessages.httpGetImaging)
    .subscribe(d => {
     // debugger;
      d.error
        ? console.log(d.error)
        : (() => {
          
          this.imagingData = d.data.EPIC.patient[0].imagingOrders;
          this.createChart();
        })();
    })

    let imaging = this
      .brokerService
      .filterOn(allMessages.neuroRelated)
      .filter(t => (t.data.artifact == 'imaging'));

    let sub1 = imaging
      .filter(t => t.data.checked)
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            console.log(d.data);
            //make api call
             //this
            // .brokerService
            // .httpGet(allHttpMessages.httpGetImaging);
            this.createChart();
          })();
      });

    let sub2 = imaging
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

  showSecondLevel(data) {
    console.log(data);
   
    this.imagingDataDetails = data.orderDetails;
   
      let dialogConfig = { hasBackdrop: true, panelClass: 'ns-images-theme', width: '375px' };
      this.dialogRef = this.dialog.open(this.imagingSecondLevelTemplate, dialogConfig);
   

  }
  removeChart() {
    d3.select('#imaging').selectAll("*").remove();
    this.datasetB=[];
    this.datasetC=[];
  }
  createChart() {
   // debugger;
    this.datasetA = this.imagingData.map(d => {
      return {
        ...d,
        orderDate: new Date(d.orderDate),
        axis: 3.0,
        status: d.status,
        orderFormatDate: d.orderDate

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
    //debugger;
    let element = d3.select("#imaging");
    this.width = GRAPH_SETTINGS.panel.offsetWidth - GRAPH_SETTINGS.panel.marginLeft - GRAPH_SETTINGS.panel.marginRight;
    this.height = GRAPH_SETTINGS.panel.offsetHeight - GRAPH_SETTINGS.panel.marginTop - GRAPH_SETTINGS.panel.marginBottom;

    this.yScale = d3
      .scaleLinear()
      .domain(this.yDomain)
      .range([GRAPH_SETTINGS.imaging.chartHeight - 20, 0]);

    //this.xScale = d3.scaleLinear().domain(this.chartState.xDomain).range([0, this.width, 0]);
    this.lineA = d3.line<any>()
      .x((d: any) => this.chartState.xScale(d.orderDate))
      .y((d: any) => this.yScale(d.axis));

    this.chart = d3.select("#imaging")
      .attr("transform", "translate(" + GRAPH_SETTINGS.panel.marginLeft + "," + GRAPH_SETTINGS.imaging.positionTop + ")");

    this.pathUpdate = this.chart.append("path")
      .datum([
        { "orderDate": this.chartState.xDomain.defaultMinValue, "axis": 3.0 },
        { "orderDate": this.chartState.xDomain.defaultMaxValue, "axis": 3.0 }
      ])
      .attr("d", this.lineA)
      .attr("stroke", "#BE90D4")
      .attr("stroke-width", "10")
      .attr("opacity", "0.25")
      .attr("fill", "none")
      .attr("class", "lineA")



    let gradImg = this.chart
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradImg")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "100%")
      .attr("y2", "0%");

    gradImg.append("stop").attr("offset", "50%").style("stop-color", "#BE90D4");
    gradImg.append("stop").attr("offset", "50%").style("stop-color", "white");


    this.chart.selectAll(".dotA")
      .data(this.datasetB)
      .enter()
      .append("circle")
      .attr("class", "dotA")
      .attr("cx", d => this.chartState.xScale(d.orderDate))
      .attr("cy", d => this.yScale(d.axis))
      .attr("r", 10)
      .attr('class', 'x-axis-arrow')
      .style("stroke", "#BE90D4")
      .style("fill", d => {
        let returnColor;
        if (d.status == "Empty") {
          returnColor = "#FFF"
        }
        else if (d.status == "Full") {
          returnColor = "#BE90D4"
        }
        else {
          returnColor = "url(#gradImg)"
        }
        return returnColor;
      })
      .on('click', d => {
        this.showSecondLevel(d);
      })

    this.chart.append("text")
      .attr("transform", "translate(" + this.chartState.xScale(this.chartState.xDomain.defaultMinValue) + "," + "3.0" + ")")
      .attr("dy", this.yScale(3.0))
      .attr("text-anchor", "start")
      .attr("font-size", "10px")
      .text("Images");


  }
}

