import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { HireProcessEditComponent } from './hire-process-edit.component';

describe('ProcessEditComponent', () => {
  let component: HireProcessEditComponent;
  let fixture: ComponentFixture<HireProcessEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireProcessEditComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule.forRoot([]) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireProcessEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create "ProcessEditComponent"', () => {
    expect(component).toBeTruthy();
  });

  describe('when user select options', () => {
    it('should navigate to process page', inject([Router], (mockRouter: Router) => {
      fixture.detectChanges();
      const spy = spyOn(mockRouter, 'navigate').and.stub();
      component.goProcess({id: 1});
      expect(spy.calls.first().args[0]).toEqual(['job/:id/process', {id: 1}]);
    }));
  });

});
