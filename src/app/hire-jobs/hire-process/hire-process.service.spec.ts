import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HireProcessService } from './hire-process.service';

describe('HireProcessService', () => {
  let service: HireProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule( {
      imports: [ (HttpClientModule) ]
    });
    service = TestBed.inject(HireProcessService);
  });

  it('should be created "HireProcessService"', () => {
    expect(service).toBeTruthy();
  });
});
