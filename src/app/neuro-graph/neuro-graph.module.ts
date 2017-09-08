import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {GraphPanelComponent} from './graph-panel/graph-panel.component';
import {NeuroRelatedComponent} from './neuro-related/neuro-related.component';
// import {NeuroRelatedCareComponent} from './neuro-related-care/neuro-related-care.component';
import {PatientConcernsComponent} from './patient-concerns/patient-concerns.component';
import {NeuroGraphBoxComponent} from './neuro-graph-box/neuro-graph-box.component';
import {BrokerService} from '../fire-base/broker.service';
import {NeuroGraphService} from './neuro-graph.service';
import { MedicationsComponent } from './graph-panel/medications/medications.component';
import { CdsComponent } from './cds/cds.component';
@NgModule({
  imports: [CommonModule,FormsModule],
  declarations: [
    GraphPanelComponent, NeuroRelatedComponent, 
    /*NeuroRelatedCareComponent,*/ PatientConcernsComponent, NeuroGraphBoxComponent, MedicationsComponent, CdsComponent
  ],
  exports: [NeuroGraphBoxComponent],
  providers: [BrokerService, NeuroGraphService]
})
export class NeuroGraphModule {}