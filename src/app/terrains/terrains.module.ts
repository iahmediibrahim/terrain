import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TimeAgoPipe } from 'time-ago-pipe';

import { WorkflowsComponent } from './terrain/workflows/workflows.component';
import { JobsComponent } from './terrain/jobs/jobs.component';
import { TerrainsComponent } from './terrains.component';
import { TerrainComponent } from './terrain/terrain.component';
import { TerrainDetailsComponent } from './terrain/details/terrain-details.component';

const routes: Routes = [
  { path: '', component: TerrainsComponent },
  {
    path: ':id',
    component: TerrainComponent,
    children: [
      { path: '', component: TerrainDetailsComponent },
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
    TerrainComponent,
    TerrainsComponent,
    TerrainDetailsComponent,
    WorkflowsComponent,
    JobsComponent,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
  ],
})
export class TerrainsModule {}
