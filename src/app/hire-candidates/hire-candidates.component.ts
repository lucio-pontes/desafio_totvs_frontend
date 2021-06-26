import { Component, OnInit, ViewChild } from '@angular/core';
import { HireCandidatesService } from './hire-candidates.service';
import {
  PoListViewAction,
  PoModalComponent,
  PoNotificationService,
  PoPageAction,
  PoPageFilter,
  PoPageListComponent,
  PoTableColumn,
  PoInfoOrientation,
  PoSelectOption,
  PoTableRowTemplateArrowDirection
} from '@po-ui/ng-components';
import { Observable, throwError } from 'rxjs';
import { HireCandidateModel } from '../models/hire-candidate.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates',
  templateUrl: './hire-candidates.component.html',
  styleUrls: ['./hire-candidates.component.css']
})
export class HireCandidatesComponent implements OnInit {
  disclaimerGroup: any;
  hiringProcesses: Array<any>;
  hiringProcessesColumns: Array<PoTableColumn>;
  hiringProcessesFiltered: Array<object>;
  labelFilter: string = '';
  modalDetail: boolean = false;
  selectedActionItem: HireCandidateModel;
  titleDetailsModal: string = 'Detalhe do Candidato';
  orientation: PoInfoOrientation = PoInfoOrientation.Vertical;
  tableRowArrowDirection: PoTableRowTemplateArrowDirection.Right;

  readonly statusOptions: Array<PoSelectOption> = [
    { label: 'Ativo', value: 'active' },
    { label: 'Cancelado', value: 'canceled' }
  ];

  // see
  readonly actions: Array<PoListViewAction> = [
    {
      label: 'Hire',
      action: this.hireCandidate.bind(this),
      disabled: this.isHiredOrCanceled.bind(this),
      icon: 'po-icon-ok'
    },
    {
      label: 'Cancel',
      action: this.cancelCandidate.bind(this),
      disabled: this.isHiredOrCanceled.bind(this),
      type: 'danger',
      icon: 'po-icon-close'
    }
  ];

  readonly pageActions: Array<PoPageAction> = [
    {
      label: 'Novo Candidato',
      action: this.newCandidate.bind(this),
      //disabled: this.disableHireButton.bind(this),
      icon: 'po-icon-plus'
    }
    //{
    //  label: 'Cancel selected',
    //  action: this.updateCandidates.bind(this, this.cancelCandidate),
    //  disabled: this.disableHireButton.bind(this),
    //  icon: 'po-icon-close'
    //}
  ];

  //readonly filterSettings: PoPageFilter = {
  //  action: this.hiringProcessesFilter.bind(this),
  //  placeholder: 'Search'
  //};
  
  private disclaimers = [];

  @ViewChild('detailsModal', { static: true }) detailsModalElement: PoModalComponent;
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal: PoModalComponent;
  @ViewChild('poPageList', { static: true }) poPageList: PoPageListComponent;

  constructor(
    private router: Router,
    private hireCandidatesService: HireCandidatesService,
    private poNotification: PoNotificationService) { }

  ngOnInit(): void {
    this.hiringProcessesColumns = this.hireCandidatesService.getCandidatesColunas();
    this.getCandidates();
    //this.hiringProcesses = this.hrieCandidatesService.getCandidates();
    //this.hiringProcessesFiltered = [...this.hiringProcesses.subscribe( c => c as HireCandidateModel[])];
  }

  formatTitle(item: HireCandidateModel) {
    return `${item.id} - ${item.name}`;
  }

  showDetail(item: any) {
    return item;
  }

  showDetailModal(item: HireCandidateModel) {
    this.setModalItem(item);
    this.detailsModalElement.open();
  }

  cancelCandidate(selectedCandidate: any) {
    selectedCandidate['hireStatus'] = 'canceled';
    this.poNotification.error('Canceled candidate!');
  }

  private disableHireButton() {
    return !this.hiringProcesses.find(candidate => candidate['$selected']);
  }

  private hireCandidate(selectedCandidate: any) {
    selectedCandidate['hireStatus'] = 'hired';
    this.poNotification.success('Hired candidate!');
  }

  /*private hiringProcessesFilter(labelFilter: string | Array<string>) {
    const filters = typeof labelFilter === 'string' ? [labelFilter] : [...labelFilter];

    this.hiringProcessesFiltered = this.hiringProcesses.filter(item => {
      return Object.keys(item).some(key => !(item[key] instanceof Object) && this.includeFilter(item[key], filters));
    });
  }*/

  private includeFilter(item: any, filters: any) {
    return filters.some( (filter: string) => String(item).toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

  private isHiredOrCanceled(candidate: any): boolean {
    return candidate['hireStatus'] === 'hired' || candidate['hireStatus'] === 'canceled';
  }

  private setModalItem(listItem: HireCandidateModel) {
    this.selectedActionItem = listItem;
    //this.titleDetailsModal = `Get in touch with ${this.selectedActionItem['name']}`;
    this.titleDetailsModal = `Get in touch with ${this.selectedActionItem.name}`;
  }

  private updateCandidates(action: Function) {
    this.hiringProcesses.forEach(candidate => {
      if (candidate['$selected']) {
        switch (candidate['hireStatus']) {
          case 'progress':
            action.call(this, candidate);
            break;

          case 'hired':
            this.poNotification.warning('This candidate has already been hired.');
            break;

          case 'canceled':
            this.poNotification.error('This candidate has already been disqualified.');
            break;
        }

        candidate['$selected'] = false;
      }
    });
  }

  getCandidates() {
    this.hireCandidatesService.getCandidates()
      .subscribe (r => {
        this.hiringProcesses = r;
        this.hiringProcessesFiltered = [...this.hiringProcesses];
    }, error => {
      return throwError({error});
    });
  }

  editCandidate(id: number) {
    this.router.navigate(['candidate', id]);
  }

  newCandidate() {
    this.router.navigate(['candidate']);
  }

  editCurriculum(id: number) {
    this.router.navigate(['candidate/:id/curriculum', {id: id}]);
  }

}
