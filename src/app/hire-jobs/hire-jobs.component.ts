import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoInfoOrientation, PoPageAction, PoPageListComponent, PoSelectOption, PoTableColumn, PoTableRowTemplateArrowDirection } from '@po-ui/ng-components';
import { throwError } from 'rxjs';
import { HireJobsService } from './hire-jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './hire-jobs.component.html',
  styleUrls: ['./hire-jobs.component.css']
})
export class HireJobsComponent implements OnInit {
  disclaimerGroup: any;
  hiringJobs: Array<any>;
  hiringJobsColumns: Array<PoTableColumn>;
  hiringJobsFiltered: Array<object>;
  orientation: PoInfoOrientation = PoInfoOrientation.Vertical;
  tableRowArrowDirection: PoTableRowTemplateArrowDirection.Right;

  readonly statusOptions: Array<PoSelectOption> = [
    { label: 'Ativa', value: 'Active' },
    { label: 'Cancelada', value: 'Canceled' },
    { label: 'Concluida', value: 'Finish' }
  ];

  readonly pageActions: Array<PoPageAction> = [
    {
      label: 'Abrir Nova Vaga',
      action: this.newJob.bind(this),
      icon: 'po-icon-plus'
    }
  ];

  @ViewChild('poPageList', { static: true }) poPageList: PoPageListComponent;

  constructor(
    private router: Router,
    private hireJobsService: HireJobsService) { }

  ngOnInit(): void {
    this.hiringJobsColumns = this.hireJobsService.getPoTableColumns();
    this.getJobs();
  }

  getJobs() {
    this.hireJobsService.getJobs()
      .subscribe (r => {
        this.hiringJobs = r;
        this.hiringJobsFiltered = [...this.hiringJobs];
    }, error => {
      return throwError({error});
    });
  }

  editJob(id: number) {
    this.router.navigate(['job', id]);
  }

  newJob() {
    this.router.navigate(['job']);
  }

  viewProcess(id: number) {
    this.router.navigate(['job/:id/process', {id: id}]);
  }

}
