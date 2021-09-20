import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'

@Component({
  selector: 'app-informe-precio',
  templateUrl: './informe-precio.component.html',
  styleUrls: ['./informe-precio.component.css']
})



export class InformePrecioComponent implements OnInit {

  photos: any;
  total: any;
  averagePriceZara: any;
  averagePriceMango: any;


  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
  }

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart:any;

  // Recibe los datos del componente informes
  data(value: any) {
    this.photos = value;
    this.total = this.photos.length;
  }

  ngAfterViewInit() {
      Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
      this.canvas = this.mychart.nativeElement; 
      this.ctx = this.canvas.getContext('2d');

      new Chart(this.ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Mango',
                data: [0, 30, 20, 40, 60, 40, 10, 80, 30, 10, 64, 53],
                borderColor: "#007ee7",
                fill: true,
            },
            {
              label: 'Zara',
              data: [0, 20, 40, 60, 80, 20, 40, 60, 80, 100, 34, 23 ],
              borderColor: "#bd0e0e",
              fill: true,
          }],
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre']
        },
    }); // fin chart 1

  }

  setAveragePrice(){
    

  }

  

}
