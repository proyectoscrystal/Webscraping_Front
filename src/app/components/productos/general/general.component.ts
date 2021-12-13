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
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
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
  discountSelected = [];
  newSelected = [];

  inicio: any = '';
  fin: any = '';

  //Modal chart colores
  categoria2: any = '';
  subCategoria2: any = '';
  tipoPrenda2: any = '';
  selectedFilter2 = [];
  categoriaSelected2 = [];
  subCategoriaSelected2 = [];
  tipoPrendaSelected2 = [];

  //Modal materiales
  categoria3: any = '';
  subCategoria3: any = '';
  tipoPrenda3: any = '';
  selectedFilter3 = [];
  categoriaSelected3 = [];
  subCategoriaSelected3 = [];
  tipoPrendaSelected3 = [];

  //Datos index.ts
  datos: any;
  originData: any;
  categoryData: any;
  subCategoryData: any;
  tipoPrendaData: any;
  default: any = 'default.png';

  // responses categoryes
  categorias = [];
  hombre = 0;
  mujer = 0;
  kids = 0;
  exterior:any = 0;
  exteriorPorcentage = 0;
  interior:any = 0;
  interiorPorcentage = 0;
  calzado:any = 0;
  calzadoPorcentage = 0;
  accesorios:any = 0;
  accesoriosPorcentage = 0;


  skuData: any;
  discountsData: any;
  newsData: any;
  rgbColorsCategoria: any;
  colorExterior: any = '';
  colorInterior: any = '';
  colorCalzado: any = '';
  colorAccesorios: any = '';
  colorExteriorPalabra: any = '';
  colorInteriorPalabra: any = '';
  colorCalzadoPalabra: any = '';
  colorAccesoriosPalabra: any = '';
  colores: any;
  coloresCount: any;
  coloresRGB: any;
  // variables para la tabla topTen
  topTenTipoPrenda: any = ['','','','','','','','','',''];
  topTenColoresLetra: any = ['','','','','','','','','',''];
  topTenColoresRGB: any = ['','','','','','','','','',''];
  topTenPorcentajeSKU: any = [0,0,0,0,0,0,0,0,0,0];
  topTenTotalSKU: any = [0,0,0,0,0,0,0,0,0,0];
  materiales: any;
  materialesCount: any;


  constructor(private blackboxService: BlackboxService, private modalService: BsModalService, private modalService2: BsModalService, private modalService3: BsModalService) {
    this.datos = new Datos();
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getInfoCategory();
    this.getInfoBarChart();
    this.getInfoBarChartMateriales();
    this.showDataModal();
    //this.onlyOne();
    this.ng();
    this.ng2();
    this.ng3();
  }

  //===============INICIO FILTROS MODAL===============

  //info seccion categoria 
  getInfoCategory() {
    let params = {
      origin: this.originSelected,
      sku: this.sku,
      discount: this.discount,
      new: this.new,
      fechaInicio: this.inicio,
      fechaFin: this.fin

    };

    this.blackboxService.getInfoCategoryColors(params).subscribe(
      (res) => {
        this.setInfoCategories(res);
        this.ng2();
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setInfoCategories(data) {
    this.hombre = data.obj.porcentajesCategoriaColors.hombrePorcentageSKU;
    this.mujer = data.obj.porcentajesCategoriaColors.mujerPorcentageSKU;
    this.kids = data.obj.porcentajesCategoriaColors.kidsPorcentageSKU;
    this.exterior = new Intl.NumberFormat('es-CO').format(data.obj.porcentajesCategoriaColors.exterior);
    this.exteriorPorcentage = data.obj.porcentajesCategoriaColors.exteriorPorcentaje;
    this.interior = new Intl.NumberFormat('es-CO').format(data.obj.porcentajesCategoriaColors.interior);
    this.interiorPorcentage = data.obj.porcentajesCategoriaColors.interiorPorcentaje;
    this.calzado = new Intl.NumberFormat('es-CO').format(data.obj.porcentajesCategoriaColors.calzado);
    this.calzadoPorcentage = data.obj.porcentajesCategoriaColors.calzadoPorcentaje;
    this.accesorios = new Intl.NumberFormat('es-CO').format(data.obj.porcentajesCategoriaColors.accesorios);
    this.accesoriosPorcentage = data.obj.porcentajesCategoriaColors.accesoriosPorcentaje;
    this.rgbColorsCategoria = data.obj.porcentajesCategoriaColors.rgbColoresCategoria;
    // colores seccion subcategorias 
    this.colorExterior = data.obj.porcentajesCategoriaColors.rgbExterior;
    this.colorInterior = data.obj.porcentajesCategoriaColors.rgbInterior;
    this.colorCalzado = data.obj.porcentajesCategoriaColors.rgbCalzado;
    this.colorAccesorios = data.obj.porcentajesCategoriaColors.rgbAccesorios;
    // colores seccion subcategorias en letras 
    this.colorExteriorPalabra = data.obj.porcentajesCategoriaColors.colorExterior;
    this.colorInteriorPalabra = data.obj.porcentajesCategoriaColors.colorInterior;
    this.colorCalzadoPalabra = data.obj.porcentajesCategoriaColors.colorCalzado;
    this.colorAccesoriosPalabra = data.obj.porcentajesCategoriaColors.colorAccesorios;
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
        // console.log(res);
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

  //info seccion barchart 
  getInfoBarChartMateriales() {
    let params = {
      categoria: this.categoriaSelected3,
      subCategoria: this.subCategoriaSelected3,
      tipoPrenda: this.tipoPrendaSelected3,
      fechaInicio: this.inicio,
      fechaFin: this.fin

    };

    this.blackboxService.getInfoGeneralColorsMateriales(params).subscribe(
      (res) => {
        // console.log(res);
        this.setInfoBarChartMateriales(res);
        this.ng3();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setInfoBarChartMateriales(data) {
    this.materiales = data.obj.materialsData.materials;
    this.materialesCount = data.obj.materialsData.countMaterials;
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

      this.getInfoCategory();
    } else if (value.clase == 'marca' && !value.checked) {
      this.origin = [];
      this.originSelected.splice(this.originSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.originSelected);

      this.getInfoCategory();
    }

    if (value.checked && value.clase === 'sku check') {
      this.skuSelected.push(item);
      this.selectedFilter.push(value);
      this.sku = this.skuSelected;
      console.log(this.sku);

  
      this.getInfoCategory();
    } else if (value.clase == 'sku check' && !value.checked) {
      this.sku = '';
      this.skuSelected.splice(this.skuSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.skuSelected);

  
      this.getInfoCategory();
    }

    if (value.checked && value.clase === 'discount check') {
      this.discountSelected.push(item);
      this.selectedFilter.push(value);
      this.discount = this.discountSelected;
      console.log(this.discount);

  
      this.getInfoCategory();
    } else if (value.clase == 'discount check' && !value.checked) {
      this.discount = '';
      this.discountSelected.splice(this.discountSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.discountSelected);

  
      this.getInfoCategory();
    }

    if (value.checked && value.clase === 'new check') {
      this.newSelected.push(item);
      this.selectedFilter.push(value);
      this.new = this.newSelected;
      console.log(this.new);

  
      this.getInfoCategory();
    } else if (value.clase == 'new check' && !value.checked) {
      this.new = '';
      this.newSelected.splice(this.newSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.newSelected);

  
      this.getInfoCategory();
    }

    // Validación check chart colores
    if (value.checked && value.clase === 'categoria2') {
      this.categoriaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.categoria2 = this.categoriaSelected2;
      console.log(this.categoria2);

      this.getInfoBarChart();
  
    } else if (value.clase == 'categoria2' && !value.checked) {
      this.categoria2 = [];
      this.categoriaSelected2.splice(this.categoriaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.categoriaSelected2);

      this.getInfoBarChart();
  
    }

    if (value.checked && value.clase === 'subCategoria2') {
      this.subCategoriaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.subCategoria2 = this.subCategoriaSelected2;
      console.log(this.subCategoria2);

      this.getInfoBarChart();
  
    } else if (value.clase == 'subCategoria2' && !value.checked) {
      this.subCategoria2 = []
      this.subCategoriaSelected2.splice(this.subCategoriaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.subCategoriaSelected2);

      this.getInfoBarChart();
    }

    if (value.checked && value.clase === 'tipoPrenda2') {
      this.tipoPrendaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.tipoPrenda2 = this.tipoPrendaSelected2;
      console.log(this.tipoPrenda2);

      this.getInfoBarChart();
  
    } else if (value.clase == 'tipoPrenda2' && !value.checked) {
      this.tipoPrenda2 = [];
      this.tipoPrendaSelected2.splice(this.tipoPrendaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.tipoPrendaSelected2);

      this.getInfoBarChart();
  
    }

    // Validación filtro materiales
    if (value.checked && value.clase === 'categoria3') {
      this.categoriaSelected3.push(item);
      this.selectedFilter3.push(value);
      this.categoria3 = this.categoriaSelected3;
      console.log(this.categoria3);

      this.getInfoBarChartMateriales();
  
    } else if (value.clase == 'categoria3' && !value.checked) {
      this.categoria3 = [];
      this.categoriaSelected3.splice(this.categoriaSelected3.indexOf(item), 1);
      this.selectedFilter3.splice(this.selectedFilter3.indexOf(value), 1);
      console.log(this.categoriaSelected3);

      this.getInfoBarChartMateriales();
  
    }

    if (value.checked && value.clase === 'subCategoria3') {
      this.subCategoriaSelected3.push(item);
      this.selectedFilter3.push(value);
      this.subCategoria3 = this.subCategoriaSelected3;
      console.log(this.subCategoria3);

      this.getInfoBarChartMateriales();
  
    } else if (value.clase == 'subCategoria3' && !value.checked) {
      this.subCategoria3 = []
      this.subCategoriaSelected3.splice(this.subCategoriaSelected3.indexOf(item), 1);
      this.selectedFilter3.splice(this.selectedFilter3.indexOf(value), 1);
      console.log(this.subCategoriaSelected3);

      this.getInfoBarChartMateriales();
  
    }

    if (value.checked && value.clase === 'tipoPrenda3') {
      this.tipoPrendaSelected3.push(item);
      this.selectedFilter3.push(value);
      this.tipoPrenda3 = this.tipoPrendaSelected3;
      console.log(this.tipoPrenda3);

      this.getInfoBarChartMateriales();
  
    } else if (value.clase == 'tipoPrenda3' && !value.checked) {
      this.tipoPrenda3 = [];
      this.tipoPrendaSelected3.splice(this.tipoPrendaSelected3.indexOf(item), 1);
      this.selectedFilter3.splice(this.selectedFilter3.indexOf(value), 1);
      console.log(this.tipoPrendaSelected3);

      this.getInfoBarChartMateriales();
  
    }    
  }

  // Modal Categorias 
  openModal(template: TemplateRef<any>) {
    this.origin = [];
    this.sku = '';
    this.discount = '';
    this.new = '';
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
    this.discountSelected.splice(0, this.discountSelected.length);
    this.newSelected.splice(0, this.newSelected.length);

    $(".marca").prop("checked", false);
    $(".sku").prop("checked", false);
    $(".discount").prop("checked", false);
    $(".new").prop("checked", false);

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

    $(".categori2a").prop("checked", false);
    $(".subCategoria2").prop("checked", false);
    $(".tipoPrenda2").prop("checked", false);

    this.getInfoBarChart();
  }
  closeModal2() {
    this.modalRef2.hide();
  }

  // Modal Materiales
  openModal3(template3: TemplateRef<any>) {
    this.modalRef3 = this.modalService3.show(template3, this.config);
  }
  clearFilters3() {
    this.categoria3 = [];
    this.subCategoria3 = [];
    this.tipoPrenda3 = [];

    this.selectedFilter3.splice(0, this.selectedFilter3.length);
    this.categoriaSelected3.splice(0, this.categoriaSelected3.length);
    this.subCategoriaSelected3.splice(0, this.subCategoriaSelected3.length);
    this.tipoPrendaSelected3.splice(0, this.tipoPrendaSelected3.length);

    $(".categoria3").prop("checked", false);
    $(".subCategoria3").prop("checked", false);
    $(".tipoPrenda3").prop("checked", false);

    this.getInfoBarChartMateriales();
  }
  closeModal3() {
    this.modalRef3.hide();
  }

  //Validar checks filtros al cerrar modal categorias
  validateCheckOrigin(value: any, marcaCheck: any) {
    let validarMarca = false;
    validarMarca = this.originSelected.some(element => element === value)
    if (validarMarca) {
      let chequearMarca = document.getElementById(`marca${marcaCheck}`);
      chequearMarca.setAttribute('checked', 'checked');
    }
  }  
  validateCheckSku(value: any, skuCheck: any) {
    let validarSku = false;
    validarSku = this.skuSelected.some(element => element === value)
    if (validarSku) {
      let chequearSku = document.getElementById(`sku${skuCheck}`);
      chequearSku.setAttribute('checked', 'checked');
    }
  } 
  validateCheckDiscounts(value: any, discountsCheck: any) {
    let validarDiscounts = false;
    validarDiscounts = this.discountSelected.some(element => element === value)
    if (validarDiscounts) {
      let chequearDiscounts = document.getElementById(`discounts${discountsCheck}`);
      chequearDiscounts.setAttribute('checked', 'checked');
    }
  } 
  validateCheckNews(value: any, newsCheck: any) {
    let validarNews = false;
    validarNews = this.newSelected.some(element => element === value)
    if (validarNews) {
      let chequearNews = document.getElementById(`news${newsCheck}`);
      chequearNews.setAttribute('checked', 'checked');
    }
  } 
  //Validar checks filtros al cerrar modal categorias


  //Validar checks filtros al cerrar modal colores
  validateCheckCategory2(value: any, categoriaCheck2: any) {
    let validarCategoria2 = false;
    validarCategoria2 = this.categoriaSelected2.some(element => element === value)
    if (validarCategoria2) {
      let chequearCategoria2 = document.getElementById(`categoria2${categoriaCheck2}`);
      chequearCategoria2.setAttribute('checked', 'checked');
    }
  }
  validateCheckSubCategory2(value: any, subCategoriaCheck2: any) {
    let validarSubCategoria2 = false;
    validarSubCategoria2 = this.subCategoriaSelected2.some(element => element === value)
    if (validarSubCategoria2) {
      let chequearSubCategoria2 = document.getElementById(`subcategoria2${subCategoriaCheck2}`);
      chequearSubCategoria2.setAttribute('checked', 'checked');
    }
  }
  validateCheckTipoPrenda2(value: any, tipoPrendaCheck2: any) {
    let validarTipoPrenda2 = false;
    validarTipoPrenda2 = this.tipoPrendaSelected2.some(element => element === value)
    if (validarTipoPrenda2) {
      let chequearTipoPrenda2 = document.getElementById(`tipoprenda2${tipoPrendaCheck2}`);
      chequearTipoPrenda2.setAttribute('checked', 'checked');
    }
  }
  //Validar checks filtros al cerrar modal colores


  //Validar checks filtros al cerrar modal materiales
  validateCheckCategory3(value: any, categoriaCheck3: any) {
    let validarCategoria3 = false;
    validarCategoria3 = this.categoriaSelected3.some(element => element === value)
    if (validarCategoria3) {
      let chequearCategoria3 = document.getElementById(`categoria3${categoriaCheck3}`);
      chequearCategoria3.setAttribute('checked', 'checked');
    }
  }
  validateCheckSubCategory3(value: any, subCategoriaCheck3: any) {
    let validarSubCategoria3 = false;
    validarSubCategoria3 = this.subCategoriaSelected3.some(element => element === value)
    if (validarSubCategoria3) {
      let chequearSubCategoria3 = document.getElementById(`subcategoria3${subCategoriaCheck3}`);
      chequearSubCategoria3.setAttribute('checked', 'checked');
    }
  }
  validateCheckTipoPrenda3(value: any, tipoPrendaCheck3: any) {
    let validarTipoPrenda3 = false;
    validarTipoPrenda3 = this.tipoPrendaSelected3.some(element => element === value)
    if (validarTipoPrenda3) {
      let chequearTipoPrenda3 = document.getElementById(`tipoprenda3${tipoPrendaCheck3}`);
      chequearTipoPrenda3.setAttribute('checked', 'checked');
    }
  }
  //Validar checks filtros al cerrar modal materiales


  //===============FIN FILTROS MODAL===============  
  fechaInicio(){    
    console.log(this.inicio);
    this.getInfoCategory();
    this.getInfoBarChart();
  }

  fechaFin(){
    // let date = new Date(this.fin);
    console.log(this.fin);
    this.getInfoCategory();
    this.getInfoBarChart();
  }

  //===============FIN FILTROS MODAL===============

  @ViewChild('mychartGeneral') mychart: any;

  // grafico de barras
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
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        }
      }
    }); // fin chart 1
  };

  // torta de datos
  ng2 = function ngAfterViewInit() {
    // console.log(this.averagePriceZara9);
    if (this.myChart2) {
      this.myChart2.clear();
      this.myChart2.destroy();
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
        labels: ["Hombre %","Mujer %","Kids %"],
        datasets: [{
          data: [`${this.hombre}`, `${this.mujer}`, `${this.kids}`],
          label: "Colores",
          backgroundColor: this.rgbColorsCategoria,
          borderWidth: 1
        }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }); // fin chart 1
  };

  // chart de barras, materiales de datos
  ng3 = function ngAfterViewInit() {
    // console.log(this.averagePriceZara9);
    if (this.myChart3) {
      this.myChart3.clear();
      this.myChart3.destroy();
    }

    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title
    );
    this.myChart3 = new Chart('myChartMateriales', {
      type: 'bar',
      data: {
        labels: this.materiales,
        datasets: [{
          data: this.materialesCount,
          label: "Cantidad",
          borderColor: ['rgb(58, 115, 184)'],
          backgroundColor: ['rgb(58, 115, 184)'],
          borderWidth: 1
        }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        }
      }
    }); // fin chart 1
  };

  /*
  onlyOne() {
    $(document).on("change", ".check", function() {
      var $allCheckboxes = $(".check");
      $allCheckboxes.prop("disabled", false);
      this.checked && $allCheckboxes.not(this).prop("disabled", true);
    });
  }
  */
}


