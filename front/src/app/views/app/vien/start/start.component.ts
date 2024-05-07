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
  graph: ECharts;

  constructor(private facade: Facade) { }

  
  ngOnInit(): void {
    // Configuarción gráfica de barras
    this.chart = init(document.getElementById('graficaId') as HTMLDivElement);
    const option = {
      title: {
        text: 'Corporativo Compras-Ventas-Pagos',
        textStyle: {
          align: 'center'
        },
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
          name: 'Compras',
          type: 'bar',
          color: '#E8743B',
          data: [120000, 150000, 180000, 200000, 220000, 210000, 240000, 230000, 220000, 210000, 200000, 230000]
        },
        {
          name: 'Ventas',
          type: 'bar',
          color: '#5899DA',
          data: [100000, 130000, 160000, 190000, 200000, 190000, 220000, 210000, 200000, 190000, 180000, 210000]
        },
        {
          name: 'Pagos',
          type: 'bar',
          color: '#19A979',
          data: [120000, 100000, 170000, 150000, 210000, 230000, 200000, 220000, 190000, 150000, 160000, 200000]
        }
      ]
    };
    this.chart.setOption(option);
    
    // Configuración grafica lineal
    this.graph = init(document.getElementById('graficaLineal') as HTMLDivElement);
    const opciones = {
      title: {
        text: 'Corporativo Compras-Ventas-Pagos',
        textStyle: {
          align: 'center'
        },
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
          name: '2023',
          type: 'line',
          color: '#E8743B',
          data: [200000, 185000, 150000, 250000, 265000, 280000, 150000, 180000, 200000, 220000, 230000, 280000]
        },
        {
          name: '2024',
          type: 'line',
          color: '#5899DA',
          data: [150000, 200000, 200000, 150000, 250000]
        },
        
      ]
    };
    this.graph.setOption(opciones);
  }
  
    


}
