import { StatisticsPageComponent } from './components/statistics-page/statistics-page.component';
import { AuthGuard } from '../shared/services/guards/auth.guard';
import { StatisticsComponent } from './statistics.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [{
  path: '', component: StatisticsComponent, children: [
    {
      path: 'statistics',
      canActivate: [AuthGuard],
      component: StatisticsPageComponent,
      data: {
        title: 'titles.statistics',
        type: 'statistics'
      }
    },
    {
      path: '',
      redirectTo: 'statistics',
      pathMatch: 'full'
    },
    {
      path: 'error',
      loadChildren: () => import('./../../modules/error/error.module')
        .then(m => m.ErrorModule)
    },
    { path: "**", redirectTo: "error" }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
