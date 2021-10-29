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
  selector: 'app-cat-mujer',
  templateUrl: './cat-mujer.component.html',
  styleUrls: ['./cat-mujer.component.css']
})
export class CatMujerComponent implements OnInit {

  //Config modal filtros
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
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
  selectedFilter = [];
  originSelected = [];
  skuSelected = [];
  dicountSelected = [];
  newSelected = [];

  //Modal chart colores
  categoria2: any = '';
  subCategoria2: any = '';
  tipoPrenda2: any = '';
  selectedFilter2 = [];
  categoriaSelected2 = [];
  subCategoriaSelected2 = [];
  tipoPrendaSelected2 = [];

  //Datos index.ts
  datos: any;
  originData: any;
  categoryData: any;
  subCategoryData: any;
  tipoPrendaData: any;

  skuData: any;
  discountsData: any;
  newsData: any;

  constructor(private blackboxService: BlackboxService, private modalService: BsModalService, private modalService2: BsModalService) {
    this.datos = new Datos();
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.showDataModal();
    this.ng();
  }

  //===============INICIO FILTROS MODAL===============

  //Setear filtros obtenidos
  /*
  getInfoCats() {

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
  
  /*
  getInfoChart() {

    let params = {
      origin2: this.originSelected2,
      categoria2: this.categoriaSelected2,
      subCategoria2: this.subCategoriaSelected2,
      tipoPrenda2: this.tipoPrendaSelected2,
      color2: this.colorSelected2,
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

  /*
  getInfoTable() {

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
    this.categoryData = this.datos.categorias;
    this.subCategoryData = this.datos.subcategorias;
    this.tipoPrendaData = this.datos.tipoprendas;

    this.skuData = this.datos.skus;
    this.discountsData = this.datos.discounts;
    this.newsData = this.datos.news;
  }

  //Función para validar checked del filtro categorias
  validateCheckFilter(checked, item, className) {
    let data = {
      checked,
      clase: className,
      item: item.value || '',
    };

    this.filterItemsData(data);
  }

  //Función para validar checked del filtro tabla
  validateCheckFilter2(checked, item, className) {
    let data = {
      checked,
      clase: className,
      item: item.value || '',
    };

    this.filterItemsData(data);
  }

  //Recibe los datos seleccionados en el filtro categorias
  filterItemsData(value) {
    const { item } = value;

    // Validación check categorias
    if (value.checked && value.clase === 'marca') {
      this.originSelected.push(item);
      this.selectedFilter.push(value);
      this.origin = this.originSelected;
      console.log(this.origin);

      // Metodo a ejecutar >
    } else if (value.clase == 'marca' && !value.checked) {
      this.origin = [];
      this.originSelected.splice(this.originSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.originSelected);

      // Metodo a ejecutar >
    }

    if (value.checked && value.clase === 'sku') {
      this.skuSelected.push(item);
      this.selectedFilter.push(value);
      this.sku = this.skuSelected;
      console.log(this.sku);

      // Metodo a ejecutar >
    } else if (value.clase == 'sku' && !value.checked) {
      this.sku = [];
      this.skuSelected.splice(this.skuSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.skuSelected);

      // Metodo a ejecutar >
    }

    if (value.checked && value.clase === 'discount') {
      this.dicountSelected.push(item);
      this.selectedFilter.push(value);
      this.discount = this.dicountSelected;
      console.log(this.discount);

      // Metodo a ejecutar >
    } else if (value.clase == 'discount' && !value.checked) {
      this.discount = []
      this.dicountSelected.splice(this.dicountSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.dicountSelected);

      // Metodo a ejecutar >
    }

    if (value.checked && value.clase === 'new') {
      this.newSelected.push(item);
      this.selectedFilter.push(value);
      this.new = this.newSelected;
      console.log(this.new);

      // Metodo a ejecutar >
    } else if (value.clase == 'new' && !value.checked) {
      this.new = [];
      this.newSelected.splice(this.newSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.newSelected);

      // Metodo a ejecutar >
    }

    // Validación check chart colores
    if (value.checked && value.clase === 'categoria2') {
      this.categoriaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.categoria2 = this.categoriaSelected2;
      console.log(this.categoria2);
      // Metodo a ejecutar >
    } else if (value.clase == 'categoria2' && !value.checked) {
      this.categoria2 = [];
      this.categoriaSelected2.splice(this.categoriaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.categoriaSelected2);
      // Metodo a ejecutar >
    }

    if (value.checked && value.clase === 'subCategoria2') {
      this.subCategoriaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.subCategoria2 = this.subCategoriaSelected2;
      console.log(this.subCategoria2);
      // Metodo a ejecutar >
    } else if (value.clase == 'subCategoria2' && !value.checked) {
      this.subCategoria2 = []
      this.subCategoriaSelected2.splice(this.subCategoriaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.subCategoriaSelected2);
      // Metodo a ejecutar >
    }

    if (value.checked && value.clase === 'tipoPrenda2') {
      this.tipoPrendaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.tipoPrenda2 = this.tipoPrendaSelected2;
      console.log(this.tipoPrenda2);
      // Metodo a ejecutar >
    } else if (value.clase == 'tipoPrenda2' && !value.checked) {
      this.tipoPrenda2 = [];
      this.tipoPrendaSelected2.splice(this.tipoPrendaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.tipoPrendaSelected2);
      // Metodo a ejecutar >
    }
  }

  // Modal Categorias 
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

    // Metodo a ejecutar > this.getInfoCards();
  }
  closeModal() {
    this.modalRef.hide();
  }

  // Modal Chart
  openModal2(template2: TemplateRef<any>) {
    this.modalRef2 = this.modalService2.show(template2, this.config);
  }
  clearFilters2() {
    this.categoria2 = [];
    this.subCategoria2 = [];
    this.tipoPrenda2 = [];

    this.selectedFilter2.splice(0, this.selectedFilter2.length);
    this.categoriaSelected2.splice(0, this.categoriaSelected2.length);
    this.subCategoriaSelected2.splice(0, this.subCategoriaSelected2.length);
    this.tipoPrendaSelected2.splice(0, this.tipoPrendaSelected2.length);

    // Metodo a ejecutar > this.getInfotableDiscount();
  }
  closeModal2() {
    this.modalRef2.hide();
  }

  //===============FIN FILTROS MODAL===============  

  @ViewChild('mychartMujer') mychart: any;

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
    this.myChart = new Chart('myChartMujer', {
      type: 'bar',
      data: {
        labels: ["Azul", "Morado", "rojo", "blanco", "amarillo", "vinotinto"],
        datasets: [{
          data: [46, 20, 19, 60, 50, 26],
          label: "Colores",
          borderColor: ["rgb(30, 140, 255)", "rgb(102, 51, 153)", "rgb(255, 0, 0)", "rgb(255, 255, 255)", "rgb(255, 255, 0)", "rgb(130, 0, 0)"],
          backgroundColor: ["rgb(30, 140, 255)", "rgb(102, 51, 153)", "rgb(255, 0 , 0)", "rgb(255, 255, 255)", "rgb(255, 255, 0)", "rgb(130, 0, 0)"],
          borderWidth: 1
        }
        ]
      },
    }); // fin chart 1
  };


}
