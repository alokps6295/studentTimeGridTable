import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';
import { StudentEntryComponent } from './studentEntry/studentEntry.component';
/* import { AuthGuardService, CanDeactivateGaurd } from './shared/services' */

const routes: Routes = [
  {path:'student',
component:StudentEntryComponent},
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],

exports: [RouterModule],
})
export class AppRoutingModule { }
