import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';

import { ContenedorComponent } from './sitioweb/vistas/contenedor/contenedor.component';
import { FondoComponent } from './shared/componentes/fondo/fondo.component';
import { InicioComponent } from './sitioweb/vistas/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    ContenedorComponent,
    FondoComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
