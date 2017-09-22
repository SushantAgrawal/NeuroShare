import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class InfoPopupComponent implements OnInit {

  displayInfo: any;
  x: any;
  y: any;

  constructor(public dialogRef: MdDialogRef<InfoPopupComponent>,@Inject(MD_DIALOG_DATA) public data: any) 
  { 
    this.displayInfo = data.info;
    this.x = data.x - 315;
    this.y = data.y;
  }

  ngOnInit() {
    let topMargin = this.y + 'px';
    let leftMargin = this.x + 'px';
    this.dialogRef.updatePosition({ top: topMargin, left: leftMargin });
  }

}
