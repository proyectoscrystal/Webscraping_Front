import { formatCurrency } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Chart, ChartConfiguration, registerables, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'
import { BlackboxService } from '../../services/blackbox.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Datos } from '../../utils/index';

// importing the children components
import  { InformePrecioComponent } from './informe-precio/informe-precio.component';

interface valueFilter {
  checked: boolean;
  clase: string;
  item: string;
}

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  @ViewChild(InformePrecioComponent) precioComponent: InformePrecioComponent;

  //Config modal filtros
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  // variable cambio mes a semana 
  valorSeleccionado: any = '';
  semana: any = '';
  mes: any = '';
  tituloResumen: any = '';
  tituloCardActual: any = '';


  photos: any;
  averagePrice: number;
  totalNew: any;
  totalDescontinuados: any = 0;
  categorys: any;
  subcategorys: any;
  imagesnames: any;
  colors: any;

  // variables de los cards
  totalsku: any = '';
  totalDiscount: number;
  currency1: any = '';
  priceDifference: any[] = [0, 0];
  discountDifference: any[] = [0, 0];
  newsDifference: any[] = [0, 0];
  skuDifference: any[] = [0, 0];
  discontinuedDifference: any[] = [0, 0];

  infoCards: any;
  params: any;
  origin: any = '';
  categoria: any = '';
  subCategoria: any = '';
  tipoPrenda: any = '';
  color: any = '';
  composicion: any = "";
  precioPromedio: any;

  //Datos index.ts
  datos: any;
  originData: any;
  categoryData: any;
  subCategoryData: any;
  tipoPrendaData: any;
  colorData: any;
  composicionData: any;

  // filtros seleccionados
  selectedFilter = [];
  originSelected = [];
  categoriaSelected = [];
  subCategoriaSelected = [];
  tipoPrendaSelected = [];
  colorSelected = [];
  composicionSelected = [];
  // variables para fecha y marca
  inicio = '';
  fin = '';
  origenSeleccionado: any;
  origenCheck: any;

  constructor(private blackboxService: BlackboxService, @Inject(LOCALE_ID) public locale: string, private modalService: BsModalService) {
    Chart.register(...registerables);
    this.datos = new Datos();
    this.valorSeleccionado = "Mes";
    this.tituloResumen = "Resumen Mes";
    this.tituloCardActual = "Que el mes pasado";
    // metodo para obtener todos los documentos de tipo images
  }

  ngOnInit(): void {
    if(this.valorSeleccionado === 'Mes'){
      this.getInfoCards();
      //TODO: enviar el valor de mes a los charts de los informes hijos    

    }
    this.showDataModal();
    this.toggleSidebar();
  }

  // Ocultar/Mostrar sidebar
  toggleSidebar() {
    $('#menu-toggle-sidebar').on('click', function (e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
      (<any>$('#wrapper.toggled').find("#sidebar-wrapper").find(".collapse")).collapse('hide');
    });
  }


  //===============INICIO FILTROS MODAL===============

  //Setear filtros obtenidos en cards
  getInfoCards() {

    let params = {
      origin: this.originSelected,
      categoria: this.categoriaSelected,
      subCategoria: this.subCategoriaSelected,
      tipoPrenda: this.tipoPrendaSelected,
      color: this.colorSelected,
      composicion: this.composicionSelected,
      fechaInicio: this.inicio,
      fechaFin: this.fin
    };

    this.blackboxService.getInfoCards(params).subscribe(
      (res) => {
        this.setInfoCards(res);
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // funciones para implementar funcion de semanas
  cambioSemanaMes() {
    if(this.valorSeleccionado === "Semana") {
      this.tituloResumen = "Resumen Semana";
      this.tituloCardActual = "Que la semana pasada";
      // metodo para volver a cargar valores por semana TODO

      // envio del valor a los componente hijos
      this.precioComponent.valorSeleccionado(this.valorSeleccionado);
    } else if (this.valorSeleccionado === "Mes") {
      this.tituloResumen = "Resumen Mes";
      this.tituloCardActual = "Que el mes pasado";
      // metodo para volver a cargar los valores por mes en los cards
      // this.getInfoCards();

      // envio del valor a los componente hijos
      this.precioComponent.valorSeleccionado(this.valorSeleccionado);
    }
  }

  //Obtener datos desde index.ts para mostrar en el modal
  showDataModal() {
    this.originData = this.datos.origins;
    this.categoryData = this.datos.categorias;
    this.subCategoryData = this.datos.subcategorias;
    this.tipoPrendaData = this.datos.tipoprendas;
    this.colorData = this.datos.colores;
    this.composicionData = this.datos.composicion;
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

      this.getInfoCards();

    } else if (value.clase == 'marca' && !value.checked) {
      this.origin = [];
      this.originSelected.splice(this.originSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.originSelected);

      this.getInfoCards();
    }

    if (value.checked && value.clase === 'categoria') {
      this.categoriaSelected.push(item);
      this.selectedFilter.push(value);
      this.categoria = this.categoriaSelected;
      console.log(this.categoria);

      this.getInfoCards();
    } else if (value.clase == 'categoria' && !value.checked) {
      this.categoria = [];
      this.categoriaSelected.splice(this.categoriaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.categoriaSelected);

      this.getInfoCards();
    }

    if (value.checked && value.clase === 'subCategoria') {
      this.subCategoriaSelected.push(item);
      this.selectedFilter.push(value);
      this.subCategoria = this.subCategoriaSelected;
      console.log(this.subCategoria);

      this.getInfoCards();
    } else if (value.clase == 'subCategoria' && !value.checked) {
      this.subCategoria = []
      this.subCategoriaSelected.splice(this.subCategoriaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.subCategoriaSelected);

      this.getInfoCards();
    }

    if (value.checked && value.clase === 'tipoPrenda') {
      this.tipoPrendaSelected.push(item);
      this.selectedFilter.push(value);
      this.tipoPrenda = this.tipoPrendaSelected;
      console.log(this.tipoPrenda);

      this.getInfoCards();
    } else if (value.clase == 'tipoPrenda' && !value.checked) {
      this.tipoPrenda = [];
      this.tipoPrendaSelected.splice(this.tipoPrendaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.tipoPrendaSelected);

      this.getInfoCards();
    }

    if (value.checked && value.clase === 'color colorStyles') {
      this.colorSelected.push(item);
      this.selectedFilter.push(value);
      this.color = this.colorSelected;
      console.log(this.color);

      this.getInfoCards();
    } else if (value.clase == 'color colorStyles' && !value.checked) {
      this.color = [];
      this.colorSelected.splice(this.colorSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.colorSelected);

      this.getInfoCards();
    }

    if (value.checked && value.clase === 'composicion') {
      this.composicionSelected.push(item);
      this.selectedFilter.push(value);
      this.composicion = this.composicionSelected;
      console.log(this.composicion);

      this.getInfoCards();
    } else if (value.clase == 'composicion' && !value.checked) {
      this.composicion = [];
      this.composicionSelected.splice(this.composicionSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.composicionSelected);

      this.getInfoCards();
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  clearFilters() {
    this.inicio = '';
    this.fin = '';
    this.origin = [];
    this.categoria = [];
    this.subCategoria = [];
    this.tipoPrenda = [];
    this.color = [];
    this.composicion = [];

    this.originSelected.splice(0, this.originSelected.length);
    this.categoriaSelected.splice(0, this.categoriaSelected.length);
    this.subCategoriaSelected.splice(0, this.subCategoriaSelected.length);
    this.tipoPrendaSelected.splice(0, this.tipoPrendaSelected.length);
    this.colorSelected.splice(0, this.colorSelected.length);
    this.composicionSelected.splice(0, this.composicionSelected.length);
    this.selectedFilter.splice(0, this.selectedFilter.length);

    $(".marca").prop("checked", false);
    $(".categoria").prop("checked", false);
    $(".subCategoria").prop("checked", false);
    $(".tipoPrenda").prop("checked", false);
    $(".color").prop("checked", false);
    $(".composicion").prop("checked", false);

    this.getInfoCards();
  }

  closeModal() {
    this.modalRef.hide();
  }

  //Validar checks filtros al cerrar modal
  validateCheckOrigin(value: any, marcaCheck: any) {
    let validarMarca = false;
    validarMarca = this.originSelected.some(element => element === value)
    if (validarMarca) {
      let chequearMarca = document.getElementById(`marca${marcaCheck}`);
      chequearMarca.setAttribute('checked', 'checked');
    }
  }

  validateCheckCategory(value: any, categoriaCheck: any) {
    let validarCategoria = false;
    validarCategoria = this.categoriaSelected.some(element => element === value)
    if (validarCategoria) {
      let chequearCategoria = document.getElementById(`categoria${categoriaCheck}`);
      chequearCategoria.setAttribute('checked', 'checked');
    }
  }

  validateCheckSubCategory(value: any, subCategoriaCheck: any) {
    let validarSubCategoria = false;
    validarSubCategoria = this.subCategoriaSelected.some(element => element === value)
    if (validarSubCategoria) {
      let chequearSubCategoria = document.getElementById(`subcategoria${subCategoriaCheck}`);
      chequearSubCategoria.setAttribute('checked', 'checked');
    }
  }

  validateCheckTipoPrenda(value: any, tipoPrendaCheck: any) {
    let validarTipoPrenda = false;
    validarTipoPrenda = this.tipoPrendaSelected.some(element => element === value)
    if (validarTipoPrenda) {
      let chequearTipoPrenda = document.getElementById(`tipoprenda${tipoPrendaCheck}`);
      chequearTipoPrenda.setAttribute('checked', 'checked');
    }
  }

  validateCheckColor(value: any, colorCheck: any) {
    let validarColor = false;
    validarColor = this.colorSelected.some(element => element === value)
    if (validarColor) {
      let chequearColor = document.getElementById(`color${colorCheck}`);
      chequearColor.setAttribute('checked', 'checked');
    }
  }

  validateCheckComposicion(value: any, composicionCheck: any) {
    let validarComposicion = false;
    validarComposicion = this.composicionSelected.some(element => element === value)
    if (validarComposicion) {
      let chequearComposicion = document.getElementById(`composicion${composicionCheck}`);
      chequearComposicion.setAttribute('checked', 'checked');
    }
  }

  //===============FIN FILTROS MODAL===============

  setInfoCards(info: any) {
    this.precioPromedio = new Intl.NumberFormat('es-CO').format(info.obj.precioPromedio);

    this.currency1 = new Intl.NumberFormat('es-CO').format(info.obj.precioPromedio);
    this.totalDiscount = info.obj.discount;
    this.totalNew = new Intl.NumberFormat('es-CO').format(info.obj.nuevos);
    this.totalDescontinuados = new Intl.NumberFormat('es-CO').format(info.obj.discontinueds);
    this.totalsku = new Intl.NumberFormat('es-CO').format(info.obj.sku);

    this.priceDifference = info.obj.differencePrice;
    this.discountDifference = info.obj.differencePorcentage;

    this.skuDifference[1] = new Intl.NumberFormat('es-CO').format(info.obj.differenceSKU[1]);
    this.skuDifference[0] = info.obj.differenceSKU[0];
    this.newsDifference[1] = new Intl.NumberFormat('es-CO').format(info.obj.differenceNew[1]);
    this.newsDifference[0] = info.obj.differenceNew[0];
    this.discontinuedDifference = info.obj.differenceDiscontinued;
  }

  fechaInicio() {
    console.log(this.inicio);
    this.getInfoCards();
  }

  fechaFin() {
    // let date = new Date(this.fin);
    console.log(this.fin);
    this.getInfoCards();
  }

  // metodos para setear la clase de las diferencias
  difference1() {
    if (this.priceDifference[0] === 0) {
      return 'porcentaje2';
    }
    return 'porcentaje';
  }

  difference2() {
    if (this.discountDifference[0] === 0) {
      return 'porcentaje2';
    }
    return 'porcentaje';
  }

  difference3() {
    if (this.newsDifference[0] === 0) {
      return 'porcentaje2';
    }
    return 'porcentaje';
  }

  difference4() {
    if (this.discontinuedDifference[0] === 0) {
      return 'porcentaje2';
    }
    return 'porcentaje';
  }

  difference5() {
    if (this.skuDifference[0] === 0) {
      return 'porcentaje2';
    }
    return 'porcentaje';
  }
}
