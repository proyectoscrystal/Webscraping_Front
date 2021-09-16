import { formatCurrency } from '@angular/common';
import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
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
  currency1: any = '';

  constructor(private blackboxService: BlackboxService, @Inject(LOCALE_ID) public locale: string) {
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
    let price = (precioPromedio/totalElementos).toFixed()
    this.averagePrice = parseInt(price);
    this.setCurrency();
  }

  setCurrency() {
    this.currency1 = formatCurrency(this.averagePrice,this.locale, '$ ');
    this.currency1 = this.currency1.split(' ').splice(1,1);
    this.currency1 = this.currency1[0].split('.');
    this.currency1 = this.currency1.splice(0,1);
    this.currency1 = this.currency1[0];
    this.currency1 = this.currency1.split(',').join('.');
  }



  }
