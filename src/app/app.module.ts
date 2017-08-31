import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {NeuroGraphModule} from './neuro-graph/neuro-graph.module';
import {SharedModule} from './shared/shared.module';
// import {BrokerService} from './fire-base/broker.service';
// import {ChartModule} from 'angular2-highcharts';
// import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
// import * as highcharts from 'highcharts';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NeuroGraphModule,
    SharedModule,
    HttpModule
   
    // ChartModule.forRoot(require('highcharts'))    
  ],
  providers: [
    //BrokerService,
    // {
    // provide: HighchartsStatic,
    // useFactory: highchartsFactory
  // }
],
  bootstrap: [AppComponent]
})
export class AppModule {}
// export function highchartsFactory() {
//   return highcharts;
// }