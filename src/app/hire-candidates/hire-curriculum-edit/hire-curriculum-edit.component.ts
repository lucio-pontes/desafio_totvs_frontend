import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoModalAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { throwError } from 'rxjs';
import { HireCurriculumPostingModel } from 'src/app/models/hire-curriculum-posting';
import { HireCandidatesService } from '../hire-candidates.service';
import { HireCurriculumService } from './hire-curriculum.service';

@Component({
  selector: 'app-hire-curriculum-edit',
  templateUrl: './hire-curriculum-edit.component.html',
  styleUrls: ['./hire-curriculum-edit.component.css']
})
export class HireCurriculumEditComponent implements OnInit {
  hireCurriculum: HireCurriculumPostingModel;
  maxlength: number = 1024;
  hireCandidateName: string;

  confirm: PoModalAction = {
    action: () => {
      this.save();
    },
    label: 'Confirmar'
  };

  close: PoModalAction = {
    action: () => {
      this.closeConfirmation();
    },
    label: 'Voltar',
    danger: true
  };

  @ViewChild('reactiveFormData', { static: true }) reactiveFormModal: PoModalComponent;
  @ViewChild('optionsForm', { static: true }) form: NgForm;
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private hireCurriculumService: HireCurriculumService,
    private hireCandidateService: HireCandidatesService,
    private poNotification: PoNotificationService) { }

  ngOnInit(): void {
    this.hireCurriculum = {id: undefined, hireCandidateId: 0, worksHistory: "", academicsHistory: "", courses: "", summary: ""};
    this.hireCandidateName = "";

    this.activatedRoute.params.subscribe( p => {
      this.hireCurriculum.hireCandidateId = p?.id;
    });

    this.hireCandidateService.getCandidate(this.hireCurriculum.hireCandidateId)
    .subscribe (r => {
      this.hireCandidateName = r.name;
    }, error => {
      return throwError({error});
    });

    this.hireCandidateService.getCurriculum(this.hireCurriculum.hireCandidateId)
    .subscribe (r => {
      this.hireCurriculum = r.name;
    }, error => {
      return throwError({error});
    });

  }

  openConfirmation() {
    this.poModal.open();
  }

  save() {
    this.hireCurriculumService.postOrPutCurriculum(this.hireCurriculum)
      .subscribe (r => {
        this.goCandidates();
      }, error => {
        return throwError({error});
      });
  }

  goCandidates() {
    this.router.navigate(['candidates']);
  }

  closeConfirmation() {
    this.poModal.close();
  }

}
