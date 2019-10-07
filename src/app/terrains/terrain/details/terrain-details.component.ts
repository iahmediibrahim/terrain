import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import { fromLonLat } from 'ol/proj';
import { TerrainsService } from '../../terrains-service/terrains.service';
@Component({
  selector: 'app-terrain-details',
  templateUrl: './terrain-details.component.html',
  styleUrls: ['./terrain-details.component.scss'],
})
export class TerrainDetailsComponent implements OnInit {
  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private terrainsService: TerrainsService,
  ) {}
  project$;
  id;
  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  @ViewChild('file', { static: false }) file;
  public fileUpload: File;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.terrainsService
        .getProjectWithId(this.id)
        .subscribe(project => (this.project$ = project));
    }

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

  addFiles() {
    this.file.nativeElement.click();
  }
  upload() {
    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.terrainsService.upload(this.fileUpload);

    // convert the progress map into an array
    const allProgressObservables = [];
    for (const key in this.progress) {
      if (key) {
        allProgressObservables.push(this.progress[key].progress);
      }
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finished';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      // this.canBeClosed = true;
      // ... the upload was successful...
      this.uploadSuccessful = true;
      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }
  onFilesAdded() {
    this.fileUpload = this.file.nativeElement.files.item(0);
  }
}
