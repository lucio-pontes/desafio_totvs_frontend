import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PoModalComponent } from '@po-ui/ng-components';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { HireJobEditComponent } from './hire-job-edit.component';

describe('JobEditComponent', () => {
  let component: HireJobEditComponent;
  let fixture: ComponentFixture<HireJobEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireJobEditComponent, PoModalComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule.forRoot([]) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireJobEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create "JobEditComponent"', () => {
    expect(component).toBeTruthy();
  });

  describe('when user select options', () => {
    it('should navigate to jobs page', inject([Router], (mockRouter: Router) => {
      fixture.detectChanges();
      const spy = spyOn(mockRouter, 'navigate').and.stub();
      component.goJobs();
      expect(spy.calls.first().args[0]).toEqual(['jobs']);
    }));
  });

});
