import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-patient-concerns',
  templateUrl: './patient-concerns.component.html',
  styleUrls: ['./patient-concerns.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class PatientConcernsComponent implements OnInit {

  constructor() { }

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];


  ngOnInit() {
  }

}
