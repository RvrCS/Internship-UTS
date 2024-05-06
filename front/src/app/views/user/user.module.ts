import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user.routing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsStateButtonModule } from 'src/app/components/state-button/components.state-button.module';
import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [LoginComponent, UserComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    UserRoutingModule,
    FormsModule,
    SharedModule,
    MatTabsModule,
    NgSelectModule,
    ComponentsStateButtonModule,
    TabsModule.forRoot()
    // CommonsModule
  ]
})
export class UserModule { }
