import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HireCurriculumService } from './hire-curriculum.service';

describe('HireCurriculumService', () => {
  let service: HireCurriculumService;

  beforeEach(() => {
    TestBed.configureTestingModule( {
      imports: [ (HttpClientModule) ]
    });
    service = TestBed.inject(HireCurriculumService);
  });

  it('should be created "HireCurriculumService"', () => {
    expect(service).toBeTruthy();
  });
});
