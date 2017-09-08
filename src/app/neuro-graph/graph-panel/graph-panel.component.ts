import { Component, OnInit } from '@angular/core';

@Component({ selector: 'app-graph-panel', templateUrl: './graph-panel.component.html', styleUrls: ['./graph-panel.component.sass'] })
export class GraphPanelComponent implements OnInit {  
  isEdssSelected: boolean= false;
  constructor() { }
  ngOnInit() {    
  }
}
