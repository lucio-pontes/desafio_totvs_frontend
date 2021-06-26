import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { PoMenuModule, PoPageModule, PoToolbarModule } from '@po-ui/ng-components';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach( async () => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        PoMenuModule,
        PoPageModule,
        PoToolbarModule,
        RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('validate options menu', () => {
    it('should exists option link equal "home"', () => {
      fixture.detectChanges();
      const el = component.menus.find( f => f.link === 'home');
      expect(el).toBeTruthy;
    });

    it('should exists option link equal "candidates"', () => {
      fixture.detectChanges();
      expect(component.menus.find( f => f.link === 'candidates')).toBeTruthy;
    });

    it('should exists option link equal "candidates"', () => {
      fixture.detectChanges();
      const el = component.menus.find( f => f.link === 'candidates');
      expect(el).toBeDefined();
    });

  });

  describe('when user select options menu', () => {

    it('should navigate to home page', inject([Router], (mockRouter: Router) => {
      fixture.detectChanges();
      const spy = spyOn(mockRouter, 'navigate').and.stub();
      component.onHome(component.menus[0]);
      expect(spy.calls.first().args[0]).toContain('/home');
    }));

    it('should navigate to candidates page', inject([Router], (mockRouter: Router) => {
      fixture.detectChanges();
      const spy = spyOn(mockRouter, 'navigate').and.stub();
      component.onCandidates(component.menus[1]);
      expect(spy.calls.first().args[0]).toContain('/candidates');
    }));

    it('should navigate to jobs page', inject([Router], (mockRouter: Router) => {
      fixture.detectChanges();
      const spy = spyOn(mockRouter, 'navigate').and.stub();
      component.onJobs(component.menus[2]);
      expect(spy.calls.first().args[0]).toContain('/jobs');
    }));

  });

});