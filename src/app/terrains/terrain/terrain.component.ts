import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="secondary-nav">
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
export class TerrainComponent {}
