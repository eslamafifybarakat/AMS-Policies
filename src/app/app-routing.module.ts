import { AuthGuard } from './modules/shared/services/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
  {
    path: 'home',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./modules/layout/layout.module')
      .then(m => m.LayoutModule)
  },
  {
    path: 'auth',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./modules/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./modules/error/error.module')
      .then(m => m.ErrorModule)
  },
  { path: "**", redirectTo: "error" }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        useHash: true,
        scrollPositionRestoration: 'top',
        // scrollPositionRestoration: "enabled",
      }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
