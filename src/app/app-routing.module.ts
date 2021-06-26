import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HireCandidateEditComponent } from './hire-candidates/hire-candidate-edit/hire-candidate-edit.component';
import { HireCandidatesComponent } from './hire-candidates/hire-candidates.component';
import { HomeComponent } from './home/home.component';
import { HireProcessComponent } from './hire-jobs/hire-process/hire-process.component';
import { HireJobsComponent } from './hire-jobs/hire-jobs.component';
import { HireJobEditComponent } from './hire-jobs/hire-job-edit/hire-job-edit.component';
import { HireCurriculumEditComponent } from './hire-candidates/hire-curriculum-edit/hire-curriculum-edit.component';
import { HireProcessEditComponent } from './hire-jobs/hire-process/hire-process-edit/hire-process-edit.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'candidates', component: HireCandidatesComponent},
  {path: 'candidate', component: HireCandidateEditComponent},
  {path: 'candidate/:id', component: HireCandidateEditComponent},
  {path: 'candidate/:id/curriculum', component: HireCurriculumEditComponent},
  {path: 'jobs', component: HireJobsComponent},
  {path: 'job', component: HireJobEditComponent},
  {path: 'job/:id', component: HireJobEditComponent},
  {path: 'job/:id/process', component: HireProcessComponent},
  {path: 'job/:id/process/:id2', component: HireProcessEditComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
