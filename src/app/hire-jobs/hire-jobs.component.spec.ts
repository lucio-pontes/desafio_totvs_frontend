import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

import { HireJobsComponent } from './hire-jobs.component';

describe('HireJobsComponent', () => {
  let component: HireJobsComponent;
  let fixture: ComponentFixture<HireJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireJobsComponent ],
      imports: [
         HttpClientModule,
         AppRoutingModule,
         RouterModule.forRoot([]) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create "JobsComponent"', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML content', () => {
    it('should po-page-list', () => {
      fixture.detectChanges();
      let el = fixture.debugElement.query(By.css('po-page-list'));
      expect(el).toBeTruthy();
    });
  })

  describe('when user select options', () => {

    it('should navigate to edit job page', inject([Router], (mockRouter: Router) => {
      fixture.detectChanges();
      const spy = spyOn(mockRouter, 'navigate').and.stub();
      component.editJob(1);
      expect(spy.calls.first().args[0]).toEqual(['job', 1]);
    }));

    it('should navigate to insert job page', inject([Router], (mockRouter: Router) => {
      fixture.detectChanges();
      const spy = spyOn(mockRouter, 'navigate').and.stub();
      component.newJob();
      expect(spy.calls.first().args[0]).toEqual(['job']);
    }));

    /*
    it('should navigate to edit job page', () => {
      fixture.detectChanges();
      component.editJob(1);
      expect(routerSpy.navigate).toHaveBeenCalledWith([ 'job', 1]);
    });

    it('should navigate to insert job page', () => {
      fixture.detectChanges();
      component.newJob();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['job']);
    });

    it('should navigate to view process page', () => {
      fixture.detectChanges();
      component.viewProcess(1);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['job/:id/process', {id: 1}]);
    });*/
});

});
