//Angular
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
//UI Frameworks
// import {PopoverModule} from 'ngx-bootstrap/popover';
// import {ModalModule} from 'ngx-bootstrap/modal';
import {MdButtonModule, MdCheckboxModule, MdSelectModule, MdInputModule, MdDialogModule,MdTooltipModule} from '@angular/material';
//Custom Components, Services etc
import {GraphPanelComponent} from './graph-panel/graph-panel.component';
import {NeuroRelatedComponent} from './neuro-related/neuro-related.component';
import {PatientConcernsComponent} from './patient-concerns/patient-concerns.component';
import {NeuroGraphBoxComponent} from './neuro-graph-box/neuro-graph-box.component';
import {BrokerModule} from "./broker/broker.module";
import {NeuroGraphService} from './neuro-graph.service';
import {MedicationsComponent} from './graph-panel/medications/medications.component';
import {CdsComponent} from './cds/cds.component';
import {SharedGridComponent} from './graph-panel/shared-grid/shared-grid.component';
import {EdssComponent} from './graph-panel/edss/edss.component';
import {RelapsesComponent} from './graph-panel/relapses/relapses.component';
import {EdssPopupComponent} from './neuro-related/edss-popup/edss-popup.component';
import { InfoPopupComponent } from './cds/info-popup/info-popup.component';

export * from './graph-panel/graph-panel.component';
export * from './cds/cds.component';
export * from './neuro-graph-box/neuro-graph-box.component';
export * from './neuro-related/neuro-related.component';

export const ROUTES : Routes = [];
@NgModule({
  imports: [
    BrokerModule.forRoot(),
    CommonModule
    , FormsModule
    , RouterModule.forRoot(ROUTES),
    // PopoverModule.forRoot(),
    // ModalModule.forRoot(),
    MdButtonModule, 
    MdCheckboxModule, 
    MdSelectModule, 
    MdInputModule, 
    MdDialogModule,
    MdTooltipModule
  ],
  declarations: [
    GraphPanelComponent,
    NeuroRelatedComponent,
    PatientConcernsComponent,
    NeuroGraphBoxComponent,

    MedicationsComponent,
    CdsComponent,
    EdssComponent,
    SharedGridComponent,
    RelapsesComponent,
    EdssPopupComponent,
    InfoPopupComponent
  ],
  exports: [NeuroGraphBoxComponent],
  providers: [NeuroGraphService],
  bootstrap: [EdssPopupComponent, InfoPopupComponent]
})
export class NeuroGraphModule {}