import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HireJobsService } from './hire-jobs.service';

describe('HireJobsService', () => {
  let service: HireJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule( {
      imports: [ (HttpClientModule) ]
    });
    service = TestBed.inject(HireJobsService);
  });

  it('should be created "HireJobsService"', () => {
    expect(service).toBeTruthy();
  });
});
