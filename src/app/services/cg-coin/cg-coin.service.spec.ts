import { TestBed, inject } from '@angular/core/testing';

import { CgcService } from './cg-coin.service';

describe('CgcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CgcService]
    });
  });

  it(
    'should be created',
    inject([CgcService], (service: CgcService) => {
      expect(service).toBeTruthy();
    })
  );
});
