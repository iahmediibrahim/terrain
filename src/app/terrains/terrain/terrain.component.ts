import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TerrainsService } from '../terrains-service/terrains.service';

@Component({
  selector: 'app-root',
  template: `
    <nav class="secondary-nav">
      <h5 class="text-muted my-4 pl-3" *ngIf="projectName$">
        {{ projectName$ }}
      </h5>
      <ul class="nav">
        <li class="nav-item">
          <a
            class="nav-link py-2"
            [routerLink]="['./']"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            ><i class="fa fa-address-card-o mr-1" aria-hidden="true"></i>
            Dashboard</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link py-2"
            [routerLink]="['./', 'workflows']"
            routerLinkActive="active"
            ><i class="fa fa-crosshairs mr-1" aria-hidden="true"></i>
            Workflows</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link py-2"
            [routerLink]="['./', 'jobs']"
            routerLinkActive="active"
            ><i class="fa fa-files-o mr-1" aria-hidden="true"></i> Jobs</a
          >
        </li>
      </ul>
    </nav>
    <router-outlet> </router-outlet>
  `,
  styleUrls: ['./terrain.component.scss'],
})
export class TerrainComponent implements OnInit {
  id;
  projectName$ = '';
  constructor(
    private route: ActivatedRoute,
    private terrainsService: TerrainsService,
  ) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.terrainsService
        .getProjectWithId(this.id)
        .subscribe((project: any) => (this.projectName$ = project.name));
    }
  }
}
