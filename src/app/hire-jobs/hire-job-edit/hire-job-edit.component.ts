import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoModalAction, PoModalComponent, PoNotificationService, PoRadioGroupOption } from '@po-ui/ng-components';
import { throwError } from 'rxjs';
import { HireJobModel } from 'src/app/models/hire-job.model';
import { HireJobsService } from '../hire-jobs.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './hire-job-edit.component.html',
  styleUrls: ['./hire-job-edit.component.css']
})
export class HireJobEditComponent implements OnInit {
  hireJob: HireJobModel;

  readonly optionsStatus: Array<PoRadioGroupOption> = [
    { label: 'Ativo', value: 'Active' },
    { label: 'Cancelado', value: 'Canceled' },
    { label: 'Finalizada', value: 'Finish' }
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
    private hireJobsService: HireJobsService,
    private poNotification: PoNotificationService) { }

  ngOnInit(): void {
    this.hireJob = {id: undefined, description: "", status: "Active"};

    this.activatedRoute.params.subscribe( p => {
      this.hireJob.id = p?.id;
    });

    if (this.hireJob?.id) {
      this.hireJobsService.getJob(this.hireJob.id)
      .subscribe (r => {
        this.hireJob = r;
      }, error => {
        return throwError({error});
      });
    } else {
      this.hireJob = {id: undefined, description: "", status: "Active"};
    }
  }

  openConfirmation() {
    this.poModal.open();
  }

  save() {
    this.hireJobsService.postOrPutJob(this.hireJob)
      .subscribe (r => {
        this.goJobs();
      }, error => {
        return throwError({error});
      });
  }

  goJobs() {
    this.router.navigate(['jobs']);
  }

  closeConfirmation() {
    this.poModal.close();
  }

}
