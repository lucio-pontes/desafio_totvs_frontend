import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AppResourcesService } from './app-resources.service';

describe('AppResourcesService', () => {
  let service: AppResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(AppResourcesService);
  });

  it('should be created "AppResourcesService"', () => {
    expect(service).toBeTruthy();
  });
});
