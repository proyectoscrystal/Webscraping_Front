import { InformeNuevosComponent } from './components/informes/informe-nuevos/informe-nuevos.component';
import { InformeDescuentoComponent } from './components/informes/informe-descuento/informe-descuento.component';
import { InformePrecioComponent } from './components/informes/informe-precio/informe-precio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NewImageComponent } from './components/new-image/new-image.component';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';
import { InformesComponent } from './components/informes/informes.component';

import { AuthGuard } from './auth.guard';
import { InformeSKUComponent } from './components/informes/informe-sku/informe-sku.component';
import { InformeDescontinuadosComponent } from './components/informes/informe-descontinuados/informe-descontinuados.component';
import { InformeCategoriaComponent } from './components/informes/informe-categoria/informe-categoria.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'informes',
    component: InformesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'informePrecios'
      },
      {
        path: 'informePrecios',
        component: InformePrecioComponent
      },
      {
        path: 'informeDescuentos',
        component: InformeDescuentoComponent
      },
      {
        path: 'informeNuevos',
        component: InformeNuevosComponent
      },
      {
        path: 'informeSKU',
        component: InformeSKUComponent
      },
      {
        path: 'informeDescontinuados',
        component: InformeDescontinuadosComponent
      },
      {
        path: 'informeCategoria',
        component: InformeCategoriaComponent
      }
    ]
  },
  {
    path: 'registerNewUserBlackbox',
    component: RegisterComponent
  },
  {
    path: 'newImage',
    component: NewImageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'image/:id',
    component: ImageDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
