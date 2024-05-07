import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { LayoutContainersModule } from './containers/layout/layout.containers.module';
import { Facade } from './shared/services/facadeService';
import { PromiseService } from './shared/promiseService';
import { NotificationService } from './shared/notificationService';
import { ToastrModule } from 'ngx-toastr';
import { AppService, AuthService, LoginService } from './shared/loginService';
import { ColumnsConstructor } from './shared/columns.constructor';
import { DownloadService } from './shared/downloadService';
import { ContextMenuModule } from 'ngx-contextmenu';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    BrowserModule,
    ViewsModule,
    AppRoutingModule,
    LayoutContainersModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot(),
    ContextMenuModule.forRoot({
      useBootstrap4: true
    }),
  ],
  declarations: [
    AppComponent
  ],
  providers: [Facade, PromiseService, NotificationService ,
    LoginService, AuthService, AppService, ColumnsConstructor, DownloadService, NgbActiveModal],
  bootstrap: [AppComponent],

})
export class AppModule { }
