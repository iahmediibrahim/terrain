import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatypesService } from '../datatypes-service/datatypes.service';

@Component({
  selector: 'app-datatype',
  templateUrl: './datatype.component.html',
  styleUrls: ['./datatype.component.scss'],
})
export class DatatypeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datatypesService: DatatypesService,
  ) {}
  datatype;
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getProject(id);
  }
  getProject(id) {
    this.datatypesService.getProjectWithId(id).subscribe(datatype => {
      this.datatype = datatype;
    });
  }
}
