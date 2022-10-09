import { SalesComponent } from './components/sales/sales.component';
import { AboutComponent } from './components/about/about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'titles.home'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'titles.about'
    }
  },
  {
    path: 'sales',
    component: SalesComponent,
    data: {
      title: 'titles.sales'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
