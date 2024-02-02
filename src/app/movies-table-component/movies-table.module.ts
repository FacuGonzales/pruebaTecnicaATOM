import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { MovieTableRoutingModule } from './movies-table-routing.module';

@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    MovieTableRoutingModule
  ],
  exports: [
  ]
})
export class MovieTableModule { }
