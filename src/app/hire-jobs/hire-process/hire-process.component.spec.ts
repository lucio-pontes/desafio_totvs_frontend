import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { HireProcessComponent } from './hire-process.component';

describe('HireProcessComponent', () => {
  let component: HireProcessComponent;
  let fixture: ComponentFixture<HireProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireProcessComponent ],
      imports: [
         HttpClientModule,
         AppRoutingModule,
         RouterModule.forRoot([]) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create "ProcessComponent"', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML content', () => {
    it('should po-page-list', () => {
      fixture.detectChanges();
      let el = fixture.debugElement.query(By.css('po-page-list'));
      expect(el).toBeTruthy();
    });
  });

  describe('when user select options', () => {
    it('should navigate to edit process page', inject([Router], (mockRouter: Router) => {
      fixture.detectChanges();
      const spy = spyOn(mockRouter, 'navigate').and.stub();
      component.hireJobId = 1;
      component.editProcess(component.hireJobId);
      expect(spy.calls.first().args[0]).toEqual(['job/:id/process/:id2', {id: component.hireJobId, id2: component.hireJobId}]);
    }));

    it('should navigate to insert new process page', inject([Router], (mockRouter: Router) => {
      fixture.detectChanges();
      const spy = spyOn(mockRouter, 'navigate').and.stub();
      component.hireJobId = 2;
      component.newProcess();
      expect(spy.calls.first().args[0]).toEqual(['job/:id/process/:id2', {id: component.hireJobId, id2: 0}]);
    }));
  });


});
