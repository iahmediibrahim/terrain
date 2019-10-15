import { Component, OnInit } from '@angular/core';
import { DatatypesService } from '../datatypes-service/datatypes.service';

@Component({
  selector: 'app-datatypes',
  templateUrl: './datatypes.component.html',
  styleUrls: ['./datatypes.component.scss'],
})
export class DatatypesComponent implements OnInit {
  constructor(private dataTypes: DatatypesService) {}
  datatypes;
  ngOnInit() {
    this.dataTypes.all().subscribe(datatypes => (this.datatypes = datatypes));
  }
}
