import { formatCurrency } from '@angular/common';
import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { Chart, ChartConfiguration, registerables, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'
import { BlackboxService } from '../../services/blackbox.service';

import { InformePrecioComponent } from './informe-precio/informe-precio.component';
import { InformeDescuentoComponent } from './informe-descuento/informe-descuento.component';
import { InformeNuevosComponent } from './informe-nuevos/informe-nuevos.component';
import { InformeSKUComponent } from './informe-sku/informe-sku.component';



@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  @ViewChild(InformePrecioComponent) informePrecio: InformePrecioComponent;
  @ViewChild(InformeDescuentoComponent) informeDescuento: InformeDescuentoComponent;
  @ViewChild(InformeNuevosComponent) informeNuevo: InformeNuevosComponent;
  @ViewChild(InformeSKUComponent) informeSKU: InformeSKUComponent;
  
  titulo: string;
  photos: any;
  averagePrice: number;
  totalDiscount: number;
  totalNew: any;
  totalsku: any;
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
        this.getAverage();
        this.getDiscount();
        this.getNew();
        this.setTotalSKU();
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
    this.informePrecio.data(this.photos);
    this.informeDescuento.data(this.photos);
    this.informeNuevo.data(this.photos);
    this.informeSKU.data(this.photos);
    // this.informeDescuento.data(this.photos);
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

  getDiscount(){
    let descuentoPromedio: number = 0;
    let totalElementos2 = this.photos.length;   
    this.photos.forEach(element => {
      let { descuento } = element;
      descuentoPromedio += descuento;
    });
    let discount = ((descuentoPromedio/100) * totalElementos2).toFixed();
    this.totalDiscount = parseInt(discount);
  }

  getNew(){
    this.totalNew = this.photos.filter((res) => {
      if(res.estado === 'nuevo'){
        return res;
      }
    })

    this.totalNew = this.totalNew.length;
  }

  setTotalSKU() {
    this.totalsku = this.photos.length;
  }


}
