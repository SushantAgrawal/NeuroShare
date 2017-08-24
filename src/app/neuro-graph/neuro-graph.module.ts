import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphPanelComponent } from './graph-panel/graph-panel.component';
import { NeuroRelatedComponent } from './neuro-related/neuro-related.component';
import { NeuroRelatedCareComponent } from './neuro-related-care/neuro-related-care.component';
import { PatientConcernsComponent } from './patient-concerns/patient-concerns.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GraphPanelComponent, NeuroRelatedComponent, NeuroRelatedCareComponent, PatientConcernsComponent],
  exports : [GraphPanelComponent, NeuroRelatedComponent, NeuroRelatedCareComponent, PatientConcernsComponent]
})
export class NeuroGraphModule { }
