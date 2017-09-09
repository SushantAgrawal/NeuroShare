import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule,Routes} from '@angular/router';
import {GraphPanelComponent} from './graph-panel/graph-panel.component';
import {NeuroRelatedComponent} from './neuro-related/neuro-related.component';
import {PatientConcernsComponent} from './patient-concerns/patient-concerns.component';
import {NeuroGraphBoxComponent} from './neuro-graph-box/neuro-graph-box.component';
import {BrokerService} from '../fire-base/broker.service';
import {NeuroGraphService} from './neuro-graph.service';
import { MedicationsComponent } from './graph-panel/medications/medications.component';
import { CdsComponent } from './cds/cds.component';
export const ROUTES: Routes = [];
@NgModule({
  imports: [CommonModule,FormsModule,/*BrowserModule,*/ RouterModule.forRoot(ROUTES)],
  declarations: [
    GraphPanelComponent, NeuroRelatedComponent, 
    /*NeuroRelatedCareComponent,*/ PatientConcernsComponent, NeuroGraphBoxComponent, MedicationsComponent, CdsComponent
  ],
  exports: [NeuroGraphBoxComponent],
  providers: [BrokerService, NeuroGraphService]
})
export class NeuroGraphModule {}