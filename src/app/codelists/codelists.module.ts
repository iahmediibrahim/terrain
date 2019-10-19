import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CodelistsComponent } from './codelists/codelists.component';
import { CodelistComponent } from './codelist/codelist.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddModalComponent } from './codelist/addModal/addModal.component';

const routes: Routes = [
  { path: '', component: CodelistsComponent },
  {
    path: ':id',
    component: CodelistComponent,
  },
];

@NgModule({
  declarations: [CodelistsComponent, CodelistComponent, AddModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
  ],
  entryComponents: [AddModalComponent],
})
export class CodelistsModule {}
