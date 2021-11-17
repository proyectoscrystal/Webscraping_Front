import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {
  LazyLoadImageModule,
  LAZYLOAD_IMAGE_HOOKS,
  ScrollHooks,
} from 'ng-lazyload-image';
// import { ChartsModule } from 'ng2-charts'

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NewImageComponent } from './components/new-image/new-image.component';

//Productos
import { GeneralComponent } from './components/productos/general/general.component';
import { CatMujerComponent } from './components/productos/cat-mujer/cat-mujer.component';
import { CatHombreComponent } from './components/productos/cat-hombre/cat-hombre.component';
import { CatKidsComponent } from './components/productos/cat-kids/cat-kids.component';

// Guard
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';
import { InformesComponent } from './components/informes/informes.component';
import { InformePrecioComponent } from './components/informes/informe-precio/informe-precio.component';
import { InformeDescuentoComponent } from './components/informes/informe-descuento/informe-descuento.component';
import { InformeNuevosComponent } from './components/informes/informe-nuevos/informe-nuevos.component';
import { InformeDescontinuadosComponent } from './components/informes/informe-descontinuados/informe-descontinuados.component';
import { InformeSKUComponent } from './components/informes/informe-sku/informe-sku.component';

import { InformeCategoriaComponent } from './components/informe-categoria/informe-categoria.component';

// Angular DataTables
import { DataTablesModule } from "angular-datatables";
import { ProductosComponent } from './components/productos/productos.component';
import { Table2Component } from './components/informe-categoria/table2/table2.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NewImageComponent,
    ImageDetailComponent,
    InformePrecioComponent,
    InformesComponent,
    InformeDescuentoComponent,
    InformeNuevosComponent,
    InformeDescontinuadosComponent,
    InformeSKUComponent,
    InformeCategoriaComponent,
    CatMujerComponent,
    CatHombreComponent,
    CatKidsComponent,
    ProductosComponent,
    Table2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    LazyLoadImageModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      maxOpened: 2,
    }), // ToastrModule added
    ModalModule.forRoot(),
    DataTablesModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
