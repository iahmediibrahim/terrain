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
  id;
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
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.terrainsService.getProjectWithId(this.id).subscribe(project => {
        this.newProject = project;
        this.project$ = JSON.parse(JSON.stringify(project));
      });
    }
    console.log(this.project$);

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
  onSubmit(f: NgForm) {
    if (f.valid) {
      this.saveProject(this.newProject);
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the above erros.';
    }
  }
  onCancel() {
    this.newProject = this.project$;
  }
  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    }
    this.updateProject(project);
  }
  createProject(project) {
    this.terrainsService.create(project).subscribe(result => {
      console.log('project Created!');
    });
  }
  updateProject(project) {
    this.terrainsService.update(project).subscribe(result => {
      console.log('project Updated!');
    });
  }
  deleteStaff(staffId: number) {
    swal
      .fire({
        type: 'warning',
        title: 'Are you sure to Delete Staff?',
        text: 'You will not be able to recover the data of Staff',
        showCancelButton: true,
        confirmButtonColor: '#049F0C',
        cancelButtonColor: '#ff0000',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      })
      .then(
        () => {
          this.terrainsService.delete(staffId).subscribe(
            data => {
              if (data.hasOwnProperty('error')) {
                console.log(data);
              } else if (data) {
                swal.fire({
                  type: 'success',
                  title: 'Deleted!',
                  text: 'The Staff has been deleted.',
                });
              }
            },
            error => {
              console.log(error);
            },
          );
        },
        dismiss => {
          // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
          if (dismiss === 'cancel') {
            swal.fire({
              type: 'info',
              title: 'Cancelled',
              text: 'Your Staff file is safe :)',
            });
          }
        },
      );
  }
}
