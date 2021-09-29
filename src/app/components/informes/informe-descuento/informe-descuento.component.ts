import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'

import { BlackboxService } from '../../../services/blackbox.service';

@Component({
  selector: 'app-informe-descuento',
  templateUrl: './informe-descuento.component.html',
  styleUrls: ['./informe-descuento.component.css']
})
export class InformeDescuentoComponent implements OnInit {

  photos: any;
  total: any;
  yearMonth: string[] = ['mes','año Zara','año Mango'];
  seleccion: string = '';
  discountPriceZara1: any = 0;
  discountPriceZara2: any = 0;
  discountPriceZara3: any = 0;
  discountPriceZara4: any = 0;
  discountPriceZara5: any = 0;
  discountPriceZara6: any = 0;
  discountPriceZara7: any = 0;
  discountPriceZara8: any = 0;
  discountPriceZara9: any = 0;
  discountPriceZara10: any = 0;
  discountPriceZara11: any = 0;
  discountPriceZara12: any = 0;
  discountPriceMango1: any = 0;
  discountPriceMango2: any  = 0;
  discountPriceMango3: any  = 0;
  discountPriceMango4: any  = 0;
  discountPriceMango5: any  = 0;
  discountPriceMango6: any  = 0;
  discountPriceMango7: any  = 0;
  discountPriceMango8: any  = 0;
  discountPriceMango9: any  = 0;
  discountPriceMango10: any  = 0;
  discountPriceMango11: any  = 0;
  discountPriceMango12: any  = 0;
  label1: any;
  label2: any;
  myChart: Chart;

  constructor(private blackboxService: BlackboxService) {
    Chart.register(...registerables);
   }

  ngOnInit(): void {
  }

