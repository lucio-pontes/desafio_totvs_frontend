import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HireCandidatesComponent } from './hire-candidates/hire-candidates.component';
import { HireJobsComponent } from './hire-jobs/hire-jobs.component';
import { HireProcessComponent } from './hire-jobs/hire-process/hire-process.component';
import { HttpClientModule } from '@angular/common/http';
import { HireCandidateEditComponent } from './hire-candidates/hire-candidate-edit/hire-candidate-edit.component';
import { FormsModule } from '@angular/forms';
import { HireJobEditComponent } from './hire-jobs/hire-job-edit/hire-job-edit.component';
import { HireProcessEditComponent } from './hire-jobs/hire-process/hire-process-edit/hire-process-edit.component';
import { HireCurriculumEditComponent } from './hire-candidates/hire-curriculum-edit/hire-curriculum-edit.component';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HireCandidatesComponent,
    HireCandidateEditComponent,
    HireJobsComponent,
    HireProcessComponent,
    HireJobEditComponent,
    HireProcessEditComponent,
    HireCurriculumEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PoModule,
    RouterModule.forRoot([]),
    FormsModule
    //ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
