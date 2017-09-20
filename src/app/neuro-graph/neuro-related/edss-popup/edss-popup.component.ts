import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import {edssPopup} from '../../neuro-graph.config'

@Component({
  selector: 'app-edss-popup',
  templateUrl: './edss-popup.component.html',
  styleUrls: ['./edss-popup.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class EdssPopupComponent implements OnInit {

  edssPopupQuestions: any = [] ;
  type: any;
  score: any;

  constructor(public dialogRef: MdDialogRef<EdssPopupComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) {
    this.type = data.type;
    this.score = data.score;
    this.edssPopupQuestions = edssPopup;
    this.edssPopupQuestions.map(x=>x.checked = false);
    if(this.score!='')
    {
      this.edssPopupQuestions.forEach(x => { if (x.score==this.score)x.checked =true});
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
  
  submit()
  {
    var selectedValue = this.edssPopupQuestions.find(x=>x.checked == true);
    if(this.type == 'Add')
      {
        //Call Add API
      }
    else
      {
        //Call Update API
      }
    this.dialogRef.close();
  }

}
