import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ModalModule, CollapseModule, BsDropdownModule, DatePickerComponent } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from 'ag-grid-angular';
import { ColumnsConstructor } from 'src/app/shared/columns.constructor';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TreeModule } from 'angular-tree-component';
import { TextMaskModule } from 'angular2-text-mask';

import { SanitizerPipe } from 'src/app/shared/sanitizerPipe';
import { ContextMenuModule } from 'ngx-contextmenu';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsCarouselModule } from 'src/app/components/carousel/components.carousel.module';
import { ArchwizardModule } from 'angular-archwizard';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ThermalPrintModule } from 'ng-thermal-print';


@NgModule({
  declarations: [
    AppComponent,
    SanitizerPipe,
    
  ],
  imports: [

    NgbModule,
    CommonModule,
    CurrencyMaskModule,
    AppRoutingModule,
    SharedModule,
    LayoutContainersModule,
    CollapseModule,
    BsDropdownModule,
    ModalModule.forRoot(),
    FormsModule,
    AgGridModule.withComponents([]),
    MatTabsModule,
    NgSelectModule,
    TabsModule.forRoot(),
    TreeModule.forRoot(),
    TextMaskModule,
    ContextMenuModule,
    ComponentsCarouselModule,
    ArchwizardModule,
    PdfViewerModule,

    ThermalPrintModule,
    //   BrowserAnimationsModule,
  ],
  providers: [NgbActiveModal],
  exports: [
  ],
})
export class AppModule { }