  getPhotoList() {
    this.blackboxService.getPhotos().subscribe(
      (res) => {
        this.photos = res;
        this.ng();
        return (this.photos = res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart:any;

  AverageDiscountZara(photos: any){
    let eneZ: any[] = [];
    let febZ: any[] = [];
    let marZ: any[] = [];
    let abrZ: any[] = [];
    let mayZ: any[] = [];
    let junZ: any[] = [];
    let julZ: any[] = [];
    let agosZ: any[] = [];
    let sepZ: any[] = [];
    let octZ: any[] = [];
    let novZ: any[] = [];
    let dicZ: any[] = [];
    this.label2 = 'Zara';

    
     photos.forEach(element => {
      let date = new Date();
      let currentYear = date.getFullYear();
      let currentMonth = date.getMonth();
      let fecha = element.createdAt.split('T').slice(0,1)[0];  // funcion para obtener la fecha 
      let mes = parseInt(fecha.split('-')[1]); // funcion para obtener el mes como numero
      let year = parseInt(fecha.split('-')[0]);

      if(element.origin === 'Zara' && year === currentYear ) { 

        if(mes === 1 && element.descuento === null) {      // estructura interna del if
          eneZ.push(element.precio); 
        } 
        if(mes === 2 && element.descuento === null) {      // estructura interna del if
          febZ.push(element.precio);
        } 
        if(mes === 3 && element.descuento === null) {      // estructura interna del if
          marZ.push(element.precio);
        } 
        if(mes === 4 && element.descuento === null) {      // estructura interna del if
          abrZ.push(element.precio);
        } 
        if(mes === 5 && element.descuento === null) {      // estructura interna del if
          mayZ.push(element.precio);

        } 
        if(mes === 6 && element.descuento === null) {      // estructura interna del if
          junZ.push(element.precio);
        } 
        if(mes === 7 && element.descuento === null) {      // estructura interna del if
          julZ.push(element.precio);

        } 
        if(mes === 8 && element.descuento === null) {      // estructura interna del if
          agosZ.push(element.precio);
        }
        if(mes === 9 && element.descuento === null) {      // estructura interna del if
          sepZ.push(element.precio);
        } 
        if(mes === 10 && element.descuento === null) {      // estructura interna del if
          octZ.push(element.precio); 
        }          
        if(mes === 11 && element.descuento === null) {      // estructura interna del if
          novZ.push(element.precio); 
        }  
        if(mes === 12 && element.descuento === null) {      // estructura interna del if
          dicZ.push(element.precio);
        }        


      } 
      
      if (element.origin === 'Zara' && year === currentYear ) {

        if(mes === 1 && element.descuento !== null) {      // estructura interna del if
          eneZ.push(element.descuento);
        } 
        if(mes === 2 && element.descuento !== null) {      // estructura interna del if
          febZ.push(element.descuento);
        } 
        if(mes === 3 && element.descuento !== null) {      // estructura interna del if
          marZ.push(element.descuento);
        } 
        if(mes === 4 && element.descuento !== null) {      // estructura interna del if
          abrZ.push(element.descuento);
        } 
        if(mes === 5 && element.descuento !== null) {      // estructura interna del if
          mayZ.push(element.descuento);
        } 
        if(mes === 6 && element.descuento !== null) {      // estructura interna del if
          junZ.push(element.descuento);
        } 
        if(mes === 7 && element.descuento !== null) {      // estructura interna del if
          julZ.push(element.descuento);
        } 
        if(mes === 8 && element.descuento !== null) {      // estructura interna del if
          agosZ.push(element.descuento);
        } 
        if(mes === 9 && element.descuento !== null) {      // estructura interna del if
          sepZ.push(element.descuento);
        } 
        if(mes === 10 && element.descuento !== null) {      // estructura interna del if
          octZ.push(element.descuento);
        } 
        if(mes === 11 && element.descuento !== null) {      // estructura interna del if
          novZ.push(element.descuento);  
        } 
        if(mes === 12 && element.descuento !== null) {      // estructura interna del if
          dicZ.push(element.descuento);
        } 

      }
      
    }); // fin del ciclo que guarda los precios de cada mes 

    // iniciar las variables
     this.discountPriceZara1= 0;
     this.discountPriceZara2= 0;
     this.discountPriceZara3= 0;
     this.discountPriceZara4= 0;
     this.discountPriceZara5= 0;
     this.discountPriceZara6= 0;
     this.discountPriceZara7= 0;
     this.discountPriceZara8= 0;
     this.discountPriceZara9= 0;
     this.discountPriceZara10= 0;
     this.discountPriceZara11= 0;
     this.discountPriceZara12= 0;

    // ciclos para sacar el precio promedio zara
    // this.setAveragePrice1Zara(eneZ);
    // this.setAveragePrice2Zara(febZ);
    // this.setAveragePrice3Zara(marZ);
    // this.setAveragePrice4Zara(abrZ);
    // this.setAveragePrice5Zara(mayZ);
    // this.setAveragePrice6Zara(junZ);
    // this.setAveragePrice7Zara(julZ);
    // this.setAveragePrice8Zara(agosZ);
    // this.setAveragePrice9Zara(sepZ);
    // this.setAveragePrice10Zara(octZ);
    // this.setAveragePrice11Zara(novZ);
    // this.setAveragePrice12Zara(dicZ);

    eneZ= [];
    febZ = [];
    marZ = [];
    abrZ = [];
    mayZ = [];
    junZ = [];
    julZ = [];
    agosZ = [];
    sepZ = [];
    octZ = [];
    novZ = [];
    dicZ = [];

  }


  mes() {
    if (this.seleccion === "año Zara") {      
      // this.PriceZaraYear(this.photos);
      this.ng();

    } else if(this.seleccion === 'mes'){ 
      // this.setAveragePriceMango(this.photos);
      // this.AverageDiscountZara(this.photos);
      this.ng();
    } else if(this.seleccion === "año Mango"){
      // this.PriceMangoYear(this.photos);
      this.ng();
    }
  }

  ng = function ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort; 
      
    if(this.myChart){
      this.myChart.clear();
      this.myChart.destroy();
    }
    

    Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
    this.myChart = new Chart("myChart", {
    type: 'line',
    data: {
        datasets: [{
            label: this.label1,
            data: [this.discountPriceMango1, this.discountPriceMango2, this.discountPriceMango3, this.discountPriceMango4, this.discountPriceMango5, this.discountPriceMango6, this.discountPriceMango7, this.discountPriceMango8, this.discountPriceMango9, this.discountPriceMango10, this.discountPriceMango11, this.discountPriceMango12],
            borderColor: "#007ee7",
            fill: true,
        },
        {
          label: this.label2,
          data: [this.discountPriceZara1, this.discountPriceZara2, this.discountPriceZara3, this.discountPriceZara4, this.discountPriceZara5, this.discountPriceZara6, this.discountPriceZara7, this.discountPriceZara8, this.discountPriceZara9, this.discountPriceZara10, this.discountPriceZara11, this.discountPriceZara12 ],
          borderColor: "#bd0e0e",
          fill: true,
      }],
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre']
    },
    
}); // fin chart 1

}

}
