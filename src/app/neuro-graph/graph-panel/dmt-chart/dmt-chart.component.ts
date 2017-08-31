import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { CanvasDimension, XDomain, RootGraphContainerState } from '../model/shared.model';
import { BrokerService } from '../../../fire-base/broker.service';

@Component({
  selector: '[app-dmt-chart]',
  templateUrl: './dmt-chart.component.html',
  styleUrls: ['./dmt-chart.component.css']
})
export class DmtChartComponent implements OnInit {
  @Input() private chartState: RootGraphContainerState;
  private subscriptions: any;
  private loadChart: boolean;

  private dataset: Array<any> = [
    {
      medicationOrders: {
        medication: {
          id: '8553',
          name: 'Copaxone',
          generic_name: 'Glatiramer Acetate',
          reason_for_med: 'Fatigue'
        },
        date: {
          medStart: '02/21/2014',
          medEnded: '07/12/2016',
          orderDate: '03/21/2016'
        },
        dose: '15ML',
        frequency: 'Every Week',
        refillOrdered: '3',
        refillRemain: '0',
        associatedDiagnosis: 'G07',
        'relapses-X': '1',
        'reasonStopped-X': ''
      }
    },
    {
      medicationOrders: {
        medication: {
          id: '3806',
          name: 'Aubagio',
          generic_name: 'Teriflunomide',
          reason_for_med: 'Balance'
        },
        date: {
          medStart: '09/24/2016',
          medEnded: '',
          orderDate: '08/01/2017'
        },
        dose: '5ML',
        frequency: 'Daily',
        refillOrdered: '3',
        refillRemain: '4',
        associatedDiagnosis: 'G71',
        'relapses-X': '0',
        'reasonStopped-X': ''
      }
    },
    {
      medicationOrders: {
        medication: {
          id: '13409',
          name: 'Ampra',
          generic_name: 'Dalfamdine',
          reason_for_med: 'Bladder'
        },
        date: {
          medStart: '04/20/2017',
          medEnded: '',
          orderDate: ''
        },
        dose: '8ML',
        frequency: 'Weekly',
        refillOrdered: '0',
        refillRemain: '6',
        associatedDiagnosis: 'G16',
        'relapses-X': '2',
        'reasonStopped-X': 'Insurance'
      }
    },
    {
      medicationOrders: {
        medication: {
          id: '8235',
          name: 'Gilenya',
          generic_name: 'Fingolimod HCl',
          reason_for_med: 'Sleep'
        },
        date: {
          medStart: '01/11/2016',
          medEnded: '',
          orderDate: '07/15/2017'
        },
        dose: '5ML',
        frequency: 'Monthly',
        refillOrdered: '1',
        refillRemain: '3',
        associatedDiagnosis: 'G43',
        'relapses-X': '0',
        'reasonStopped-X': ''
      }
    },
    {
      medicationOrders: {
        medication: {
          id: '39679',
          name: 'Ocrevus',
          generic_name: 'Ocrelizumab',
          reason_for_med: 'Vision'
        },
        date: {
          medStart: '02/21/2015',
          medEnded: '',
          orderDate: '08/30/2015'
        },
        dose: '10ML',
        frequency: 'Daily',
        refillOrdered: '1',
        refillRemain: '8',
        associatedDiagnosis: 'G98',
        'relapses-X': '2',
        'reasonStopped-X': 'Needle fatigue'
      }
    },
    {
      medicationOrders: {
        medication: {
          id: '42856',
          name: 'Betaron',
          generic_name: 'Intereta-1b',
          reason_for_med: 'Bowel'
        },
        date: {
          medStart: '04/21/2017',
          medEnded: '',
          orderDate: '08/21/2017'
        },
        dose: '5ML',
        frequency: 'Daily',
        refillOrdered: '1',
        refillRemain: '4',
        associatedDiagnosis: 'G35',
        'relapses-X': '0',
        'reasonStopped-X': ''
      }
    },
    {
      medicationOrders: {
        medication: {
          id: '8546',
          name: 'Reditux',
          generic_name: 'Rituximab IV Soln',
          reason_for_med: 'Pain'
        },
        date: {
          medStart: '09/24/2015',
          medEnded: '',
          orderDate: '02/11/2016'
        },
        dose: '5ML',
        frequency: 'Weekly',
        refillOrdered: '2',
        refillRemain: '4',
        associatedDiagnosis: 'G86',
        'relapses-X': '1',
        'reasonStopped-X': 'Cost'
      }
    },
    {
      medicationOrders: {
        medication: {
          id: '6235',
          name: 'Avonex',
          generic_name: 'Peginterferon Beta-1a',
          reason_for_med: 'Arm Use'
        },
        date: {
          medStart: '06/20/2017',
          medEnded: '',
          orderDate: ''
        },
        dose: '8ML',
        frequency: 'Daily',
        refillOrdered: '0',
        refillRemain: '3',
        associatedDiagnosis: 'G75',
        'relapses-X': '0',
        'reasonStopped-X': ''
      }
    },
    {
      medicationOrders: {
        medication: {
          id: '67321',
          name: 'Tysabri',
          generic_name: 'Natalizumab',
          reason_for_med: 'Leg Use'
        },
        date: {
          medStart: '06/11/2014',
          medEnded: '11/15/2015',
          orderDate: '1/15/2015'
        },
        dose: '5ML',
        frequency: 'Monthly',
        refillOrdered: '2',
        refillRemain: '3',
        associatedDiagnosis: 'G66',
        'relapses-X': '0',
        'reasonStopped-X': ''
      }
    },
    {
      medicationOrders: {
        medication: {
          id: '67321',
          name: 'Tysabri',
          generic_name: 'Natalizumab',
          reason_for_med: 'Leg Use'
        },
        date: {
          medStart: '01/11/2016',
          medEnded: '',
          orderDate: '07/15/2017'
        },
        dose: '5ML',
        frequency: 'Monthly',
        refillOrdered: '2',
        refillRemain: '3',
        associatedDiagnosis: 'G66',
        'relapses-X': '0',
        'reasonStopped-X': ''
      }
    },
    {
      medicationOrders: {
        medication: {
          id: '15987',
          name: 'Lemda',
          generic_name: 'Alemab',
          reason_for_med: 'Swallow'
        },
        date: {
          medStart: '07/21/2017',
          medEnded: '',
          orderDate: ''
        },
        dose: '10ML',
        frequency: 'Daily',
        refillOrdered: '0',
        refillRemain: '4',
        associatedDiagnosis: 'G52',
        'relapses-X': '1',
        'reasonStopped-X': ''
      }
    }

  ];

