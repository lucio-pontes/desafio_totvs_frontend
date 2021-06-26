import { Component, OnInit, ViewChild } from '@angular/core';
import { /*FormBuilder, FormGroup,*/ NgForm/*, Validators*/ } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoModalAction, PoModalComponent, PoNotificationService, PoRadioGroupOption } from '@po-ui/ng-components';
import { throwError } from 'rxjs';
import { HireCandidateModel } from 'src/app/models/hire-candidate.model';
import { HireCandidatesService } from '../hire-candidates.service';

@Component({
  selector: 'app-candidate-edit',
  templateUrl: './hire-candidate-edit.component.html',
  styleUrls: ['./hire-candidate-edit.component.css']
})
export class HireCandidateEditComponent implements OnInit {
  //reactiveForm: FormGroup;
  candidate: HireCandidateModel;
  
  readonly optionsStatus: Array<PoRadioGroupOption> = [
    { label: 'Ativo', value: 'Active' },
    { label: 'Cancelado', value: 'Canceled' }
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

  //@ViewChild('reactiveFormData', { static: true }) reactiveFormModal: PoModalComponent;
  @ViewChild('optionsForm', { static: true }) form: NgForm;
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private hireCandidatesService: HireCandidatesService,
    private poNotification: PoNotificationService) {
    //this.createReactiveForm();
  }
  
  ngOnInit(): void {
    this.candidate = {id: undefined, name: "", age: 0, city: "", phone: "", email: "", status: "Active"};

    this.activatedRoute.params.subscribe( p => {
      this.candidate.id = p?.id;
    });

    if (this.candidate?.id) {
      this.hireCandidatesService.getCandidate(this.candidate.id)
      .subscribe (r => {
        this.candidate = r;
      }, error => {
        return throwError({error});
      });
    } else {
      this.candidate =  {id: undefined, name: "", age: 0, city: "", phone: "", email: "", status: "Active"};
    }
  }
  /*
  saveForm() {
    this.reactiveFormModal.open();
  }*/

  openConfirmation() {
    this.poModal.open();
  }

  save() {
    this.hireCandidatesService.postOrPutCandidate(this.candidate)
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

  openQuestionnaire() {
    this.poModal.open();
  }
}
