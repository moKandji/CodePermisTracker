import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'conduite',
    loadComponent: () => import('./features/conduite/conduite.component').then(m => m.ConduiteComponent)
  },
  {
    path: 'code',
    loadComponent: () => import('./features/code/code.component').then(m => m.CodeComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent)
  }
];
