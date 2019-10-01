import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProjectsComponent } from './projects.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectComponent } from './project-details/project.component';
import { WorkflowsComponent } from './project-details/workflows/workflows.component';
import { JobsComponent } from './project-details/jobs/jobs.component';
const routes: Routes = [
  { path: '', component: ProjectsComponent },
  {
    path: ':id',
    component: ProjectComponent,
    children: [
      { path: '', component: ProjectDetailsComponent },
      {
        path: 'workflows',
        component: WorkflowsComponent,
      },
      {
        path: 'jobs',
        component: JobsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
    WorkflowsComponent,
    JobsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
  ],
})
export class ProjectsModule {}
