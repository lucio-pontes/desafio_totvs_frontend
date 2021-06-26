import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PoMenuItem } from '@po-ui/ng-components';
import { AppResourcesService } from './app-resources.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AppResourcesService],
  styles: [
    `
      .sample-menu-header-text-color {
        color: #9da7a9;
      }
    `
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuItemSelected: string;

  readonly menus: Array<PoMenuItem> = [
    { label: 'Inicio', action: this.onHome.bind(this), link: 'home' },
    {
      label: 'Candidatos',
      action: this.onCandidates.bind(this),
      icon: 'po-icon-clock',
      shortLabel: 'Candidatos',
      link: 'candidates'
    },
    {
      label: 'Vagas Disponiveis',
      action: this.onJobs.bind(this),
      icon: 'po-icon-share',
      shortLabel: 'Vagas',
      link: 'jobs'
    }
  ];
  
  constructor(
    private router: Router,
    public appResourcesService: AppResourcesService) {
    this.menuItemSelected = '';
  }

  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
  }

  //onChange() {
  //  this.router.navigate(['/candidates']);
  //}

  //onVagas() {
  //  this.router.navigate(['/jobs']);
  //}

  onHome(menuItem: any) {
    this.router.navigate(['/home']);
  }

  onCandidates(menuItem: any) {
    this.router.navigate(['/candidates']);
  }

  onJobs(menuItem: any) {
    this.router.navigate(['/jobs']);
  }

  onCurriculums(menuItem: any) {
    this.router.navigate(['/curriculums']);
  }

  onProcess(menuItem: any) {
    this.router.navigate(['/process']);
  }

}
