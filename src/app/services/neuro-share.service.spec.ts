import { TestBed, inject } from '@angular/core/testing';

import { NeuroShareService } from './neuro-share.service';

describe('NeuroShareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NeuroShareService]
    });
  });

  it('should be created', inject([NeuroShareService], (service: NeuroShareService) => {
    expect(service).toBeTruthy();
  }));
});
