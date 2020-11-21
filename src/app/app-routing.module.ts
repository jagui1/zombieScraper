import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllRecordsComponent } from './all-records/all-records.component';
import { NoMansLandComponent } from './no-mans-land/no-mans-land.component'
import { SpeedrunsComponent } from './speedruns/speedruns.component';

const routes: Routes = [
  {
    path: '',
    component: AllRecordsComponent
  },
  {
    path: 'nomansland',
    component: NoMansLandComponent
  },
  {
    path: 'speedruns',
    component: SpeedrunsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
