import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TerrainsService } from '../terrains-service/terrains.service';
import { v4 as uuid } from 'uuid';
import { Terrain } from '../terrains-service/terrain';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  originalProject: Terrain = {
    name: null,
    description: null,
    date: new Date(),
    id: uuid(),
    workflows: {},
  };
  postError = false;
  postErrorMessage = '';
  constructor(
    private terrainsService: TerrainsService,
    private router: Router,
  ) {}
  resetProject() {
    this.originalProject = {
      name: null,
      description: null,
      date: new Date(),
      id: uuid(),
      workflows: {},
    };
    this.router.navigate(['/']);
  }
  onHttpError(errorResponse: any) {
    console.log('Error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }
  onSubmit(f: NgForm) {
    if (f.valid) {
      this.createProject(this.originalProject);
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the above erros.';
    }
  }
  ngOnInit() {}
  createProject(project) {
    this.terrainsService.create(project).subscribe(
      result => {
        this.resetProject();
      },
      error => this.onHttpError(error),
    );
  }
}
