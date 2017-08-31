import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Panels and Controls
import { GraphPanelComponent } from './graph-panel/graph-panel.component';
import { NeuroRelatedComponent } from './neuro-related/neuro-related.component';
import { NeuroRelatedCareComponent } from './neuro-related-care/neuro-related-care.component';
import { PatientConcernsComponent } from './patient-concerns/patient-concerns.component';

//Graph components
import { RootGraphContainerComponent } from './graph-panel/root-graph-container/root-graph-container.component';
import { GanttChartContainerComponent } from './graph-panel/gantt-chart-container/gantt-chart-container.component';
import { DmtChartComponent } from './graph-panel/dmt-chart/dmt-chart.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GraphPanelComponent,
    NeuroRelatedComponent,
    NeuroRelatedCareComponent,
    PatientConcernsComponent,
    RootGraphContainerComponent,
    GanttChartContainerComponent,
    DmtChartComponent
  ],
  exports: [
    GraphPanelComponent,
    NeuroRelatedComponent,
    NeuroRelatedCareComponent,
    PatientConcernsComponent,
    RootGraphContainerComponent,
    GanttChartContainerComponent,
    DmtChartComponent
  ]
})
export class NeuroGraphModule { }