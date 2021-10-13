import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'

import { BlackboxService } from '../../../services/blackbox.service';

// Angular DataTable
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-informe-nuevos',
  templateUrl: './informe-nuevos.component.html',
  styleUrls: ['./informe-nuevos.component.css']
})

export class InformeNuevosComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  photos: any;
  total: any;
  label1: any;
  label2: any;
  origin: any = '';
  categoria: any = '';
  subCategoria: any = '';
  tipoPrenda: any = '';
  color: any = '';
  months: any;
  averageDiscount1: any;
  averageDiscount2: any;

  constructor(private blackboxService: BlackboxService) { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getInfoNews();
    this.getPhotoList();
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'
      }
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getPhotoList() {
    this.blackboxService.getPhotos().subscribe(
      (res) => {
        this.photos = res;
        this.dtTrigger.next();
        return (this.photos = res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getInfoNews() {
    let params = {
      origin: this.origin,
      categoria: this.categoria,
      subCategoria: this.subCategoria,
      tipoPrenda: this.tipoPrenda,
      color: this.color
    };

    this.blackboxService.getInfoNews(params).subscribe(
      (res) => {
        this.setInfoNews(res);
        console.log(res);
        this.ng();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setInfoNews(res) {
    let date = new Date();
    let year = date.getFullYear();
    if(res.obj.origin === 'general'){
      this.label1 = 'Zara';
      this.label2 = 'Mango';
      this.months = res.obj.months;
      console.log(res);
      for (let index = 0; index < res.obj.values.length; index++) {
        if(index <= 11){
          this.averageDiscount1[index] = res.obj.values[index];
        } else if (index >= 24 && index <= 35){
          this.averageDiscount2[index - 24] = res.obj.values[index];
        }        
      }
    } else if(res.obj.origin === 'Mango') {
      this.label1 = `${res.obj.origin} ${year}`;
      this.label2 = `${res.obj.origin} ${year - 1}`;
      this.months = res.obj.months;
      for (let index = 0; index < res.obj.values.length; index++) {
        if(index <= 11){
          this.averageDiscount1[index] = res.obj.values[index];
        } else if (index >= 12 && index <= 23){
          this.averageDiscount2[index - 12] = res.obj.values[index];
        }        
      }
    } else if(res.obj.origin === 'Zara') {
      this.label1 = `${res.obj.origin} ${year}`;
      this.label2 = `${res.obj.origin} ${year - 1}`;
      this.months = res.obj.months;
      for (let index = 0; index < res.obj.values.length; index++) {
        if(index <= 11){
          this.averageDiscount1[index] = res.obj.values[index];
        } else if (index >= 12 && index <= 23){
          this.averageDiscount2[index - 12] = res.obj.values[index];
        }        
      }

    }

  }


  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart:any;

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
            data: this.averageDiscount1,
            borderColor: "#007ee7",
            fill: true,
        },
        {
          label: this.label2,
          data: this.averageDiscount2,
          borderColor: "#bd0e0e",
          fill: true,
      }],
        labels: this.months
    },
    
}); // fin chart 1

}

}
