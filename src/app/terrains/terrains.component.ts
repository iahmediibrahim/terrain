import { TerrainsService } from './terrains-service/terrains.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuid } from 'uuid';
import { NgForm } from '@angular/forms';
import { Terrain } from './terrains-service/terrain';

@Component({
  selector: 'app-terrains',
  templateUrl: './terrains.component.html',
  styleUrls: ['./terrains.component.scss'],
})
export class TerrainsComponent implements OnInit {
  constructor(
    private terrainsService: TerrainsService,
    private modalService: NgbModal,
  ) {}
  terrains$;
  selectedProject;
  originalProject: Terrain = {
    name: null,
    description: null,
    date: new Date(),
    id: uuid(),
    workflows: {},
  };
  postError = false;
  postErrorMessage = '';
  resetProject() {
    this.originalProject = {
      name: null,
      description: null,
      date: new Date(),
      id: uuid(),
      workflows: {},
    };
  }
  open(content) {
    this.modalService.open(content, { centered: true });
  }
  onHttpError(errorResponse: any) {
    console.log('Error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }
  onSubmit(f: NgForm) {
    console.log(f.valid);
    if (f.valid) {
      this.terrainsService.create(this.originalProject).subscribe(
        result => {
          console.log(result);
          this.modalService.dismissAll();
          this.getProjects();
          this.resetProject();
        },
        error => this.onHttpError(error),
      );
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the above erros.';
    }
  }
  ngOnInit() {
    this.getProjects();
  }
  selectProject(project) {
    this.selectedProject = project;
    console.log(this.selectedProject);
  }
  getProjects() {
    this.terrains$ = this.terrainsService.all();
  }
  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    }
    this.updateProject(project);
  }
  createProject(project) {
    this.terrainsService.create(project).subscribe(result => {
      this.getProjects();
    });
  }
  updateProject(project) {
    this.terrainsService.update(project).subscribe(result => {
      this.getProjects();
    });
  }
  deleteProject(project) {
    this.terrainsService
      .delete(project.id)
      .subscribe(result => this.getProjects());
  }
}
