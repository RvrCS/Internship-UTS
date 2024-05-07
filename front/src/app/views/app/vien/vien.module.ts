import { NgModule } from '@angular/core';
import { StartComponent } from './start/start.component';
import { VienComponent } from './vien.component';
import { VienRoutingModule } from './vien.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { BottomCardsComponent } from './bottom-cards/bottom-cards.component';

@NgModule({
  declarations: [VienComponent, StartComponent, BottomCardsComponent],
  imports: [
    SharedModule,
    LayoutContainersModule,
    VienRoutingModule
  ]
})
export class VienModule { }
