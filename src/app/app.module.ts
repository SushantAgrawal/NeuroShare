import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NeuroGraphModule} from './neuro-graph/neuro-graph.module';
import {SharedModule} from './shared/shared.module';
import {BrokerService} from './fire-base/broker.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, NeuroGraphModule, SharedModule
  ],
  providers: [BrokerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