  constructor(private brokerService: BrokerService) { }

  ngOnInit() {
    this.subscriptions = this
      .brokerService
      .filterOn('test')
      .subscribe(d => {
        debugger;
        this.loadChart = d.data;
      });

    let sub = this.brokerService.filterOn('http:get:test').subscribe(d => {
      console.log(d.data);
    });
    this.subscriptions.add(sub);


    //this.createChart();

  }

  getDateObject(input: string): Date {
    return new Date(input);
  }

  getEndDate(input: string): Date {
    if (input)
      return this.getDateObject(input)
    return this.chartState.xDomain.defaultMaxValue;
  }

  createChart() {
    let svg = d3.select("#dmt-canvas")
      .append("g")
      .attr("transform", "translate(" + this.chartState.canvasDimension.marginLeft + "," + this.chartState.canvasDimension.marginTop + ")");

    let groupsUnfiltered = this.dataset.map(d => d.medicationOrders.medication.id);
    let groups = groupsUnfiltered.filter((elem, pos, arr) => arr.indexOf(elem) == pos);

    let rectangles = svg.append('g')
      .selectAll("rect")
      .data(this.dataset)
      .enter();

    // svg.append("g")
    //   .attr("class", "x axis")
    //   .attr("transform", "translate(0,0)")
    //   .call(d3.axisBottom(this.chartState.xScale));


    var innerRects = rectangles.append("rect")
      .attr("rx", 0)
      .attr("ry", 0)
      .attr("x", d => {
        let medStartDate = this.getDateObject(d.medicationOrders.date.medStart);
        return this.chartState.xScale(medStartDate);
      })
      .attr("y", function (d: any, i) {
        for (var j = 0; j < groups.length; j++) {
          if (d.medicationOrders.medication.id == groups[j]) {
            return j * 30 + 54;
          }
        }
      })
      .attr("width", d => {
        let medStartDate = this.getDateObject(d.medicationOrders.date.medStart);
        let medEndDate = this.getEndDate(d.medicationOrders.date.medEnded);
        return this.chartState.xScale(medEndDate) - this.chartState.xScale(medStartDate);
      })
      .attr("height", 10)
      .attr("stroke", "none")
      .attr("fill", "#607D8B");


    var rectText = rectangles.append("text")
      .text(d => d.medicationOrders.medication.name)
      .attr("x", d => {
        let medStartDate = this.getDateObject(d.medicationOrders.date.medStart);
        let medEndDate = this.getEndDate(d.medicationOrders.date.medEnded);
        let width = this.chartState.xScale(medEndDate) - this.chartState.xScale(medStartDate);
        let pos = this.chartState.xScale(medStartDate);
        return pos;
      })
      .attr("y", function (d: any, i) {
        for (var j = 0; j < groups.length; j++) {
          if (d.medicationOrders.medication.id == groups[j]) {
            return j * 30 + 50;
          }
        }
      })
      .attr("font-size", 11)
      .attr("text-anchor", "start")
      .attr("text-height", 40)
      .attr("fill", "black");
  }
}
