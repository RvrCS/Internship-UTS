import { Component, OnInit } from '@angular/core';
import { Constantes } from 'src/app/constants/constantes';
import { Facade } from 'src/app/shared/services/facadeService';
export class CxCDashBoard {
  Fecha: string = '';
  NoFacturas: number = 0;
  Monto: number = 0;
}
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})
export class StartComponent implements OnInit {

  constructor(private facade: Facade) { }

  async ngOnInit() {
  }



}
