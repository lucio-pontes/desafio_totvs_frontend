import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoInfoOrientation, PoModalAction, PoModalComponent, PoNotificationService, PoRadioGroupOption, PoSelectOption } from '@po-ui/ng-components';
import { Subscription, throwError } from 'rxjs';
import { HireCandidatesService } from 'src/app/hire-candidates/hire-candidates.service';
import { HireCandidateModel } from 'src/app/models/hire-candidate.model';
import { HireJobModel } from 'src/app/models/hire-job.model';
import { HireProcessModel } from 'src/app/models/hire-process.model';
import { HireJobsService } from '../../hire-jobs.service';
import { HireProcessService } from '../hire-process.service';

@Component({
  selector: 'app-process-edit',
  templateUrl: './hire-process-edit.component.html',
  styleUrls: ['./hire-process-edit.component.css']
})
export class HireProcessEditComponent implements OnInit {
  hireProcess: HireProcessModel;
  hireJobId: number;
  hireJob: HireJobModel;
  hireCandidateId: number;
  hireCandidate: HireCandidateModel;
  orientation: PoInfoOrientation = PoInfoOrientation.Vertical;
  candidateOptions: Array<PoSelectOption>;
  candidates: Array<HireCandidateModel>;

  private citiesSubscription: Subscription;

  readonly optionsStatus: Array<PoRadioGroupOption> = [
    { label: 'Cancelado', value: 'Canceled' },
    { label: 'Reprovado', value: 'Finish' },
    { label: 'Ativo', value: 'Active' }
  ];

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

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private hireProcessService: HireProcessService,
    private hireJobsService: HireJobsService,
    private hireCandidatesService: HireCandidatesService,
    private poNotification: PoNotificationService) { }

  ngOnInit(): void {
    this.candidateOptions = [];
    this.candidates = [];
    this.hireProcess = {id: undefined, job: "", name: "", phone: "", email: "", status: "Active"};
    this.hireCandidateId = 0;

    this.activatedRoute.params.subscribe( p => {
      this.hireJobId = p?.id;
      this.hireProcess.id = p?.id2;
    });

    this.hireJobsService.getJob(this.hireJobId)
    .subscribe (r => {
      this.hireJob = r;
    }, error => {
      return throwError({error});
    });

    if (this.hireProcess?.id && this.hireProcess?.id != 0) {
      this.hireProcessService.getHireProcess(this.hireProcess.id)
      .subscribe (r => {
        this.hireProcess = r;
      }, error => {
        return throwError({error});
      });
    } else {
      this.hireProcess = {id: undefined, job: "", name: "", phone: "", email: "", status: "Active"};
    }

    this.getCandidates();
  }

  private getCandidates() {
    this.hireCandidatesService.getCandidates().subscribe( c =>
      {
        this.candidates = c;
        this.candidateOptions =
          this.candidates.map( (elem: HireCandidateModel) => {
            return {"label": elem.name, "value": ''+elem.id};
          });
      }, error => {
        throwError({error});
      });
  }
        //return [{Id: 1, Name: "Lucio"},{Id: 2, Name: "Jaque"}];
        //return [{label: "1", value: "Lucio"},{label: "2", value: "Jaque"}];

  openConfirmation() {
    this.poModal.open();
  }

  save() {
    send: HireProcessModel;
    let send = {
      id: this.hireProcess.id,
      hireCandidateId: this.hireCandidate.id,
      hireJobId: this.hireJob.id,
      status: this.hireProcess.status};
    this.hireProcessService.postOrPutHireProcess(send)
      .subscribe (r => {
        this.goProcess({id: this.hireJobId});
      }, error => {
        return throwError({error});
      });
  }

  goProcess(params: any) {
    this.router.navigate(['job/:id/process', params]);
  }

  closeConfirmation() {
    this.poModal.close();
  }

  modifyCandidate(candidateId:number) {
    let elem = this.candidates.find(c => c.id == candidateId);
    if (elem) {
      this.hireCandidate = elem;
    }
  }

}
