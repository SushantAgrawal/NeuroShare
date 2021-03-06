//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
//UI Frameworks
import { MdButtonModule,MdMenuModule, MdCheckboxModule, MdSelectModule, MdInputModule, MdDialogModule, MdTooltipModule, MdGridListModule} from '@angular/material';
//Custom Components, Services etc
import { GraphPanelComponent } from './graph-panel/graph-panel.component';
import { NeuroRelatedComponent } from './neuro-related/neuro-related.component';
import { PatientConcernsComponent } from './patient-concerns/patient-concerns.component';
import { NeuroGraphBoxComponent } from './neuro-graph-box/neuro-graph-box.component';
import { BrokerModule } from "./broker/broker.module";
import { NeuroGraphService } from './neuro-graph.service';
import { MedicationsComponent } from './graph-panel/medications/medications.component';
import { CdsComponent } from './cds/cds.component';
import { SharedGridComponent } from './graph-panel/shared-grid/shared-grid.component';
import { EdssComponent } from './graph-panel/edss/edss.component';
import { RelapsesComponent } from './graph-panel/relapses/relapses.component';
import { InfoPopupComponent } from './cds/info-popup/info-popup.component';
import { ImagingComponent } from './graph-panel/imaging/imaging.component';
import { LabsComponent } from './graph-panel/labs/labs.component';

export * from './graph-panel/graph-panel.component';
export * from './cds/cds.component';
export * from './neuro-graph-box/neuro-graph-box.component';
export * from './neuro-related/neuro-related.component';

export const ROUTES: Routes = [];
@NgModule({
  imports: [
    BrokerModule.forRoot(),
    CommonModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    MdButtonModule,
    MdMenuModule,
    MdCheckboxModule,
    MdSelectModule,
    MdInputModule,
    MdDialogModule,
    MdTooltipModule,
    MdGridListModule
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
    InfoPopupComponent,
    ImagingComponent,
    LabsComponent
  ],
  exports: [
    NeuroGraphBoxComponent,
    CdsComponent,
    GraphPanelComponent,
    NeuroRelatedComponent,
    PatientConcernsComponent
  ],
  providers: [NeuroGraphService],
  bootstrap: [InfoPopupComponent]
})
export class NeuroGraphModule { }