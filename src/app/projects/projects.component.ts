import { ProjectsService } from './projects-service/projects.service';
import { Project } from './projects-service/project';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuid } from 'uuid';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  constructor(
    private projectsService: ProjectsService,
    private modalService: NgbModal,
  ) {}
  projects$;
  selectedProject;
  originalProject: Project = {
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
      this.projectsService.create(this.originalProject).subscribe(
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
    this.projects$ = this.projectsService.all();
  }
  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    }
    this.updateProject(project);
  }
  createProject(project) {
    this.projectsService.create(project).subscribe(result => {
      this.getProjects();
    });
  }
  updateProject(project) {
    this.projectsService.update(project).subscribe(result => {
      this.getProjects();
    });
  }
  deleteProject(project) {
    this.projectsService
      .delete(project.id)
      .subscribe(result => this.getProjects());
  }
}
