import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const BASE_URL = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  model = 'projects';
  constructor(private httpClient: HttpClient) {}
  public upload(
    file: File,
  ): { [key: string]: { progress: Observable<number> } } {
    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};

    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    // create a http-post request and pass the form
    // tell it to report the upload progress
    const req = new HttpRequest('POST', this.getUrl(), formData, {
      reportProgress: true,
    });
    // create a new progress-subject for every file
    const progress = new Subject<number>();

    // send the http-request and subscribe for progress-updates
    this.httpClient.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        // calculate the progress percentage
        const percentDone = Math.round((100 * event.loaded) / event.total);

        // pass the percentage into the progress-stream
        progress.next(percentDone);
      } else if (event instanceof HttpResponse) {
        // Close the progress-stream if we get an answer form the API
        // The upload is complete
        progress.complete();
      }
    });

    // Save every progress-observable in a map of all observables
    status[file.name] = {
      progress: progress.asObservable(),
    };

    // return the map of progress.observables
    return status;
  }
  getUrl() {
    return `${BASE_URL}${this.model}`;
  }
  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }
  getProjectWithId(id) {
    return this.httpClient.get(this.getUrlForId(id));
  }
  all() {
    return this.httpClient.get(this.getUrl());
  }
  create(project) {
    return this.httpClient.post(this.getUrl(), project);
  }
  update(project) {
    return this.httpClient.patch(this.getUrlForId(project.id), project);
  }
  delete(projectId) {
    return this.httpClient.delete(this.getUrlForId(projectId));
  }
}
