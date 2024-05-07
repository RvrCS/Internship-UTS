import { Component, OnInit } from '@angular/core';
import { Constantes } from 'src/app/constants/constantes';
import { Facade } from 'src/app/shared/services/facadeService';
import { ECharts, color, init } from 'echarts';

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
  chart: ECharts;

  constructor(private facade: Facade) { }

  
  ngOnInit(): void {
    this.chart = init(document.getElementById('IdGrafica') as HTMLDivElement);
    
    window.addEventListener('resize', () => {
      this.chart.resize();
    });
    
    const option = {
      title: {
        text: 'Ventas de los últimos 12 meses',
        subtext: 'Ventas Acumuladas'
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{a} : {b}'
      },
      xAxis: {
        type: 'category',
        data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Sucursal A',
          type: 'line',
          color: 'blue',
          data: [120000, 150000, 180000, 200000, 220000, 210000, 240000, 230000, 220000, 210000, 200000, 230000]
        },
        {
          name: 'Otra línea',
          type: 'line',
          color: 'orange',
          data: [100000, 130000, 160000, 190000, 200000, 190000, 220000, 210000, 200000, 190000, 180000, 210000]
        }
      ]
    };
    this.chart.setOption(option);
  }
  
}
