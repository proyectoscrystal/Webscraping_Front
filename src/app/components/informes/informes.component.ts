import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'
import { BlackboxService } from '../../services/blackbox.service';




@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  titulo: string;
  photos: any;
  averagePrice: number;

  constructor(private blackboxService: BlackboxService) {
    Chart.register(...registerables);
  }     

  ngOnInit(): void {
    this.titulo = 'Resumen Mes'; 
    this.getPhotoList(); 
      
  }

  

  // metodo para obtener todos los documentos de tipo images
  getPhotoList() {
    this.blackboxService.getPhotos().subscribe(
      (res) => {
        this.photos = res;
        console.log(res);
        this.getAverage();
        return (this.photos = res);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  getAverage(){
    let precioPromedio: number = 0;
    let totalElementos = this.photos.length;   
    this.photos.forEach(element => {
      let { precio } = element;
      precioPromedio += precio;
    });
    return (this.averagePrice = (precioPromedio/totalElementos));

  }

  }
