import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TerrainsService } from '../terrains-service/terrains.service';
import { v4 as uuid } from 'uuid';
import { Terrain } from '../terrains-service/terrain';
import { NgForm } from '@angular/forms';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
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
  ngOnInit() {
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png',
    });

    this.layer = new OlTileLayer({
      source: this.source,
    });

    this.view = new OlView({
      center: fromLonLat([6.661594, 50.433237]),
      zoom: 3,
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view,
    });
  }
  createProject(project) {
    this.terrainsService.create(project).subscribe(
      result => {
        this.resetProject();
      },
      error => this.onHttpError(error),
    );
  }
}
