import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import { fromLonLat } from 'ol/proj';
import { TerrainsService } from '../../terrains-service/terrains.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-terrain-details',
  templateUrl: './terrain-details.component.html',
  styleUrls: ['./terrain-details.component.scss'],
})
export class TerrainDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private terrainsService: TerrainsService,
  ) {}
  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  newProject;
  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  @ViewChild('file', { static: false }) file;
  public fileUpload: File;
  postError = false;
  postErrorMessage = '';
  project$ = {};
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getProject(id);
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
  getProject(id) {
    this.terrainsService.getProjectWithId(id).subscribe(project => {
      this.newProject = project;
      this.project$ = JSON.parse(JSON.stringify(project));
    });
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      this.saveProject(this.project$);
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the above erros.';
    }
  }

  saveProject(project) {
    this.updateProject(project);
  }
  updateProject(project) {
    this.terrainsService.update(project).subscribe(result => {
      // this.getProject(project.id);
      //  console.log(result);
      this.newProject = result;
    });
  }
  onCancel() {
    this.project$ = JSON.parse(JSON.stringify(this.newProject));
  }
  deleteStaff(staffId: number) {
    swal
      .fire({
        type: 'warning',
        title: 'Are you sure to Delete Record?',
        text: 'You will not be able to recover the data!',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it!',
        confirmButtonColor: 'rgb(255, 51, 102)',
        cancelButtonColor: 'rgb(204, 204, 204, .8)',
        customClass: {
          confirmButton: 'border-32',
          cancelButton: 'border-32',
        },
      })
      .then(result => {
        if (result.value) {
          this.terrainsService.delete(staffId).subscribe(() => {
            this.router.navigate(['/terrains']);
          });
        } else if (result.dismiss === swal.DismissReason.cancel) {
          return true;
        }
      });
  }
}
