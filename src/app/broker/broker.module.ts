import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpModule} from '@angular/http';
import {BrokerService} from './broker.service';
@NgModule({
  imports: [
    CommonModule,HttpModule
  ],
  declarations: [],
  providers:[BrokerService]//,
  // exports:[BrokerService]
})
export class BrokerModule { }
