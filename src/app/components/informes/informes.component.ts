import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'


import { HomeComponent } from '../home/home.component';




@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  @ViewChild(HomeComponent) home: HomeComponent;

  titulo: string;

  constructor() {
    Chart.register(...registerables);
  }     

  ngOnInit(): void {
    this.titulo = 'Resumen Mes';    
  }

  

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart:any;

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
            labels: ['January 2021', 'February 2021', 'March 2021', 'April 2021', 'May 2021', 'June 2021', 'July 2021', 'August 2021', 'September 2021', 'October 2021', 'November 2021', 'December 2021']
        },
    });
  }



 

  }
