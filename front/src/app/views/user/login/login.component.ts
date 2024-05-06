import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Constantes } from 'src/app/constants/constantes';
import { Facade } from 'src/app/shared/services/facadeService';
import { ModalDirective } from 'ngx-bootstrap';
import { NotificationService } from '../../../shared/notificationService';
import { Controllers } from 'src/app/constants/controller';
import { GetSessionUser, SetSessionUser } from 'src/app/constants/functions';
import { environment } from 'src/environments/environment';
import { Sucursal } from 'src/app/shared/models/sucursal';
import { AddressModel } from 'src/app/shared/models/general/generic-model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  Rfc = 'admin';
  Usuario = '';
  Pass = '';
  login = false;

  isPageClient = Constantes.PageClients;

  constructor(private facade: Facade, private router: Router, private notificationService: NotificationService) {
    if (GetSessionUser()) {
      this.router.navigate([`/app`]);
    }
  }

  ngOnInit() {

  }

  async iniciarSesion() {
    if (this.Usuario && this.Pass) {
      this.login = true;
      const login = !this.isPageClient ?
        await this.facade.getWithoutModal(Controllers.Sucursal + 'Login', 
        { Rfc: this.Rfc, Usuario: this.Usuario, Pass: this.Pass }) as any :

        await this.facade.getWithoutModal(Controllers.Cliente + 'ClienteLogin', 
        { Rfc: this.Rfc, Usuario: this.Usuario, Pass: this.Pass }) as any;

      if (login) {

        SetSessionUser(login);
        this.router.navigate([`/app`]).then(o => {
        });
      } else {
        this.login = false;
      }
    }
  }





}
