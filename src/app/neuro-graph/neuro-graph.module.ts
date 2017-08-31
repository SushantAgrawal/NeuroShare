import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphPanelComponent} from './graph-panel/graph-panel.component';
import {NeuroRelatedComponent} from './neuro-related/neuro-related.component';
import {NeuroRelatedCareComponent} from './neuro-related-care/neuro-related-care.component';
import {PatientConcernsComponent} from './patient-concerns/patient-concerns.component';
import {NeuroGraphBoxComponent} from './neuro-graph-box/neuro-graph-box.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GraphPanelComponent, NeuroRelatedComponent, NeuroRelatedCareComponent, PatientConcernsComponent, NeuroGraphBoxComponent
  ],
  exports: [NeuroGraphBoxComponent]
})
export class NeuroGraphModule {}