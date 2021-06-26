import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { HireCurriculumEditComponent } from './hire-curriculum-edit.component';

describe('HireCurriculumEditComponent', () => {
  let component: HireCurriculumEditComponent;
  let fixture: ComponentFixture<HireCurriculumEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireCurriculumEditComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule.forRoot([]) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireCurriculumEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create "CurriculumEditComponent"', () => {
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
