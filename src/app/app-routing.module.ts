import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'terrains',
    loadChildren: () =>
      import('./terrains/terrains.module').then(m => m.TerrainsModule),
  },
  {
    path: ':id',
    redirectTo: 'terrains/:id',
    pathMatch: 'full',
  },
  { path: '', redirectTo: 'terrains', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
