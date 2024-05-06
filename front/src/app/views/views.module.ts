import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsComponent } from './views.component';
import { ViewRoutingModule } from './views.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ViewsComponent,
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    SharedModule,
    
  ]
})
export class ViewsModule { }
