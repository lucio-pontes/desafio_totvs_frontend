import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';

import { HireCandidateEditComponent } from './hire-candidate-edit.component';

describe('HireCandidateEditComponent', () => {
  let component: HireCandidateEditComponent;
  let fixture: ComponentFixture<HireCandidateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireCandidateEditComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule.forRoot([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireCandidateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create "CandidateEditComponent"', () => {
    expect(component).toBeTruthy();
  });

  describe('when user select options', () => {
    it('should navigate to candidates page', inject([Router], (mockRouter: Router) => {
      fixture.detectChanges();
      const spy = spyOn(mockRouter, 'navigate').and.stub();
      component.goCandidates();
      expect(spy.calls.first().args[0]).toContain('candidates');
    }));
  });

});
