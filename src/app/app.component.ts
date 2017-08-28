import {Component} from '@angular/core';
import {settings} from './app.config';
import {BrokerService} from './fire-base/broker.service';
@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.sass']})
export class AppComponent {
  title = 'app';
  constructor(private brokerService : BrokerService) {
    let baseUrl = settings.baseUrl;
    let urlMaps : {} = settings.urlMaps;
    Object
      .keys(urlMaps)
      .map(key => urlMaps[key] = baseUrl.concat('/', urlMaps[key]));
    brokerService.init(urlMaps);
  }
}
