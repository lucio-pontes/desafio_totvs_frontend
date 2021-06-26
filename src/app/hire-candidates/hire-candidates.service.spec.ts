import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

import { HireCandidatesService } from './hire-candidates.service';

describe('HireCandidatesService', () => {
  let service: HireCandidatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule, RouterModule.forRoot([])]
    });
    service = TestBed.inject(HireCandidatesService);
  });

  it('should be created "HireCandidatesService"', () => {
    expect(service).toBeTruthy();
  });

  describe('test functions "CandidatesService"', () => {

    it('should be return from CandidatesService.getCandidates', () => {
      service.getCandidates().subscribe( s => {
        expect(s).toBeDefined();
      });
    });

    it('should be return from CandidatesService.getCandidate', () => {
      service.getCandidate(1).subscribe( s => {
        expect(s).toBeDefined();
      });
    });

  });

});
