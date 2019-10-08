import { TerrainsService } from './terrains-service/terrains.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terrains',
  templateUrl: './terrains.component.html',
  styleUrls: ['./terrains.component.scss'],
})
export class TerrainsComponent implements OnInit {
  constructor(private terrainsService: TerrainsService) {}
  terrains$;
  // selectedProject;

  ngOnInit() {
    this.getProjects();
  }
  // selectProject(project) {
  //   this.selectedProject = project;
  //   console.log(this.selectedProject);
  // }
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
