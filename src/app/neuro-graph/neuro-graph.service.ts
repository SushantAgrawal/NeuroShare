import { Injectable } from '@angular/core';
import { urlMaps } from './neuro-graph.config';
import { envs } from '../app.config';
@Injectable()
export class NeuroGraphService {
  global: any
  constructor() {
    let baseUrl = envs[envs.selectedEnv];
    this.set('baseUrl', baseUrl);
    Object
      .keys(urlMaps)
      .map(key => urlMaps[key] = baseUrl.concat('/', urlMaps[key]));
    this.set('urlMaps', urlMaps);
  }

  get(id) {
    return (global[id]);
  }

  set(id, value) {
    global[id] = value;
  }

}
