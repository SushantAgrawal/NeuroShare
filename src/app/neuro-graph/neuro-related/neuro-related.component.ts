import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BrokerService } from '../broker/broker.service';
// import { BrokerService } from '../../broker/broker.module';
// import {BrokerService} from 'broker';
import { allMessages, allHttpMessages, manyHttpMessages } from '../neuro-graph.config';
import { MdDialog } from '@angular/material';
import { RelapsesComponent } from '../graph-panel/relapses/relapses.component';


@Component({
  selector: 'app-neuro-related',
  templateUrl: './neuro-related.component.html',
  styleUrls: ['./neuro-related.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NeuroRelatedComponent implements OnInit {
  display: Boolean = false;
  constructor(private brokerService: BrokerService, public dialog: MdDialog) { }

  ngOnInit() {
    console.log('neuro-related ngOnInit');
    // this
    //   .brokerService
    //   .filterOn(manyHttpMessages.httpGetTestMany)
    //   .subscribe(d => {
    //     console.log(d);
    //   })
  }

  changed(e, value) {
    this
      .brokerService
      .emit(allMessages.neuroRelated, {
        artifact: value,
        checked: e.checked
      });
  }

  testMany() {
    this
      .brokerService
      .httpGetMany(manyHttpMessages.httpGetTestMany, [
        {
          urlId: allHttpMessages.httpGetEdss
        }, {
          urlId: allHttpMessages.httpGetMedications
        }
      ]);
  }

  // openDialog(): void {
  //   let dialogRef = this.dialog.open(EdssPopupComponent, {
  //     width: '583px',
  //     height: '662px',
  //     data: { type: "Add", score: '' }
  //   });
  // }

  openDialog(type) {
    switch (type) {
      case 'relapses':
        this.brokerService.emit(allMessages.invokeAddRelapses);
        break;
      case 'edss':
        this.brokerService.emit(allMessages.invokeAddEdss);
        break;
      default:

    }
  }
}
