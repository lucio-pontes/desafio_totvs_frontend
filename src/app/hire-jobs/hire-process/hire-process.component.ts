import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoInfoOrientation, PoModalAction, PoModalComponent, PoNotificationService, PoPageAction, PoPageListComponent, PoSelectOption, PoTableColumn, PoTableRowTemplateArrowDirection } from '@po-ui/ng-components';
import { throwError } from 'rxjs';
import { HireProcessModel } from 'src/app/models/hire-process.model';
import { HireJobsService } from '../hire-jobs.service';
import { HireProcessService } from './hire-process.service';

@Component({
  selector: 'app-process',
  templateUrl: './hire-process.component.html',
  styleUrls: ['./hire-process.component.css']
})
export class HireProcessComponent implements OnInit {
  disclaimerGroup: any;
  hiringProcess: Array<any>;
  hiringProcessColumns: Array<PoTableColumn>;
  hiringProcessFiltered: Array<object>;
  hireJobId: number;
  hireJobDescription: string;
  orientation: PoInfoOrientation = PoInfoOrientation.Vertical;
  tableRowArrowDirection: PoTableRowTemplateArrowDirection.Right;

  readonly statusOptions: Array<PoSelectOption> = [
    { label: 'Ativa', value: 'Active' },
    { label: 'Reprovada', value: 'Canceled' },
    { label: 'Aprovada', value: 'Process' }
  ];

  readonly pageActions: Array<PoPageAction> = [
    {
      label: 'Nova Candidatura',
      action: this.newProcess.bind(this),
      icon: 'po-icon-plus'
    }
  ];

  @ViewChild('poPageList', { static: true }) poPageList: PoPageListComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private hireProcessService: HireProcessService,
    private hireJobsService: HireJobsService) { };

  ngOnInit(): void {
    this.hiringProcessColumns = this.hireProcessService.getPoTableColumns();

    this.activatedRoute.params.subscribe( p => {
      this.hireJobId = p?.id;
    });
    this.getHireJob(this.hireJobId);
    this.getHireProcess(this.hireJobId);
  }

  getHireJob(hireJobId: number) {
    this.hireJobsService.getJob(hireJobId)
      .subscribe (r => {
        this.hireJobDescription = r.description;
    }, error => {
      return throwError({error});
    });
  }

  getHireProcess(hireJobId: number) {
    this.hireJobsService.getProcess(hireJobId)
      .subscribe (r => {
        this.hiringProcess = r;
        this.hiringProcessFiltered = [...this.hiringProcess];
    }, error => {
      return throwError({error});
    });
  }

  editProcess(id: number) {
    this.router.navigate(['job/:id/process/:id2', {id: this.hireJobId, id2: id}]);
  }

  newProcess() {
    this.router.navigate(['job/:id/process/:id2', {id: this.hireJobId, id2: 0}]);
  }

}
