import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BrokerService} from '../../broker/broker.service';
import {allMessages, allHttpMessages, manyHttpMessages} from '../neuro-graph.config';
import {MdDialog} from '@angular/material';
import {EdssPopupComponent} from './edss-popup/edss-popup.component';

@Component({
  selector: 'app-neuro-related',
  templateUrl: './neuro-related.component.html',
  styleUrls: ['./neuro-related.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NeuroRelatedComponent implements OnInit {
  display : Boolean = false;
  constructor(private brokerService : BrokerService, public dialog: MdDialog) {}

  ngOnInit() {
    console.log('neuro-related ngOnInit');
    this
      .brokerService
      .filterOn(manyHttpMessages.httpGetTestMany)
      .subscribe(d => {
        console.log(d);
      })
  }

  changed(e, value) {
    this
      .brokerService
      .emit(allMessages.neuroRelated, {
        artifact: value,
        checked: e.target.checked
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

  openDialog(): void {
    let dialogRef = this.dialog.open(EdssPopupComponent, {
      width: '583px',
      height: '662px',
      data: { type:"Add", score:'' }
    });
  }
}
