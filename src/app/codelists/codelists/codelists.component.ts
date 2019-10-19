import { Component, OnInit, PipeTransform } from '@angular/core';
import { CodelistsService } from '../codelists-service/codelists.service';
import { FormControl } from '@angular/forms';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-codelists',
  templateUrl: './codelists.component.html',
  styleUrls: ['./codelists.component.scss'],
})
export class CodelistsComponent implements OnInit {
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.codelist = this.listFilter
      ? this.search(this.listFilter)
      : this.codelist$;
  }
  _listFilter;
  codelist;
  codelist$;
  constructor(private codelists: CodelistsService) {}
  ngOnInit() {
    this.codelists
      .all()
      .subscribe(
        codelists => (
          (this.codelist$ = codelists), (this.codelist = this.codelist$)
        ),
      );
  }
  search(text: string) {
    text = text.toLowerCase();
    return this.codelist$.filter(
      item => item.name.toLowerCase().indexOf(text) !== -1,
    );
  }
}
