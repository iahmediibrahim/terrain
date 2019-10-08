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

  ngOnInit() {
    this.getProjects();
  }
  getProjects() {
    this.terrains$ = this.terrainsService.all();
  }
  deleteProject(project) {
    this.terrainsService
      .delete(project.id)
      .subscribe(result => this.getProjects());
  }
}
