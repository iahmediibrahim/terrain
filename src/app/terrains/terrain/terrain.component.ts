import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="secondary-nav">
      <ul class="nav">
        <li class="nav-item">
          <a
            class="nav-link py-2 d-flex align-items-center"
            [routerLink]="['./']"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            ><i class="la la-cog"></i>Dashboard</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link py-2 d-flex align-items-center"
            [routerLink]="['./', 'workflows']"
            routerLinkActive="active"
            ><i class="la la-object-ungroup"></i>Workflows</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link py-2 d-flex align-items-center"
            [routerLink]="['./', 'jobs']"
            routerLinkActive="active"
            ><i class="la la-files-o"></i>Jobs</a
          >
        </li>
      </ul>
    </nav>
    <router-outlet> </router-outlet>
  `,
  styleUrls: ['./terrain.component.scss'],
})
export class TerrainComponent {}
