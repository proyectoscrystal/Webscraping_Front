import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  registerables,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from 'chart.js';

import { BlackboxService } from '../../../services/blackbox.service';

//Filtro modal
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Datos } from '../../../utils/index';

interface valueFilter {
  checked: boolean;
  clase: string;
  item: string;
}

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  //Config modal filtros
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  photos: any;

  //Modal categorias
  origin: any = '';
  sku: any = '';
  discount: any = '';
  new: any = '';
  inicio: any = '';
  fin: any = '';

  selectedFilter = [];
  originSelected = [];
  skuSelected = [];
  dicountSelected = [];
  newSelected = [];

  //Datos index.ts
  datos: any;
  originData: any;
  skuData: any;
  discountsData: any;
  newsData: any;

  constructor(private blackboxService: BlackboxService, private modalService: BsModalService) {
    this.datos = new Datos();
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getInfoCategory();
    this.showDataModal();
    this.ng();
    this.ng2();
  }

  getInfoCategory() {
    let params = {
      origin: this.originSelected,
      sku: this.sku,
      discount: this.discount,
      new: this.new,
      inicio: this.inicio,
      fin: this.fin,

    };

    this.blackboxService.getInfoCategoryColors(params).subscribe(
      (res) => {
        this.photos = res;
        return (this.photos = res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //===============INICIO FILTROS MODAL===============

  //Setear filtros obtenidos
  /*getInfoCards() {

    let params = {
      origin: this.originSelected,
      categoria: this.categoriaSelected,
      subCategoria: this.subCategoriaSelected,
      tipoPrenda: this.tipoPrendaSelected,
      color: this.colorSelected,
    };

    this.blackboxService.getInfoCards(params).subscribe(
      (res) => {
        this.setInfoCards(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  */

  //Obtener datos desde index.ts para mostrar en el modal
  showDataModal() {
    this.originData = this.datos.origins;
    this.skuData = this.datos.skus;
    this.discountsData = this.datos.discounts;
    this.newsData = this.datos.news;
  }

  //Función para validar checked del filtro
  validateCheckFilter(checked, item, className) {
    let data = {
      checked,
      clase: className,
      item: item.value || '',
    };

    this.filterItemsData(data);
  }

  //Recibe los datos seleccionados en el filtro
  filterItemsData(value) {
    const { item } = value;

    if (value.checked && value.clase === 'marca') {
      this.originSelected.push(item);
      this.selectedFilter.push(value);
      this.origin = this.originSelected;
      console.log(this.origin);

      //this.getInfoCards();
    } else if (value.clase == 'marca' && !value.checked) {
      this.origin = [];
      this.originSelected.splice(this.originSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.originSelected);

      //this.getInfoCards();
    }

    if (value.checked && value.clase === 'sku') {
      this.skuSelected.push(item);
      this.selectedFilter.push(value);
      this.sku = this.skuSelected;
      console.log(this.sku);

      //this.getInfoCards();
    } else if (value.clase == 'sku' && !value.checked) {
      this.sku = [];
      this.skuSelected.splice(this.skuSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.skuSelected);

      //this.getInfoCards();
    }

    if (value.checked && value.clase === 'discount') {
      this.dicountSelected.push(item);
      this.selectedFilter.push(value);
      this.discount = this.dicountSelected;
      console.log(this.discount);

      //this.getInfoCards();
    } else if (value.clase == 'discount' && !value.checked) {
      this.discount = []
      this.dicountSelected.splice(this.dicountSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.dicountSelected);

      //this.getInfoCards();
    }

    if (value.checked && value.clase === 'new') {
      this.newSelected.push(item);
      this.selectedFilter.push(value);
      this.new = this.newSelected;
      console.log(this.new);

      //this.getInfoCards();
    } else if (value.clase == 'new' && !value.checked) {
      this.new = [];
      this.newSelected.splice(this.newSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.newSelected);

      //this.getInfoCards();
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  clearFilters() {
    this.origin = [];
    this.sku = [];
    this.discount = [];
    this.new = [];

    this.selectedFilter.splice(0, this.selectedFilter.length);
    this.originSelected.splice(0, this.originSelected.length);
    this.skuSelected.splice(0, this.skuSelected.length);
    this.dicountSelected.splice(0, this.dicountSelected.length);
    this.newSelected.splice(0, this.newSelected.length);

    //this.getInfoCards();
  }

  closeModal() {
    this.modalRef.hide();
  }

  //===============FIN FILTROS MODAL===============

  @ViewChild('mychartGeneral') mychart: any;

  ng = function ngAfterViewInit() {
    // console.log(this.averagePriceZara9);
    if (this.myChart) {
      this.myChart.clear();
      this.myChart.destroy();
    }

    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title
    );
    this.myChart = new Chart('myChartGeneral', {
      type: 'bar',
          data: {
            labels: ["Azul", "Morado", "rojo", "blanco", "amarillo", "vinotinto"],
            datasets: [{ 
                data: [92,76,129,100,89,47],
                label: "Colores",
                borderColor: ["rgb(30, 140, 255)", "rgb(102, 51, 153)", "rgb(255, 0, 0)", "rgb(255, 255, 255)", "rgb(255, 255, 0)", "rgb(130, 0, 0)"],
                backgroundColor: ["rgb(30, 140, 255)", "rgb(102, 51, 153)", "rgb(255, 0 , 0)", "rgb(255, 255, 255)", "rgb(255, 255, 0)", "rgb(130, 0, 0)"],
                borderWidth:1
              }
            ]
          },
    }); // fin chart 1
  };

  ng2 = function ngAfterViewInit() {
    // console.log(this.averagePriceZara9);
    if (this.myChart2) {
      this.myChart.clear();
      this.myChart.destroy();
    }

    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title
    );
    this.myChart2 = new Chart('myChartPie', {
      type: 'pie',
          data: {
            labels: ["Azul", "Morado", "rojo", "blanco", "amarillo", "vinotinto"],
            datasets: [{ 
                data: [92,76,129,100,89,47],
                label: "Colores",
                borderColor: ["rgb(30, 140, 255)", "rgb(102, 51, 153)", "rgb(255, 0, 0)", "rgb(255, 255, 255)", "rgb(255, 255, 0)", "rgb(130, 0, 0)"],
                backgroundColor: ["rgb(30, 140, 255)", "rgb(102, 51, 153)", "rgb(255, 0 , 0)", "rgb(255, 255, 255)", "rgb(255, 255, 0)", "rgb(130, 0, 0)"],
                borderWidth:1
              }
            ]
          },
    }); // fin chart 1
  };


}
