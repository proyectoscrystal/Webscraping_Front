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


  mes() {
    if (this.seleccion === "año Zara") {      
      // this.PriceZaraYear(this.photos);
      this.ng();

    } else if(this.seleccion === 'mes'){ 
      // this.setAveragePriceMango(this.photos);
      // this.AveragePriceZara(this.photos);
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
