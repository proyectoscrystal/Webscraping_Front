import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BlackboxService } from '../../../services/blackbox.service';

// Angular DataTable
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-informe-precio',
  templateUrl: './informe-precio.component.html',
  styleUrls: ['./informe-precio.component.css']
})

export class InformePrecioComponent implements OnDestroy, OnInit, AfterViewInit {

  modalRef: BsModalRef;

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  photos: any;
  total: any;
  yearMonth: string[] = ['mes', 'año Zara', 'año Mango'];
  seleccion: string = '';
  averagePrice1: number[] = [];
  averagePrice2: number[] = [];
  months: [];
  label1: any;
  label2: any;
  myChart: Chart;
  categorys: any;
  subcategorys: any;
  imagesNames: any;

  origin: any = '';
  categoria: any = '';
  subCategoria: any = '';
  tipoPrenda: any = '';
  color: any = '';

  constructor(private blackboxService: BlackboxService, private modalService: BsModalService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getInfoPrice()
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

  setYearMonth() {
    console.log(this.seleccion);
  }

  getInfoPrice() {
    let params = {
      origin: this.origin,
      categoria: this.categoria,
      subCategoria: this.subCategoria,
      tipoPrenda: this.tipoPrenda,
      color: this.color
    };

    this.blackboxService.getInfoPrice(params).subscribe(
      (res) => {
        this.setInfoPrice(res);
        // console.log(res);
        this.ng();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setInfoPrice(res) {
    let date = new Date();
    let year = date.getFullYear();
    if (res.obj.origin === 'general') {
      this.label1 = 'Zara';
      this.label2 = 'Mango';
      this.months = res.obj.months;
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averagePrice1[index] = res.obj.values[index];
        } else if (index >= 24 && index <= 35) {
          this.averagePrice2[index - 24] = res.obj.values[index];
        }
      }
    }  else if (res.obj.origin === 'Mango') {
      this.label1 = `${res.obj.origin} ${year}`;
      this.label2 = `${res.obj.origin} ${year - 1}`;
      this.months = res.obj.months;
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averagePrice1[index] = res.obj.values[index];
        } else if (index >= 12 && index <= 23) {
          this.averagePrice2[index - 12] = res.obj.values[index];
        }
      }

    } else if (res.obj.origin === 'Zara') {
      this.label1 = `${res.obj.origin} ${year}`;
      this.label2 = `${res.obj.origin} ${year - 1}`;
      this.months = res.obj.months;
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averagePrice1[index] = res.obj.values[index];
        } else if (index >= 12 && index <= 23) {
          this.averagePrice2[index - 12] = res.obj.values[index];
        }
      }
    }

  }

  getPhotoList() {
    this.blackboxService.getPhotos().subscribe(
      (res) => {
        this.photos = res;
        this.dtTrigger.next();
        this.filterDuplicatesCategory();
        this.filterDuplicatesImagesNames();
        this.filterDuplicatesSubCategory();
        this.ng();  // se presenta el chart con promedio por mes
        return (this.photos = res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  filterDuplicatesCategory() {
    this.categorys = this.photos.filter(
      (dupe: { categoria: any; }, i: any, arr: any[]) => arr.findIndex(t => t.categoria === dupe.categoria) === i
    );
  }

  filterDuplicatesSubCategory() {
    this.subcategorys = this.photos.filter(
      (dupe: { subCategoria: any; }, i: any, arr: any[]) => arr.findIndex(t => t.subCategoria === dupe.subCategoria) === i
    );
  }

  filterDuplicatesImagesNames() {
    this.imagesNames = this.photos.filter(
      (dupe: { imageName: any; }, i: any, arr: any[]) => arr.findIndex(t => t.imageName === dupe.imageName) === i
    );
  }

  ngAfterViewInit(): void {
    this.dtTrigger.subscribe(() => {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.columns(0).every(function () {
          const that = this;
          $('#selectDropdown', this.footer()).on('keyup change', function () {
            if (that.search() !== this['value']) {
              that.search(this['value']).draw();
            }
          });
          $('#inputSearch', this.footer()).on('keyup change', function () {
            if (that.search() !== this['value']) {
              that.search(this['value']).draw();
            }
          });
          /*
          $('select', this.column(colIdx).footer()).on('keyup change', function() {
            that.column(colIdx).search(this['value']).draw();
          });
          */
        });
      });
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // desde aca empieza el chart


  @ViewChild('mychart') mychart: any;

  ng = function ngAfterViewInit() {
    // console.log(this.averagePriceZara9); 

    if (this.myChart) {
      this.myChart.clear();
      this.myChart.destroy();
    }


    Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
    this.myChart = new Chart("myChart", {
      type: 'line',
      data: {
        datasets: [{
          label: this.label1,
          data: this.averagePrice1,
          borderColor: "#007ee7",
          fill: true,
        },
        {
          label: this.label2,
          data: this.averagePrice2,
          borderColor: "#bd0e0e",
          fill: true,
        }],
        labels: this.months
      },

    }); // fin chart 1

  }

  //juan camilo

}
