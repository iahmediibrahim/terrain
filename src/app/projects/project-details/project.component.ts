import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../projects-service/projects.service';

@Component({
  selector: 'app-root',
  template: `
    <nav class="secondary-nav">
      <h5 class="text-muted my-4 pl-3">{{ projectName$ }}</h5>
      <ul class="nav">
        <li class="nav-item">
          <a
            class="nav-link py-3"
            [routerLink]="['./']"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            ><i class="fa fa-address-card-o mr-1" aria-hidden="true"></i>
            Dashboard</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link py-3"
            [routerLink]="['./', 'workflows']"
            routerLinkActive="active"
            ><i class="fa fa-crosshairs mr-1" aria-hidden="true"></i>
            Workflows</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link py-3"
            [routerLink]="['./', 'jobs']"
            routerLinkActive="active"
            ><i class="fa fa-files-o mr-1" aria-hidden="true"></i> Jobs</a
          >
        </li>
      </ul>
    </nav>
    <router-outlet> </router-outlet>
  `,
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  id;
  projectName$;
  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
  ) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.projectsService
        .getProjectWithId(this.id)
        .subscribe(project => (this.projectName$ = project.name));
    }
  }
}
