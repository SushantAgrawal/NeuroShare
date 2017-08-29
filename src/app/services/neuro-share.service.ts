import {Injectable} from '@angular/core';

@Injectable()
export class NeuroShareService {
  global : any
  constructor() {}
  get(id) {
    return (global[id]);
  }

  set(id, value) {
    global[id] = value;
  }
}
