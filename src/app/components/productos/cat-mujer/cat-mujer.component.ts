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
  default: any = 'default.png';

  // datos de la respuesta desde el backend
  skuData: any;
  discountsData: any;
  newsData: any;
  fin: any = '';
  inicio: any = '';
  mujerSKU: any;
  exterior: any;
  exteriorPorcentage: any;
  interior: any;
  interiorPorcentage: any;
  calzado: any;
  calzadoPorcentage: any;
  accesorios: any;
  accesoriosPorcentage: any;
  colorExteriorPalabra: any;
  colorInteriorPalabra: any;
  colorCalzadoPalabra: any;
  colorAccesoriosPalabra: any;
  colorExterior: any;
  colorInterior: any;
  colorCalzado: any;
  colorAccesorios: any;
  colorMujerPalabra: any;
  rgbMujer: any;
  mujerTotalSKU: any;
  colores: any;
  coloresCount: any;
  coloresRGB: any;
  // variables para la tabla topTen
  topTenTipoPrenda: any = ['','','','','','','','','',''];
  topTenColoresLetra: any = ['','','','','','','','','',''];
  topTenColoresRGB: any = ['','','','','','','','','',''];
  topTenPorcentajeSKU: any = [0,0,0,0,0,0,0,0,0,0];
  topTenTotalSKU: any = [0,0,0,0,0,0,0,0,0,0];

  constructor(private blackboxService: BlackboxService, private modalService: BsModalService, private modalService2: BsModalService) {
    this.datos = new Datos();
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getInfoCategory();
    this.getInfoBarChart();
    this.showDataModal();
    this.onlyOne();
    this.ng();
  }

  //===============INICIO FILTROS MODAL===============

  //Setear filtros obtenidos
  getInfoCategory() {
    let params = {
      origin: this.originSelected,
      sku: this.sku,
      discount: this.discount,
      new: this.new,
      fechaInicio: this.inicio,
      fechaFin: this.fin

    };

    this.blackboxService.getInfoMujerCategoryColors(params).subscribe(
      (res) => {
        this.setInfoCategories(res);
        this.ng();
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setInfoCategories(data) {
    this.mujerSKU = data.obj.porcentajesCategoriaColors.mujerPorcentageSKU;
    this.exterior = new Intl.NumberFormat('es-CO').format(data.obj.porcentajesCategoriaColors.exterior);
    this.exteriorPorcentage = data.obj.porcentajesCategoriaColors.exteriorPorcentaje;
    this.interior = new Intl.NumberFormat('es-CO').format(data.obj.porcentajesCategoriaColors.interior);
    this.interiorPorcentage = data.obj.porcentajesCategoriaColors.interiorPorcentaje;
    this.calzado = new Intl.NumberFormat('es-CO').format(data.obj.porcentajesCategoriaColors.calzado);
    this.calzadoPorcentage = data.obj.porcentajesCategoriaColors.calzadoPorcentaje;
    this.accesorios = new Intl.NumberFormat('es-CO').format(data.obj.porcentajesCategoriaColors.accesorios);
    this.accesoriosPorcentage = data.obj.porcentajesCategoriaColors.accesoriosPorcentaje;
    // this.rgbColorsCategoria = data.obj.porcentajesCategoriaColors.rgbColoresCategoria;
    // // colores seccion subcategorias 
    this.colorExterior = data.obj.porcentajesCategoriaColors.rgbExterior;
    this.colorInterior = data.obj.porcentajesCategoriaColors.rgbInterior;
    this.colorCalzado = data.obj.porcentajesCategoriaColors.rgbCalzado;
    this.colorAccesorios = data.obj.porcentajesCategoriaColors.rgbAccesorios;
    // colores seccion subcategorias en letras 
    this.colorExteriorPalabra = data.obj.porcentajesCategoriaColors.colorExterior;
    this.colorInteriorPalabra = data.obj.porcentajesCategoriaColors.colorInterior;
    this.colorCalzadoPalabra = data.obj.porcentajesCategoriaColors.colorCalzado;
    this.colorAccesoriosPalabra = data.obj.porcentajesCategoriaColors.colorAccesorios;
    // color predominante en mujer 
    this.colorMujerPalabra = data.obj.porcentajesCategoriaColors.colorMujer;
    this.rgbMujer = data.obj.porcentajesCategoriaColors.rgbMujer;
    this.mujerTotalSKU = new Intl.NumberFormat('es-CO').format(data.obj.porcentajesCategoriaColors.mujerTotalSKU);
    // seccion de la tabla topTen
    this.topTenTipoPrenda = data.obj.topTen.tipoPrenda;
    this.topTenColoresLetra = data.obj.topTen.coloresLetra;
    this.topTenColoresRGB = data.obj.topTen.coloresRGB;
    this.topTenPorcentajeSKU = data.obj.topTen.porcentajeSKU; 
    this.topTenTotalSKU = data.obj.topTen.totalSKU;
  }

  //info seccion barchart 
  getInfoBarChart() {
    let params = {
      categoria: this.categoriaSelected2,
      subCategoria: this.subCategoriaSelected2,
      tipoPrenda: this.tipoPrendaSelected2,
      fechaInicio: this.inicio,
      fechaFin: this.fin

    };

    this.blackboxService.getInfoGeneralColors(params).subscribe(
      (res) => {
        console.log(res);
        this.setInfoBarChart(res);
        this.ng();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setInfoBarChart(data) {
    this.colores = data.obj.porcentajesCategoriaColors.colores;
    this.coloresCount = data.obj.porcentajesCategoriaColors.coloresCount;
    this.coloresRGB = data.obj.porcentajesCategoriaColors.coloresRGB;
  }


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
      this.getInfoCategory();
    } else if (value.clase == 'marca' && !value.checked) {
      this.origin = [];
      this.originSelected.splice(this.originSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.originSelected);

      // Metodo a ejecutar >
      this.getInfoCategory();
    }

    if (value.checked && value.clase === 'sku check') {
      this.skuSelected.push(item);
      this.selectedFilter.push(value);
      this.sku = this.skuSelected;
      console.log(this.sku);

      // Metodo a ejecutar >
      this.getInfoCategory();
    } else if (value.clase == 'sku check' && !value.checked) {
      this.sku = '';
      this.skuSelected.splice(this.skuSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.skuSelected);

      // Metodo a ejecutar >
      this.getInfoCategory();
    }

    if (value.checked && value.clase === 'discount check') {
      this.dicountSelected.push(item);
      this.selectedFilter.push(value);
      this.discount = this.dicountSelected;
      console.log(this.discount);

      // Metodo a ejecutar >
      this.getInfoCategory();
    } else if (value.clase == 'discount check' && !value.checked) {
      this.discount = '';
      this.dicountSelected.splice(this.dicountSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.dicountSelected);

      // Metodo a ejecutar >
      this.getInfoCategory();
    }

    if (value.checked && value.clase === 'new check') {
      this.newSelected.push(item);
      this.selectedFilter.push(value);
      this.new = this.newSelected;
      console.log(this.new);

      // Metodo a ejecutar >
      this.getInfoCategory();
    } else if (value.clase == 'new check' && !value.checked) {
      this.new = '';
      this.newSelected.splice(this.newSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.newSelected);

      // Metodo a ejecutar >
      this.getInfoCategory();
    }

    // Validación check chart colores
    if (value.checked && value.clase === 'categoria2') {
      this.categoriaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.categoria2 = this.categoriaSelected2;
      console.log(this.categoria2);
      // Metodo a ejecutar >
      this.getInfoBarChart();
    } else if (value.clase == 'categoria2' && !value.checked) {
      this.categoria2 = [];
      this.categoriaSelected2.splice(this.categoriaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.categoriaSelected2);
      // Metodo a ejecutar >
      this.getInfoBarChart();
    }

    if (value.checked && value.clase === 'subCategoria2') {
      this.subCategoriaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.subCategoria2 = this.subCategoriaSelected2;
      console.log(this.subCategoria2);
      // Metodo a ejecutar >
      this.getInfoBarChart();
    } else if (value.clase == 'subCategoria2' && !value.checked) {
      this.subCategoria2 = []
      this.subCategoriaSelected2.splice(this.subCategoriaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.subCategoriaSelected2);
      // Metodo a ejecutar >
      this.getInfoBarChart();
    }

    if (value.checked && value.clase === 'tipoPrenda2') {
      this.tipoPrendaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.tipoPrenda2 = this.tipoPrendaSelected2;
      console.log(this.tipoPrenda2);
      // Metodo a ejecutar >
      this.getInfoBarChart();
    } else if (value.clase == 'tipoPrenda2' && !value.checked) {
      this.tipoPrenda2 = [];
      this.tipoPrendaSelected2.splice(this.tipoPrendaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.tipoPrendaSelected2);
      // Metodo a ejecutar >
      this.getInfoBarChart();
    }
  }

  // Modal Categorias 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
  clearFilters() {
    this.origin = [];
    this.sku = '';
    this.discount = '';
    this.new = '';
    this.inicio = '';
    this.fin = '';

    this.selectedFilter.splice(0, this.selectedFilter.length);
    this.originSelected.splice(0, this.originSelected.length);
    this.skuSelected.splice(0, this.skuSelected.length);
    this.dicountSelected.splice(0, this.dicountSelected.length);
    this.newSelected.splice(0, this.newSelected.length);

    // Metodo a ejecutar > this.getInfoCards();
    this.getInfoCategory();
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
    this.getInfoBarChart();
  }
  closeModal2() {
    this.modalRef2.hide();
  }

  //===============FIN FILTROS MODAL=============== 
  fechaInicio(){    
    this.getInfoCategory();
    this.getInfoBarChart();
  }

  fechaFin(){
    this.getInfoCategory();
    this.getInfoBarChart();
  }
  
  //=============== chart de colores

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
        labels: this.colores,
        datasets: [{
          data: this.coloresCount,
          label: "Colores",
          borderColor: this.coloresRGB,
          backgroundColor: this.coloresRGB,
          borderWidth: 1
        }
        ]
      },
    }); // fin chart 1
  };

  onlyOne() {
    $(document).on("change", ".check", function() {
      var $allCheckboxes = $(".check");
      $allCheckboxes.prop("disabled", false);
      this.checked && $allCheckboxes.not(this).prop("disabled", true);
    });
  }

}
