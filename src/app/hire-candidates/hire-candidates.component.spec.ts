import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

import { HireCandidatesComponent } from './hire-candidates.component';

describe('HireCandidatesComponent', () => {
  let component: HireCandidatesComponent;
  let fixture: ComponentFixture<HireCandidatesComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireCandidatesComponent ],
      imports: [
         HttpClientModule,
         AppRoutingModule,
         RouterModule.forRoot([]) ],
      providers: [ { provide: Router, useValue: routerSpy } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create "CandidatesComponent"', () => {
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
      it('should navigate to alter or insert candidate page', () => {
        fixture.detectChanges();
        component.newCandidate();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['candidate']);
      });

      it('should navigate to alter curriculum page', () => {
        fixture.detectChanges();
        component.newCandidate();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['candidate']);
      });
  });

});
