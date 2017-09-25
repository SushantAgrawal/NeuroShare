import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import { NeuroGraphModule } from './neuro-graph/neuro-graph.module';
// import {NeuroGraphModule} from '@sutterhealth/neuro-graph';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, BrowserAnimationsModule, NeuroGraphModule, SharedModule, HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}