import { Component, OnInit, Input, ViewEncapsulation,ViewChild,TemplateRef,Inject } from '@angular/core';
import * as d3 from 'd3';
import { GRAPH_SETTINGS } from '../../neuro-graph.config';
import { BrokerService } from '../../../broker/broker.service';
import { allMessages, allHttpMessages, medication } from '../../neuro-graph.config';
import * as moment from 'moment';
import {MdDialog,MdDialogRef,MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: '[app-relapses]',
  templateUrl: './relapses.component.html',
  styleUrls: ['./relapses.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class RelapsesComponent implements OnInit {
  @ViewChild('relapsesSecondLevelTemplate') private relapsesSecondLevelTemplate: TemplateRef<any>;
  @ViewChild('relapsesEditSecondLevelTemplate') private relapsesEditSecondLevelTemplate: TemplateRef<any>;
  @ViewChild('relapsesAddSecondLevelTemplate') private relapsesAddSecondLevelTemplate: TemplateRef<any>;

  @Input() private chartState: any;
  private yDomain: Array<number> = [0, GRAPH_SETTINGS.edss.maxValueY];
  private width: number;
  private height: number;
  private yScale: any;
  private years = [];
  private months = ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'];
  private relapsesDetail: any;
  private subscriptions: any;
  private pathUpdate: any;
  private lineA: any;
  private chart:any;
  private datasetB: Array<any>;
  private dialogRef: any;
  private datasetA: Array<any> =[
    // {
    //   "score_id": "1",
    //   "score": "2.0",
    //   "last_updated_provider_id": "G00123",
    //   "last_updated_instant": "01/01/2015 10:41:05",
    //   "save_csn": "865482572",
    //   "save_csn_status": "New",
    //   "clinician_confirm":"1",
    //   "relapse_cnt":"2"
    // },
    {
      "score_id": "2",
      "score": "2.0",
      "last_updated_provider_id": "G00123",
      "last_updated_instant": "08/31/2017 10:41:05",
      "save_csn": "865482572",
      "save_csn_status": "Open",
      "clinician_confirm":"1",
      "relapse_cnt":"2"
    },
    {
      "score_id": "3",
      "score": "2.0",
      "last_updated_provider_id": "G00123",
      "last_updated_instant": "02/21/2017 10:41:05",
      "save_csn": "710119378",
      "save_csn_status": "Closed",
      "clinician_confirm":"0",
      "relapse_cnt":""
    },
    {
      "score_id": "4",
      "score": "2.0",
      "last_updated_provider_id": "G00123",
      "last_updated_instant": "08/12/2016 10:41:05",
      "save_csn": "642945505",
      "save_csn_status": "Open",
      "clinician_confirm":"0",
      "relapse_cnt":"2"
    },
    {
      "score_id": "5",
      "score": "2.0",
      "last_updated_provider_id": "G00123",
      "last_updated_instant": "01/05/2016 10:41:05",
      "save_csn": "584384988",
      "save_csn_status": "Closed",
      "clinician_confirm":"1",
      "relapse_cnt":"1"
    }
  ];
  private relapsesData: Array<any>;
    constructor(private brokerService: BrokerService,public dialog: MdDialog)
    {
     
     }
  ngOnInit() {
    for(var i=2017;i>=1917;i--)
    {
      this.years.push(i.toString());
    }
    console.log('relapses ngOnInit');
    this.subscriptions = this
      .brokerService
      .filterOn(allHttpMessages.httpGetEdss)
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            this.relapsesData = d.data.edss_scores;
           
          })();
      })
    let relapses = this
      .brokerService
      .filterOn(allMessages.neuroRelated)
      .filter(t => (t.data.artifact == 'relapses'));

    let sub1 = relapses
      .filter(t => t.data.checked)
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            console.log(d.data);
            this.createChart();
            //make api call
            this
              .brokerService
              .httpGet(allHttpMessages.httpGetEdss);
          })();
      });
    let sub2 = relapses
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
  deleteChart(){
    this.dialogRef.close();
    var objIndex = this.datasetA.findIndex((obj => obj.score_id == this.relapsesDetail.score_id));
    if (objIndex > -1) {
      this.datasetA.splice(objIndex, 1);
   }
   this.removeChart();
   this.createChart();
  }
  updateChart(){
    
    this.dialogRef.close();
    var objIndex = this.datasetA.findIndex((obj => obj.score_id == this.relapsesDetail.score_id));
    this.datasetA[objIndex].last_updated_instant = (new Date(this.relapsesDetail.month + "/15/" + this.relapsesDetail.year).getMonth() + 1).toString() + "/15/" + this.relapsesDetail.year;
    this.datasetA[objIndex].clinician_confirm = this.relapsesDetail.confirm;
    this.removeChart();
    this.createChart();

  
  }
  removeChart() {
    d3.select('#relapses').selectAll("*").remove();
  }
  addChart(){
    this.dialogRef.close();
    var obj = {
      "score_id": this.datasetA.length,
      "score": "2.0",
      "last_updated_provider_id": "G00123",
      "last_updated_instant": (new Date(this.relapsesDetail.month + "/15/" + this.relapsesDetail.year).getMonth() + 1).toString() + "/15/" + this.relapsesDetail.year,
      "save_csn": "584384988",
      "save_csn_status": "Open",
      "clinician_confirm":"1",
      "relapse_cnt":""
    };
    this.datasetA.push(obj);
    this.removeChart();
    this.createChart();
  }
  showSecondLevel(data) {
    console.log(data);
    
    let config = { backdrop: false, class: 'otherMedsSecondLevel' };
    this.relapsesDetail = data;
    if(data.save_csn_status =="Open")
    {
      this.dialogRef = this.dialog.open(this.relapsesSecondLevelTemplate);
    }
    else if(data.save_csn_status =="New")
      {
        this.dialogRef = this.dialog.open(this.relapsesAddSecondLevelTemplate,{width:"450px"});
      }
   
  else{
  
    this.dialogRef = this.dialog.open(this.relapsesEditSecondLevelTemplate,{width:"620px"});
  }
    
  }
  
  checkChge(){
 
    if(this.relapsesDetail.confirm ==1)
      {
        this.relapsesDetail.confirm =0;
      }
      else 
        {
        this.relapsesDetail.confirm =1;
      }
  
  }
  createChart() {
    let dataset = this.relapsesData.map(d => {
      return {
        ...d,
        lastUpdatedDate: Date.parse(d.last_updated_instant),
        scoreValue: parseFloat(d.score)
        
      }
    }).sort((a, b) => a.lastUpdatedDate - b.lastUpdatedDate);

    this.datasetB = this.datasetA.map(d => {
      return {
        ...d,
        lastUpdatedDate: Date.parse(d.last_updated_instant),
        scoreValue: parseFloat(d.score),
        confirm: parseInt(d.clinician_confirm),
        month:moment(d.last_updated_instant).format('MMM'),
        year:moment(d.last_updated_instant).format('YYYY')
       
      }
    }).sort((a, b) => a.lastUpdatedDate - b.lastUpdatedDate);

    let element = d3.select("#relapses");
    this.width = GRAPH_SETTINGS.panel.offsetWidth - GRAPH_SETTINGS.panel.marginLeft - GRAPH_SETTINGS.panel.marginRight;
    this.height = GRAPH_SETTINGS.panel.offsetHeight - GRAPH_SETTINGS.panel.marginTop - GRAPH_SETTINGS.panel.marginBottom;

    this.yScale = d3
    .scaleLinear()
    .domain(this.yDomain)
    .range([GRAPH_SETTINGS.edss.chartHeight - 20, 0]);

    this.lineA = d3.line<any>()
      .x((d: any) => this.chartState.xScale(d.lastUpdatedDate))
      .y((d: any) => this.yScale(d.scoreValue));
      
     

    this.chart = d3.select("#relapses").append("svg")
      .attr("width", element.offsetWidth)
      .attr("height", element.offsetHeight)
      .append("g")
      .attr("transform", "translate(" + GRAPH_SETTINGS.panel.marginLeft + "," + GRAPH_SETTINGS.panel.marginTop + ")");

    this.pathUpdate = this.chart.append("path")
      .datum([
        { "lastUpdatedDate": this.chartState.xDomain.defaultMinValue, "scoreValue": 2.0 },
        { "lastUpdatedDate": this.chartState.xDomain.defaultMaxValue, "scoreValue": 2.0 }
      ])
      .attr("class", "lineA")
      .attr("d", this.lineA)
      .attr("stroke","red")
      .attr("stroke-width","1.5")
      .attr("fill","none");

    let arc = d3.symbol().type(d3.symbolTriangle).size(100);
    this.chart.selectAll(".dotA")
      .data(this.datasetB)
      .enter().append('path')
      .attr('d', arc)
      .attr("class", "dotA")
      .attr('transform', d => {
        return `translate(${(this.chartState.xScale(d.lastUpdatedDate))},${(this.yScale(d.scoreValue))}) rotate(180)`;
      })

      .attr('class', 'x-axis-arrow')
      .style("stroke", "red")
      .style("fill", d => {return d.save_csn_status=="New"?"blue" : d.confirm?'red':'#fff';
        
      })
      .on('click', d => {
        this.showSecondLevel(d);
      })

  }
}
