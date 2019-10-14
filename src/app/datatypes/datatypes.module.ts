import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatypesComponent } from './datatypes/datatypes.component';
import { Routes, RouterModule } from '@angular/router';
import { DatatypeComponent } from './datatype/datatype.component';

const routes: Routes = [
  { path: '', component: DatatypesComponent },
  {
    path: ':id',
    component: DatatypeComponent,
  },
];

@NgModule({
  declarations: [DatatypesComponent, DatatypeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DatatypesModule {}
