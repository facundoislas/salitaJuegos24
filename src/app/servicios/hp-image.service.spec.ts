import { TestBed } from '@angular/core/testing';

import { HpImageService } from './hp-image.service';

describe('HpImageService', () => {
  let service: HpImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HpImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
