//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
//UI Frameworks
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MdSelectModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
//Custom Components, Services etc
import { GraphPanelComponent } from './graph-panel/graph-panel.component';
import { NeuroRelatedComponent } from './neuro-related/neuro-related.component';
import { PatientConcernsComponent } from './patient-concerns/patient-concerns.component';
import { NeuroGraphBoxComponent } from './neuro-graph-box/neuro-graph-box.component';
import { BrokerService } from '../broker/broker.service';
import { NeuroGraphService } from './neuro-graph.service';
import { MedicationsComponent } from './graph-panel/medications/medications.component';
import { CdsComponent } from './cds/cds.component';
import { SharedGridComponent } from './graph-panel/shared-grid/shared-grid.component';
import { EdssComponent } from './graph-panel/edss/edss.component';

export const ROUTES: Routes = [];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    MdSelectModule,
    MdCheckboxModule
  ],
  declarations: [
    GraphPanelComponent,
    NeuroRelatedComponent,
    PatientConcernsComponent,
    NeuroGraphBoxComponent,
    MedicationsComponent,
    CdsComponent,
    EdssComponent,
    SharedGridComponent
  ],
  exports: [NeuroGraphBoxComponent],
  providers: [BrokerService, NeuroGraphService]
})
export class NeuroGraphModule { }