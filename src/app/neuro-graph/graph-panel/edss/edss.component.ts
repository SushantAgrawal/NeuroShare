import { Component, OnInit, Input, ViewChild, TemplateRef, Inject, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { BrokerService } from '../../broker/broker.service';
import { allMessages, allHttpMessages, medication } from '../../neuro-graph.config';
import { GRAPH_SETTINGS } from '../../neuro-graph.config';
import { MdDialog, MdDialogRef } from '@angular/material';
import { edssPopup } from '../../neuro-graph.config';
import { NeuroGraphService } from '../../neuro-graph.service';

@Component({
  selector: '[app-edss]',
  templateUrl: './edss.component.html',
  styleUrls: ['./edss.component.sass'],
  encapsulation: ViewEncapsulation.None
})

export class EdssComponent implements OnInit {
  @ViewChild('edssSecondLevelTemplate') private edssSecondLevelTemplate: TemplateRef<any>;
  @ViewChild('edssSecondLevelAddTemplate') private edssSecondLevelAddTemplate: TemplateRef<any>;
  @Input() private chartState: any;
  dialogRef: MdDialogRef<any>;
  private edssScoreDetail: any;
  private subscriptions: any;
  private yScale: any;
  private yDomain: Array<number> = [0, GRAPH_SETTINGS.edss.maxValueY];
  private edssData: Array<any>;
  private edssPopupQuestions: any = [];
  private type: any;
  private score: any;

  //Questionnaire static
  questionnaireEdssData = [
    {
      "id": "7",
      "os": "",
      "qx_started_at": "2017-08-16 12:50:00",
      "status": "COMPLETED",
      "type": "Full",
      "id_type": "PatientID",
      "qx_id": "8010",
      "qx_name": "MS-SHARE-QX",
      "browser": "",
      "qx_completed_at": "2017-08-17 12:52:57",
      "edss_score": "2.5",
      "pom_id": "82043"
    },
    {
      "id": "6",
      "os": "",
      "qx_started_at": "2017-02-13 12:50:00",
      "status": "COMPLETED",
      "type": "Full",
      "id_type": "PatientID",
      "qx_id": "7625",
      "qx_name": "MS-SHARE-QX",
      "browser": "",
      "qx_completed_at": "2017-02-15 12:52:57",
      "edss_score": "2.0",
      "pom_id": "82043"
    },
    {
      "id": "5",
      "os": "",
      "qx_started_at": "2016-08-11 12:50:00",
      "status": "COMPLETED",
      "type": "Full",
      "id_type": "PatientID",
      "qx_id": "5081",
      "qx_name": "MS-SHARE-QX",
      "browser": "",
      "qx_completed_at": "2016-08-12 12:52:57",
      "edss_score": "3",
      "pom_id": "82043"
    },
    {
      "id": "4",
      "os": "",
      "qx_started_at": "2016-01-05 12:50:00",
      "status": "COMPLETED",
      "type": "Full",
      "id_type": "PatientID",
      "qx_id": "5081",
      "qx_name": "MS-SHARE-QX",
      "browser": "",
      "qx_completed_at": "2016-01-05 12:52:57",
      "edss_score": "2",
      "pom_id": "82043"
    }
  ]
  //temporary hard-coded data for area and mean
  datasetArea1 = [
    {
      "xDate": Date.parse("01/01/2015"),
      "q2": 1,
      "q3": 2.5
    },
    {
      "xDate": Date.parse("06/30/2015"),
      "q2": 1,
      "q3": 2.5
    },
    {
      "xDate": Date.parse("06/30/2016"),
      "q2": 2,
      "q3": 5
    },
    {
      "xDate": Date.parse("06/30/2017"),
      "q2": 1.8,
      "q3": 3.5
    },
    {
      "xDate": Date.parse("12/31/2017"),
      "q2": 1.8,
      "q3": 3.5
    }
  ];

  datasetArea2 = [
    {
      "xDate": Date.parse("01/01/2015"),
      "q1": 0,
      "q4": 5
    },
    {
      "xDate": Date.parse("06/30/2015"),
      "q1": 0,
      "q4": 5
    },
    {
      "xDate": Date.parse("06/30/2016"),
      "q1": 1.2,
      "q4": 7.5
    },
    {
      "xDate": Date.parse("06/30/2017"),
      "q1": 1,
      "q4": 6
    },
    {
      "xDate": Date.parse("12/31/2017"),
      "q1": 1,
      "q4": 6
    }
  ];

  datasetMean = [
    {
      "xDate": Date.parse("01/1/2015"),
      "m": 2
    },
    {
      "xDate": Date.parse("06/30/2015"),
      "m": 2
    },
    {
      "xDate": Date.parse("06/30/2016"),
      "m": 3.2
    },
    {
      "xDate": Date.parse("06/30/2017"),
      "m": 2.2
    },
    {
      "xDate": Date.parse("12/31/2017"),
      "m": 2.2
    }
  ];

  constructor(private brokerService: BrokerService, private dialog: MdDialog, private neuroGraphService: NeuroGraphService) {

  }

  selectEdssScore(index): void {
    this.edssPopupQuestions.forEach(q => {
      q.checked = false;
    });
    this.edssPopupQuestions[index].checked = true;
  }

  submitEdssScore(event) {
    let selectedScore = this.edssPopupQuestions.find(x => x.checked == true);
    if (!selectedScore) {
      event.stopPropagation()
      return;
    };
    if (this.type == 'Add') {
      //Call api and update local data on success
      this.edssData.push({
        last_updated_instant: new Date(),
        last_updated_provider_id: "G00123",
        save_csn: this.neuroGraphService.get("queryParams").csn,
        save_csn_status: this.neuroGraphService.get("queryParams").encounter_status,
        score: selectedScore.score,
      })
    }
    else {
      debugger;
      //Call Update API
    }
    this.removeChart();
    this.drawChart();
    this.dialogRef.close();
  }

  ngOnInit() {
    this.type = "Add";
    this.subscriptions = this
      .brokerService
      .filterOn(allHttpMessages.httpGetEdss)
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            this.edssData = d.data.edss_scores;
            this.drawChart();
          })();
      })
    let edss = this
      .brokerService
      .filterOn(allMessages.neuroRelated)
      .filter(t => (t.data.artifact == 'edss'));

    let modal = this
      .brokerService
      .filterOn(allMessages.invokeAddEdss)

    let virtualCaseLoad = this
      .brokerService
      .filterOn(allMessages.virtualCaseload)

    let sub1 = edss
      .filter(t => t.data.checked)
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            console.log(d.data);
            //make api call
            this
              .brokerService
              .httpGet(allHttpMessages.httpGetEdss);
          })();
      });
    let sub2 = edss
      .filter(t => !t.data.checked)
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            this.removeChart();
          })();
      })
    let sub3 = modal
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            console.log(d.data);
            this.dialogRef = this.dialog.open(this.edssSecondLevelAddTemplate, {
              width: '600px',
              height: '650px'
            });
          })();
      })
    let sub4 = virtualCaseLoad
      .subscribe(d => {
        d.error
          ? console.log(d.error)
          : (() => {
            console.log(d.data);
            if (d.data.artifact == "add") {
              this.removeChart();
              this.drawChartWithVirtualCaseload();
            }
            else {
              this.removeChart();
              this.drawChart();
            }


          })();
      })
    this
      .subscriptions
      .add(sub1)
      .add(sub2)
      .add(sub3);

    this.edssPopupQuestions = edssPopup;
    this.edssPopupQuestions.map(x => x.checked = false);
    if (this.score != '') {
      this.edssPopupQuestions.forEach(x => { if (x.score == this.score) x.checked = true });
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  showSecondLevel(data) {





    let config = { hasBackdrop: true, panelClass: 'edssSecondLevel', width: '600px' };
    this.edssScoreDetail = data;
    this.dialogRef = this.dialog.open(this.edssSecondLevelTemplate, config);
  }

  drawChartWithVirtualCaseload() {
    //data preparation
    let dataset = this.edssData.map(d => {
      return {
        ...d,
        lastUpdatedDate: Date.parse(d.last_updated_instant),
        reportedBy: "Clinician",
        scoreValue: parseFloat(d.score)
      }
    }).sort((a, b) => a.lastUpdatedDate - b.lastUpdatedDate);

    let questionnaireDataset = this.questionnaireEdssData.map(d => {
      return {
        ...d,
        lastUpdatedDate: Date.parse(d.qx_completed_at),
        reportedBy: "Patient",
        scoreValue: parseFloat(d.edss_score)
      }
    }).sort((a, b) => a.lastUpdatedDate - b.lastUpdatedDate);

    this.yScale = d3
      .scaleLinear()
      .domain(this.yDomain)
      .range([GRAPH_SETTINGS.edss.chartHeight - 20, 0]);

    let line = d3.line<any>()
      .x((d: any) => this.chartState.xScale(d.lastUpdatedDate))
      .y((d: any) => this.yScale(d.scoreValue));

    let lineMean = d3.line<any>()
      .x((d: any) => this.chartState.xScale(d.xDate))
      .y((d: any) => this.yScale(d.m));

    var area1 = d3.area()
      .x((d: any) => this.chartState.xScale(d.xDate))
      .y0((d: any) => this.yScale(d.q2))
      .y1((d: any) => this.yScale(d.q3));

    var area2 = d3.area()
      .x((d: any) => this.chartState.xScale(d.xDate))
      .y0((d: any) => this.yScale(d.q1))
      .y1((d: any) => this.yScale(d.q4));

    let svg = d3
      .select('#edss')
      .attr('class', 'edss-elements-wrapper')
      .attr('transform', `translate(${GRAPH_SETTINGS.panel.marginLeft},${GRAPH_SETTINGS.edss.positionTop})`)

    svg.append('g')
      .attr('class', 'edss-y-axis')
      .call(g => {
        let yAxis = g.call(d3.axisLeft(this.yScale).tickFormat(d3.format('.1f')));
        g.select('.domain').remove();
        yAxis.selectAll('line')
          .style('display', 'none');
        yAxis.selectAll('text')
          .attr('x', '-5')
          .attr('fill', GRAPH_SETTINGS.edss.color)
          .style('font-size', '1.2em')
          .style('font-weight', 'bold');
      });

    svg.append("path")
      .datum(this.datasetArea2)
      .attr("fill", "lightgrey")
      .attr("d", area2);

    svg.append("path")
      .datum(this.datasetArea1)
      .attr("fill", "darkgrey")
      .attr("d", area1);

    svg.append('path')
      .datum(questionnaireDataset)
      .attr('class', 'line')
      .style('fill', 'none')
      .style('stroke', GRAPH_SETTINGS.edss.color)
      .style('stroke-width', '1')
      .attr('d', line);

    svg.append('path')
      .datum(this.datasetMean)
      .attr('class', 'line')
      .style('fill', 'none')
      .style('stroke', "white")
      .style('stroke-width', '1')
      .attr('d', lineMean);

    svg.selectAll('.dot-clinician')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'dot-clinician')
      .attr('cx', d => this.chartState.xScale(d.lastUpdatedDate))
      .attr('cy', d => this.yScale(d.scoreValue))
      .attr('r', 7)
      .style('fill', GRAPH_SETTINGS.edss.color)
      .style('cursor', 'pointer')
      .on('click', d => {
        this.showSecondLevel(d);
      })

      svg.selectAll('.dot-patient')
      .data(questionnaireDataset)
      .enter()
      .append('circle')
      .attr('class', 'dot-patient')
      .attr('cx', d => this.chartState.xScale(d.lastUpdatedDate))
      .attr('cy', d => this.yScale(d.scoreValue))
      .attr('r', 7)
      .style('fill', GRAPH_SETTINGS.edss.color)
      .style('cursor', 'pointer')
      .on('click', d => {
        let match = this.edssData.find(itm => {
          let cDt = new Date(itm.last_updated_instant);
          let pDt = new Date(d.qx_completed_at);
          return parseFloat(itm.score) == parseFloat(d.edss_score) && pDt.getDate() == cDt.getDate() && pDt.getMonth() == cDt.getMonth() && pDt.getFullYear()==cDt.getFullYear();
        });
        if(match){
          d.reportedBy="Patient and Clinician";
        }
        this.showSecondLevel(d);
      })

    svg.selectAll('.label-clinician')
      .data(dataset)
      .enter()
      .append('text')
      .attr('class', 'label-clinician')
      .style('font-size', '0.8em')
      .attr('x', d => this.chartState.xScale(d.lastUpdatedDate) - 5)
      .attr('y', d => this.yScale(d.scoreValue) - 10)
      .text(d => d.scoreValue);

    svg.selectAll('.label-patient')
      .data(questionnaireDataset)
      .enter()
      .append('text')
      .attr('class', 'label-patient')
      .style('font-size', '0.8em')
      .attr('x', d => this.chartState.xScale(d.lastUpdatedDate) - 5)
      .attr('y', d => this.yScale(d.scoreValue) - 10)
      .text(d => d.scoreValue);

  }

  drawChart() {
    //data preparation
    let edssDataset = this.edssData.map(d => {
      return {
        ...d,
        lastUpdatedDate: Date.parse(d.last_updated_instant),
        reportedBy: "Clinician",
        scoreValue: parseFloat(d.score)
      }
    }).sort((a, b) => a.lastUpdatedDate - b.lastUpdatedDate);

    let questionnaireDataset = this.questionnaireEdssData.map(d => {
      return {
        ...d,
        lastUpdatedDate: Date.parse(d.qx_completed_at),
        reportedBy: "Patient",
        scoreValue: parseFloat(d.edss_score)
      }
    }).sort((a, b) => a.lastUpdatedDate - b.lastUpdatedDate);

    this.yScale = d3
      .scaleLinear()
      .domain(this.yDomain)
      .range([GRAPH_SETTINGS.edss.chartHeight - 20, 0]);

    let line = d3.line<any>()
      .x((d: any) => this.chartState.xScale(d.lastUpdatedDate))
      .y((d: any) => this.yScale(d.scoreValue));


    let svg = d3
      .select('#edss')
      .attr('class', 'edss-elements-wrapper')
      .attr('transform', `translate(${GRAPH_SETTINGS.panel.marginLeft},${GRAPH_SETTINGS.edss.positionTop})`)

    svg.append('g')
      .attr('class', 'edss-y-axis')
      .call(g => {
        let yAxis = g.call(d3.axisLeft(this.yScale).tickFormat(d3.format('.1f')));
        g.select('.domain').remove();
        yAxis.selectAll('line')
          .style('display', 'none');
        yAxis.selectAll('text')
          .attr('x', '-5')
          .attr('fill', GRAPH_SETTINGS.edss.color)
          .style('font-size', '1.2em')
          .style('font-weight', 'bold');
      });

    svg.append('path')
      .datum(questionnaireDataset)
      .attr('class', 'line')
      .style('fill', 'none')
      .style('stroke', GRAPH_SETTINGS.edss.color)
      .style('stroke-width', '1')
      .attr('d', line);

    svg.selectAll('.dot-clinician')
      .data(edssDataset)
      .enter()
      .append('circle')
      .attr('class', 'dot-clinician')
      .attr('cx', d => this.chartState.xScale(d.lastUpdatedDate))
      .attr('cy', d => this.yScale(d.scoreValue))
      .attr('r', 7)
      .style('fill', GRAPH_SETTINGS.edss.color)
      .style('cursor', 'pointer')
      .on('click', d => {
        this.showSecondLevel(d);
      })

    svg.selectAll('.dot-patient')
      .data(questionnaireDataset)
      .enter()
      .append('circle')
      .attr('class', 'dot-patient')
      .attr('cx', d => this.chartState.xScale(d.lastUpdatedDate))
      .attr('cy', d => this.yScale(d.scoreValue))
      .attr('r', 7)
      .style('fill', GRAPH_SETTINGS.edss.color)
      .style('cursor', 'pointer')
      .on('click', d => {
        let match = this.edssData.find(itm => {
          let cDt = new Date(itm.last_updated_instant);
          let pDt = new Date(d.qx_completed_at);
          return parseFloat(itm.score) == parseFloat(d.edss_score) && pDt.getDate() == cDt.getDate() && pDt.getMonth() == cDt.getMonth() && pDt.getFullYear()==cDt.getFullYear();
        });
        if(match){
          d.reportedBy="Patient and Clinician";
        }
        this.showSecondLevel(d);
      })

    svg.selectAll('.label-clinician')
      .data(edssDataset)
      .enter()
      .append('text')
      .attr('class', 'label-clinician')
      .style('font-size', '0.8em')
      .attr('x', d => this.chartState.xScale(d.lastUpdatedDate) - 5)
      .attr('y', d => this.yScale(d.scoreValue) - 10)
      .text(d => d.scoreValue);

    svg.selectAll('.label-patient')
      .data(questionnaireDataset)
      .enter()
      .append('text')
      .attr('class', 'label-patient')
      .style('font-size', '0.8em')
      .attr('x', d => this.chartState.xScale(d.lastUpdatedDate) - 5)
      .attr('y', d => this.yScale(d.scoreValue) - 10)
      .text(d => d.scoreValue);

  }

  removeChart() {
    d3.select('#edss').selectAll("*").remove();
  }
}
