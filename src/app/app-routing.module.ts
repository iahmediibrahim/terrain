import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then(m => m.WelcomeModule),
  },
  {
    path: 'terrains',
    loadChildren: () =>
      import('./terrains/terrains.module').then(m => m.TerrainsModule),
  },
  {
    path: 'codelists',
    loadChildren: () =>
      import('./codelists/codelists.module').then(m => m.CodelistsModule),
  },
  {
    path: 'datatypes',
    loadChildren: () =>
      import('./datatypes/datatypes.module').then(m => m.DatatypesModule),
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
