import { NgModule } from '@angular/core';
import { StartComponent } from './start/start.component';
import { VienComponent } from './vien.component';
import { VienRoutingModule } from './vien.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { DashHeaderComponent } from './dash-header/dash-header.component';
import { DashChartsComponent } from './dash-charts/dash-charts.component';
import { DashFooterComponent } from './dash-footer/dash-footer.component';
import { ConceptoComponent } from './concepto/concepto.component';
import { CheckBoxLateralComponent } from './menu-bottom/check-box-lateral.component';
import { CheckboxsComponent } from './checkboxs/checkboxs.component';
import { DashConceptoComponent } from './dash-concepto/dash-concepto.component';
import { DashPreciosComponent } from './dash-precios/dash-precios.component';

@NgModule({
  declarations: [VienComponent, StartComponent, DashHeaderComponent, DashChartsComponent, DashFooterComponent, ConceptoComponent, CheckBoxLateralComponent, CheckboxsComponent, DashConceptoComponent, DashPreciosComponent],
  imports: [
    SharedModule,
    LayoutContainersModule,
    VienRoutingModule
  ]
})
export class VienModule { }
